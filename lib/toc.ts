// Markdown本文からH2/H3見出しを抽出し、目次(TOC)とアンカーIDを生成する。

export type TocItem = { level: 2 | 3; text: string; id: string }

// 見出しテキスト → アンカーID(日本語はそのまま、記号除去)
export function slugifyHeading(text: string): string {
  return (
    'h-' +
    text
      .trim()
      .replace(/`/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // markdownリンクはテキストのみ
      .replace(/[!-/:-@[-`{-~]/g, '') // 半角記号
      .replace(/\s+/g, '-')
      .slice(0, 60)
  )
}

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = []
  const lines = markdown.split('\n')
  let inCodeBlock = false
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (m) {
      const level = m[1].length as 2 | 3
      const text = m[2].replace(/`/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim()
      items.push({ level, text, id: slugifyHeading(text) })
    }
  }
  return items
}
