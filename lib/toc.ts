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

// 同じ見出しが複数ある記事でも、目次と本文で一意のIDを共有する。
export function createHeadingIdGenerator(): (text: string) => string {
  const occurrences = new Map<string, number>()

  return (text: string) => {
    const baseId = slugifyHeading(text)
    const count = (occurrences.get(baseId) ?? 0) + 1
    occurrences.set(baseId, count)
    return count === 1 ? baseId : `${baseId}-${count}`
  }
}

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = []
  const headingId = createHeadingIdGenerator()
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
      items.push({ level, text, id: headingId(text) })
    }
  }
  return items
}
