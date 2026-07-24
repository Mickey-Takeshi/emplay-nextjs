import nodemailer from "npm:nodemailer@6.9.10"

// 許可するオリジン
const ALLOWED_ORIGINS = [
  'https://emplay.jp',
  'https://www.emplay.jp',
  'https://emplay-nextjs.vercel.app',
  'http://localhost:5173',  // 開発環境
  'http://localhost:3000',
]

// オリジンに基づいてCORSヘッダーを生成
function getCorsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

// HTMLエスケープ（XSS対策）
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

// 入力値のバリデーション
function validateInput(data: unknown): { valid: boolean; error?: string; data?: ContactData } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' }
  }

  const { name, email, company, phone, message } = data as Record<string, unknown>

  // 必須フィールドのチェック
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' }
  }
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' }
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { valid: false, error: 'Message is required' }
  }

  // メールアドレスの形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }

  // 文字数制限
  if (name.length > 100) {
    return { valid: false, error: 'Name is too long (max 100 characters)' }
  }
  if (email.length > 254) {
    return { valid: false, error: 'Email is too long' }
  }
  if (company && typeof company === 'string' && company.length > 200) {
    return { valid: false, error: 'Company name is too long (max 200 characters)' }
  }
  if (phone && typeof phone === 'string' && phone.length > 20) {
    return { valid: false, error: 'Phone number is too long' }
  }
  if (message.length > 5000) {
    return { valid: false, error: 'Message is too long (max 5000 characters)' }
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company && typeof company === 'string' ? company.trim() : undefined,
      phone: phone && typeof phone === 'string' ? phone.trim() : undefined,
      message: message.trim(),
    }
  }
}

// レート制限用のメモリストア（簡易版）
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000  // 1分
const RATE_LIMIT_MAX = 5  // 1分あたり5回まで

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

// 古いレート制限レコードを定期的にクリーンアップ
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip)
    }
  }
}, 60 * 1000)

interface ContactData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}

// ===== 問い合わせ自動判定 =====
// 目的: 営業メールに埋もれて「意味のある問い合わせ」を取りこぼさないため、
// 通知メールの件名にタグを付け、DBにも判定結果を残す。
// 方針: 迷ったら "review(要確認)" に倒す（＝見込み客を営業と誤判定して見逃すリスクを最小化）。
type Classification = { level: 'lead' | 'review' | 'sales'; score: number; reasons: string[] }

// 送信元が自社ファネルへ誘導する典型的な営業シグナル（トラッキング/日程調整/配信停止URL）
const OUTBOUND_URL_PATTERNS = [
  'track.', 'sbroute.net', 's-lnk.co', 'timerex.net', 'aitemasu.me', 'abm-form',
  '.canva.site', 'service-link.app', 'revocomi.com/c/', 'netlify.app', 'lstep', 'utage',
]
const UNSUBSCRIBE_PATTERNS = ['配信停止', 'unsubscribe', '購読解除', 'オプトアウト', '連絡不要']
// 典型的なコールドメール文言
const SALES_PHRASES = [
  '突然のご連絡', '突然のご案内', 'ご案内いたします', 'ご案内させて', 'ご提案', 'お力添え',
  '拝見し', '拝見させて', '代理店', '弊社では', '弊社の', '当社は', '当社では', '商談',
  '日程調整', '無料掲載', '謝礼', 'キャンペーン', '職務経歴書', '人材', 'ご協業', '協業',
  'ご挨拶', '相互リンク', 'セミナー', 'ご登録', '実績が多数', '導入企業', 'サービスサイト',
  '運営しております', '営業', 'ご興味',
]
// 営業ピッチの定番フック（相手＝売り手であることを示す表現）
const PITCH_HOOKS = [
  'お悩み', 'ではないでしょうか', 'ございませんか', 'ありませんか', 'ご紹介いたします', 'ご紹介します',
  '貴社の事業', 'お力に', '削減', '最短', '特化', '無料で', 'いかがでしょうか',
  '機会をいただけ', '打ち合わせの機会', 'お打ち合わせの機会', 'ご説明', '成功例', '成功事例',
  '成果を出す', '加速', 'ご一読', '私共', 'ご返信をお待ち', 'お話を聞かせ', '一度お話',
]
// EMPLAYへの明確な依頼・相談を示す「強い」見込みシグナル（送信者が自ら発注検討）
const STRONG_LEAD_PHRASES = [
  'お見積', '見積もり', '見積り', '見積依頼', '依頼したい', 'お願いしたい', 'お願いできますか',
  '制作をお願い', '作ってほしい', 'ご相談は可能', '相談は可能', '相談したい', '相談させて',
  '対応可能でしょうか', '対応いただけますか', 'ご対応いただけ', '料金を知りたい', '費用を知りたい',
  '料金表', '費用感を知り', '発注を検討', '導入を検討', '検討しております', 'お願いしたく',
]
// 単独では見込みと断定できない曖昧語（営業が顧客の悩みを代弁する時にも出る）
const WEAK_LEAD_PHRASES = ['作りたい', 'リニューアルしたい', '新規制作', '費用感', '見積を']
// 自社サービス名（相手が「これを頼みたい」と書いていれば見込み度UP）
const SERVICE_PHRASES = ['ホームページ制作', 'hp制作', 'サイト制作', 'web制作', 'ホームページを', '広告運用', 'ランディングページ', 'lp制作', '研修']

function countMatches(haystack: string, needles: string[]): string[] {
  const hits: string[] = []
  for (const n of needles) {
    if (haystack.includes(n)) hits.push(n)
  }
  return hits
}

// 打ち合わせ候補日の列挙（例:「3月3日（火）10：00～18：00」）＝送信側から日程提示＝営業の強シグナル
function hasMeetingSlots(msg: string): boolean {
  const dates = msg.match(/\d{1,2}\s*月\s*\d{1,2}\s*日/g) || []
  if (dates.length >= 2) return true
  // 「6/17（水）：10時〜」形式
  const slashDates = msg.match(/\d{1,2}\/\d{1,2}\s*[（(]/g) || []
  return slashDates.length >= 2
}

function classifyInquiry(data: ContactData): Classification {
  try {
    const msg = (data.message || '')
    const lower = (msg + ' ' + (data.company || '') + ' ' + (data.email || '')).toLowerCase()
    const reasons: string[] = []

    // URL数（自社サイトへの誘導が多いほど営業色が強い）
    const urlCount = (msg.match(/https?:\/\//g) || []).length

    const outboundUrl = OUTBOUND_URL_PATTERNS.some((p) => lower.includes(p))
    const hasUnsub = UNSUBSCRIBE_PATTERNS.some((p) => msg.includes(p))
    const salesHits = countMatches(msg, SALES_PHRASES)
    const pitchHits = countMatches(msg, PITCH_HOOKS)
    const strongLeadHits = countMatches(msg, STRONG_LEAD_PHRASES)
    const weakLeadHits = countMatches(msg, WEAK_LEAD_PHRASES)
    const serviceHits = countMatches(lower, SERVICE_PHRASES)
    const meetingSlots = hasMeetingSlots(msg)

    // --- 確定的な営業シグナル（見込み客はまず書かない） ---
    // 配信停止/オプトアウト文言 → ほぼ確実に一斉送信の営業
    if (hasUnsub) {
      reasons.push('配信停止/オプトアウト文言あり（一斉送信の営業）')
      return { level: 'sales', score: -5, reasons }
    }

    // スコアリング
    let sales = 0
    let lead = 0
    if (outboundUrl) { sales += 3; reasons.push('トラッキング/日程調整URLあり') }
    if (meetingSlots) { sales += 3; reasons.push('打ち合わせ候補日の提示（送信側からの日程提案）') }
    if (pitchHits.length) { sales += Math.min(pitchHits.length, 4); reasons.push(`営業ピッチ表現: ${pitchHits.slice(0, 4).join('・')}`) }
    if (salesHits.length) { sales += Math.min(salesHits.length, 3); reasons.push(`営業的表現: ${salesHits.slice(0, 3).join('・')}`) }
    if (urlCount >= 2) { sales += 2; reasons.push(`本文にURLが${urlCount}件`) }
    else if (urlCount === 1) { sales += 1 }
    if (msg.length > 900) { sales += 1; reasons.push('本文が長い(900字超)') }

    // 見込みは「EMPLAYへの明確な依頼語」があるときだけ加点。曖昧語は依頼語がある時のみ補助的に加点
    if (strongLeadHits.length) { lead += 3 * strongLeadHits.length; reasons.push(`依頼・相談の表現: ${strongLeadHits.slice(0, 3).join('・')}`) }
    if (strongLeadHits.length && serviceHits.length) { lead += 1; reasons.push(`自社サービスへの言及: ${serviceHits.slice(0, 3).join('・')}`) }
    if (strongLeadHits.length && weakLeadHits.length) { lead += 1 }
    // 短く要点だけ＝発注者に多い（ただし日程提示・誘導URL・営業ピッチが無いこと）
    if (msg.length < 300 && urlCount === 0 && !outboundUrl && !meetingSlots && pitchHits.length === 0) {
      lead += 2; reasons.push('短文でURL・営業色なし（発注者に多い形式）')
    }

    const score = lead - sales

    // --- 判定 ---
    // 明確な依頼語があり、強い営業シグナルが無いときだけ lead。
    // それ以外で営業シグナルが強ければ sales。グレーは review（取りこぼし防止）。
    let level: Classification['level']
    if (strongLeadHits.length >= 1 && sales <= 2) level = 'lead'
    else if (sales >= 3 && strongLeadHits.length === 0) level = 'sales'
    else level = 'review'

    return { level, score, reasons: reasons.length ? reasons : ['特筆すべきシグナルなし'] }
  } catch (_e) {
    // 判定が失敗しても通知は必ず出す（要確認扱い）
    return { level: 'review', score: 0, reasons: ['自動判定エラーのため要確認'] }
  }
}

const LEVEL_META: Record<Classification['level'], { tag: string; label: string; color: string; bg: string }> = {
  lead:   { tag: '【要対応の可能性】', label: '🟢 見込み客の可能性（要対応）', color: '#166534', bg: '#dcfce7' },
  review: { tag: '【要確認】',       label: '⚪ 要確認（自動判定では判別できず）', color: '#92400e', bg: '#fef3c7' },
  sales:  { tag: '【営業の可能性】',  label: '🔴 営業メールの可能性', color: '#991b1b', bg: '#fee2e2' },
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')
  const corsHeaders = getCorsHeaders(origin)

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // POSTのみ許可
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 }
    )
  }

  try {
    // レート制限チェック
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     req.headers.get('cf-connecting-ip') ||
                     'unknown'

    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Too many requests. Please try again later.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
      )
    }

    const GMAIL_USER = Deno.env.get('GMAIL_USER')
    const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD')
    const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !NOTIFICATION_EMAIL) {
      throw new Error('Missing environment variables')
    }

    // 入力値のバリデーション
    const rawData = await req.json()
    const validation = validateInput(rawData)

    if (!validation.valid || !validation.data) {
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const contactData = validation.data

    // 問い合わせを自動判定（見込み客/要確認/営業）
    const classification = classifyInquiry(contactData)

    // REST API経由でemplay_hp.contactsに保存
    const insertRes = await fetch(
      `${SUPABASE_URL}/rest/v1/contacts`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY!,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY!}`,
          'Content-Type': 'application/json',
          'Content-Profile': 'emplay_hp',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          company: contactData.company || null,
          phone: contactData.phone || null,
          message: contactData.message,
          classification: classification.level,
          lead_score: classification.score,
          classification_reasons: classification.reasons.join(' / '),
        }),
      }
    )
    if (!insertRes.ok) {
      const errText = await insertRes.text()
      console.error('Database error:', insertRes.status, errText)
      throw new Error(`Failed to save contact data: ${insertRes.status} ${errText}`)
    }

    // HTMLエスケープした値でメール送信
    const safeName = escapeHtml(contactData.name)
    const safeEmail = escapeHtml(contactData.email)
    const safeCompany = contactData.company ? escapeHtml(contactData.company) : '未入力'
    const safePhone = contactData.phone ? escapeHtml(contactData.phone) : '未入力'
    const safeMessage = escapeHtml(contactData.message)

    // 判定結果に応じた件名タグと本文バナー
    const meta = LEVEL_META[classification.level]
    const safeReasons = escapeHtml(classification.reasons.join(' / '))
    const banner = `
          <div style="border-left: 6px solid ${meta.color}; background: ${meta.bg}; padding: 12px 16px; margin-bottom: 16px; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: ${meta.color};">${meta.label}</p>
            <p style="margin: 6px 0 0; font-size: 12px; color: #555;">自動判定の目安です（判定理由: ${safeReasons}）。最終判断はご確認ください。</p>
          </div>`

    // Gmail SMTP経由でメール送信
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    })

    try {
      await transport.sendMail({
        from: `お問い合わせ通知 <${GMAIL_USER}>`,
        to: NOTIFICATION_EMAIL,
        subject: `${meta.tag}【お問い合わせ】${safeCompany !== '未入力' ? safeCompany : safeName}様より`,
        html: `
          ${banner}
          <h2>ホームページからお問い合わせがありました</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
              <th style="border: 1px solid #ddd; padding: 12px; background-color: #f5f5f5; text-align: left; width: 30%;">お名前</th>
              <td style="border: 1px solid #ddd; padding: 12px;">${safeName}</td>
            </tr>
            <tr>
              <th style="border: 1px solid #ddd; padding: 12px; background-color: #f5f5f5; text-align: left;">メールアドレス</th>
              <td style="border: 1px solid #ddd; padding: 12px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <th style="border: 1px solid #ddd; padding: 12px; background-color: #f5f5f5; text-align: left;">会社名</th>
              <td style="border: 1px solid #ddd; padding: 12px;">${safeCompany}</td>
            </tr>
            <tr>
              <th style="border: 1px solid #ddd; padding: 12px; background-color: #f5f5f5; text-align: left;">電話番号</th>
              <td style="border: 1px solid #ddd; padding: 12px;">${safePhone}</td>
            </tr>
            <tr>
              <th style="border: 1px solid #ddd; padding: 12px; background-color: #f5f5f5; text-align: left;">お問い合わせ内容</th>
              <td style="border: 1px solid #ddd; padding: 12px; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            このメールはEMPLAYホームページのお問い合わせフォームから自動送信されています。
          </p>
        `,
      })
    } catch (emailError) {
      console.error('SMTP send error:', emailError)
      // メール送信に失敗してもDBには保存済みなので、警告のみ
      console.warn('Email notification failed, but contact data was saved')
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Contact submitted successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'An error occurred. Please try again.' }),
      {
        headers: { ...getCorsHeaders(req.headers.get('origin')), 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
