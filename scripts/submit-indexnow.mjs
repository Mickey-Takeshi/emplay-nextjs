#!/usr/bin/env node
/**
 * IndexNow でサイト内URLの更新をBing・Yandex等へ一括通知する。
 *
 * IndexNowは参加検索エンジン間で共有されるため、1エンドポイントへの送信で
 * Bing / Yandex / Seznam / Naver に伝わる（Googleは非対応）。
 * ChatGPTのWeb検索はBingインデックスを利用するため、AI検索対策としても効く。
 *
 * 使い方:
 *   node scripts/submit-indexnow.mjs              # sitemap.xml の全URLを送信
 *   node scripts/submit-indexnow.mjs --recent 20  # 更新の新しい20件だけ送信
 *   node scripts/submit-indexnow.mjs --url https://emplay.jp/blog/foo  # 個別送信
 *   node scripts/submit-indexnow.mjs --dry-run    # 送信せず対象だけ表示
 */

const HOST = 'emplay.jp'
const KEY = 'aae976c3c9c781eaf38591e2cc8fc0f5'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const SITEMAP = `https://${HOST}/sitemap.xml`
const BATCH_SIZE = 10000 // IndexNowの1リクエスト上限

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const urlIndex = args.indexOf('--url')
const recentIndex = args.indexOf('--recent')

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP, { headers: { 'User-Agent': 'emplay-indexnow/1.0' } })
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
  const xml = await res.text()

  // <url><loc>…</loc><lastmod>…</lastmod></url> を組で取り出す
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
    const block = m[1]
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
    const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]
    return { loc, lastmod: lastmod ? Date.parse(lastmod) : 0 }
  })

  const valid = entries.filter((e) => e.loc?.startsWith(`https://${HOST}`))
  if (recentIndex !== -1) {
    const n = Number(args[recentIndex + 1] || 20)
    return valid.sort((a, b) => b.lastmod - a.lastmod).slice(0, n).map((e) => e.loc)
  }
  return valid.map((e) => e.loc)
}

async function submit(urlList) {
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  return { status: res.status, text: text.slice(0, 200) }
}

async function main() {
  const urls =
    urlIndex !== -1 ? [args[urlIndex + 1]] : await urlsFromSitemap()

  if (!urls.length || !urls[0]) {
    console.error('送信対象のURLがありません')
    process.exit(1)
  }

  console.log(`IndexNow: ${urls.length}件のURLを送信します`)
  console.log(`  key location: ${KEY_LOCATION}`)
  console.log(`  例: ${urls.slice(0, 3).join(', ')}${urls.length > 3 ? ' …' : ''}`)

  if (dryRun) {
    console.log('--dry-run のため送信しませんでした')
    return
  }

  // キーファイルが公開されているか事前確認（未公開だと403になる）
  const keyRes = await fetch(KEY_LOCATION)
  if (!keyRes.ok) {
    console.error(`キーファイルが公開されていません: ${KEY_LOCATION} (${keyRes.status})`)
    console.error('デプロイ後に再実行してください')
    process.exit(1)
  }

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE)
    const { status, text } = await submit(batch)
    // 200/202 = 受理。IndexNowは受理後に非同期でクロールされる
    const ok = status === 200 || status === 202
    console.log(`  batch ${i / BATCH_SIZE + 1}: HTTP ${status} ${ok ? 'OK' : `NG ${text}`}`)
    if (!ok) process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
