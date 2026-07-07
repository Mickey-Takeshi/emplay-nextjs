import type { NextConfig } from 'next'

// 旧Vite版のsitemapに存在した旧カテゴリslug → 現行slugへの301（恒久）リダイレクト。
// Search Consoleで「404」として検出される旧URLのクロール資産を現行ページへ引き継ぐ。
const OLD_CATEGORY_REDIRECTS = [
  { from: 'web-ads', to: 'marketing' },         // Web広告 → マーケティング
  { from: 'seo', to: 'marketing' },             // SEO → マーケティング
  { from: 'creative', to: 'web-design' },       // クリエイティブ → Web制作
  { from: 'web-production', to: 'web-design' },  // Web制作（旧slug）→ web-design
  { from: 'analytics', to: 'data-analytics' },  // データ分析（旧slug）→ data-analytics
  { from: 'hr', to: 'recruitment' },            // 人事・採用（旧slug）→ recruitment
]

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  async redirects() {
    return [
      // 旧カテゴリURLの404解消（恒久リダイレクト）
      ...OLD_CATEGORY_REDIRECTS.map(({ from, to }) => ({
        source: `/blog/category/${from}`,
        destination: `/blog/category/${to}`,
        permanent: true,
      })),
      // www → apex（重複コンテンツ回避・正規化のため恒久リダイレクト）
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.emplay.jp' }],
        destination: 'https://emplay.jp/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
