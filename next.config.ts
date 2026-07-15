import type { NextConfig } from 'next'

// 旧Vite版のsitemapに存在した旧カテゴリslug → 現行slugへの恒久リダイレクト。
// Search Consoleで「404」として検出される旧URLのクロール資産を現行ページへ引き継ぐ。
const OLD_CATEGORY_REDIRECTS = [
  { from: 'web-ads', to: 'marketing' },         // Web広告 → マーケティング
  { from: 'seo', to: 'marketing' },             // SEO → マーケティング
  { from: 'creative', to: 'web-design' },       // クリエイティブ → Web制作
  { from: 'web-production', to: 'web-design' },  // Web制作（旧slug）→ web-design
  { from: 'analytics', to: 'data-analytics' },  // データ分析（旧slug）→ data-analytics
  { from: 'hr', to: 'recruitment' },            // 人事・採用（旧slug）→ recruitment
]

const OLD_BLOG_REDIRECTS = [
  // GA4記事は検索意図が重複していたため、分析ガイドへ統合する。
  { from: 'ga4-guide-2025', to: 'ga4-analytics-guide' },
  { from: 'ga4-guide', to: 'ga4-analytics-guide' },
  { from: 'ga4-advanced-guide', to: 'ga4-analytics-guide' },
  { from: 'bi-tool-introduction-guide', to: 'bi-tools-guide' },
  { from: 'image-generation-ai-guide', to: 'image-generation-ai-business-guide' },
  { from: 'bi-tool-guide', to: 'bi-tools-guide' },
  { from: 'remote-work-guide', to: 'remote-work-implementation-guide' },
  { from: 'ab-test-practical-guide', to: 'lp-ab-test-guide' },
  // Search Consoleで404として検出された旧slug。
  { from: 'website-cost-guide', to: 'website-development-cost-guide' },
  { from: 'paperless-office-guide', to: 'paperless-implementation-guide' },
  { from: 'btob-content-marketing-guide', to: 'btob-content-marketing-strategy' },
  { from: 'shokibo-jizokuka-subsidy-guide', to: 'small-business-subsidy-guide' },
  { from: 'ec-platform-comparison', to: 'ec-platform-comparison-guide' },
  // 同じ検索意図の記事を正規URLへ集約する。
  { from: 'dx-strategy-guide', to: 'sme-dx-promotion-guide' },
  { from: 'shopify-beginner-guide', to: 'shopify-ec-setup-guide' },
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
      // 旧記事URLを内容が最も近い現行記事へ統合
      ...OLD_BLOG_REDIRECTS.map(({ from, to }) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
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
