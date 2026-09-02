// Markdown本文から「よくある質問」節を取り出し、FAQPage構造化データ用のQ&A配列にする。
// 本文に書かれている文言だけを使う(生成・要約はしない)。抽出できない記事では空配列を返す。

import type { FaqEntry } from '@/components/FaqJsonLd'

// FAQ節とみなすH2見出し。表記ゆれは4種類しかないことを実測で確認している。
const FAQ_HEADING = /^(よくある(ご)?質問(（FAQ）|\(FAQ\))?|FAQ|Q&A(｜.*)?)$/

// 設問が1問だけの節はFAQとして扱わない(誤検出を避ける)
const MIN_QUESTIONS = 2

// Markdown装飾を落として素のテキストにする
function plain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // リンクはテキストのみ
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // 画像は落とす
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

// 「Q. 」「A. 」のような接頭辞を外す。
// 区切り文字か空白を必須にしないと、「AIサービス」の A や「QRコード」の Q まで削ってしまう。
function stripPrefix(text: string, letter: 'Q' | 'A'): string {
  return text.replace(new RegExp(`^${letter}(?:\\s*[.．:：]\\s*|\\s+)`), '').trim()
}

export function extractFaq(markdown: string): FaqEntry[] {
  const lines = markdown.split('\n')
  const entries: FaqEntry[] = []

  let inCodeBlock = false
  let inFaqSection = false
  let question: string | null = null
  let answer: string[] = []

  const flush = () => {
    if (question) {
      const a = stripPrefix(answer.join(' ').trim(), 'A')
      if (a) entries.push({ q: question, a })
    }
    question = null
    answer = []
  }

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const h2 = /^##(?!#)\s+(.+?)\s*$/.exec(line)
    if (h2) {
      flush()
      inFaqSection = FAQ_HEADING.test(plain(h2[1]))
      continue
    }
    if (!inFaqSection) continue

    const h3 = /^###(?!#)\s+(.+?)\s*$/.exec(line)
    if (h3) {
      flush()
      question = stripPrefix(plain(h3[1]), 'Q')
      continue
    }
    if (!question) continue

    // 表は回答本文に含めない。箇条書きは記号だけ外して文として拾う。
    const body = line.trim()
    if (!body || body.startsWith('|')) continue
    answer.push(plain(body.replace(/^([-*]|\d+\.)\s+/, '')))
  }
  flush()

  return entries.length >= MIN_QUESTIONS ? entries : []
}
