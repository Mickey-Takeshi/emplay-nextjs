// ブログカテゴリの定義
// 日本語名とURLスラッグのマッピング

export const CATEGORY_MAP: Record<string, string> = {
  'マーケティング': 'marketing',
  '採用': 'recruitment',
  'DX': 'dx',
  'ビジネス': 'business',
  'AI活用': 'ai',
  'Web制作': 'web-design',
  'EC・ネットショップ': 'ec',
  '補助金・助成金': 'subsidy',
  'データ分析': 'data-analytics',
  'セキュリティ': 'security',
}

// スラッグから日本語名への逆マッピング
export const SLUG_TO_NAME: Record<string, string> = {
  'marketing': 'マーケティング',
  'recruitment': '採用',
  'dx': 'DX',
  'business': 'ビジネス',
  'ai': 'AI活用',
  'web-design': 'Web制作',
  'ec': 'EC・ネットショップ',
  'subsidy': '補助金・助成金',
  'data-analytics': 'データ分析',
  'security': 'セキュリティ',
}

// 日本語カテゴリ名からスラッグを取得
export const getCategorySlug = (categoryName: string): string => {
  return CATEGORY_MAP[categoryName] || categoryName.toLowerCase()
}

// スラッグから日本語カテゴリ名を取得
export const getCategoryName = (slug: string): string => {
  return SLUG_TO_NAME[slug] || slug
}
