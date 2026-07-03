import type { MetadataRoute } from 'next'
import { getBlogPosts, getNews } from '@/lib/supabase'
import { CATEGORY_MAP } from '@/lib/categories'

const BASE_URL = 'https://emplay.jp'

// ビルド時にSupabaseから記事一覧を取得してsitemapを生成する
// (記事追加後は再デプロイで反映される)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, news] = await Promise.all([
    getBlogPosts().catch(() => []),
    getNews().catch(() => []),
  ])

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
      { url: `${BASE_URL}/company`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${BASE_URL}/service`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${BASE_URL}/service/creative`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${BASE_URL}/service/ads`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${BASE_URL}/service/crm`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${BASE_URL}/service/training`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${BASE_URL}/service/hp`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${BASE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
      { url: `${BASE_URL}/news`, changeFrequency: 'weekly', priority: 0.7 },
      { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    ] satisfies MetadataRoute.Sitemap
  ).map((page) => ({ ...page, lastModified: new Date() }))

  // カテゴリページ(実際に記事が存在するカテゴリのみ、既知slugに限る)
  const usedCategories = [...new Set(posts.map((p) => p.category))]
  const categoryPages: MetadataRoute.Sitemap = usedCategories
    .filter((cat) => CATEGORY_MAP[cat])
    .map((cat) => {
      const latest = posts
        .filter((p) => p.category === cat)
        .map((p) => p.published_at)
        .sort()
        .pop()
      return {
        url: `${BASE_URL}/blog/category/${CATEGORY_MAP[cat]}`,
        lastModified: latest ? new Date(latest) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })

  // ブログ記事
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // ニュース記事
  const newsPages: MetadataRoute.Sitemap = news.map((article) => ({
    url: `${BASE_URL}/news/${article.slug}`,
    lastModified: new Date(article.published_at),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...categoryPages, ...blogPages, ...newsPages]
}
