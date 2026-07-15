import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import { getBlogPostSummaries } from '@/lib/supabase'
import { getCategorySlug } from '@/lib/categories'
import './SiteMap.css'

export const metadata: Metadata = {
  title: 'サイトマップ',
  description: '株式会社EMPLAYのサービス、会社情報、ブログ記事を一覧で確認できます。',
  alternates: { canonical: '/site-map' },
  openGraph: {
    title: 'サイトマップ | 株式会社EMPLAY',
    description: '株式会社EMPLAYのサービス、会社情報、ブログ記事を一覧で確認できます。',
    url: '/site-map',
  },
}

const primaryLinks = [
  { href: '/', label: 'ホーム' },
  { href: '/company', label: '会社概要' },
  { href: '/service', label: 'サービス一覧' },
  { href: '/service/hp', label: 'HP制作サービス' },
  { href: '/service/creative', label: 'クリエイティブ制作' },
  { href: '/service/ads', label: 'Web広告運用' },
  { href: '/service/crm', label: 'CRM導入支援' },
  { href: '/blog', label: 'ブログ' },
  { href: '/news', label: 'ニュース' },
  { href: '/careers', label: '採用情報' },
  { href: '/contact', label: 'お問い合わせ' },
  { href: '/privacy', label: 'プライバシーポリシー' },
]

export default async function SiteMapPage() {
  const posts = await getBlogPostSummaries().catch(() => [])
  const categories = [...new Set(posts.map((post) => post.category))].sort((a, b) =>
    a.localeCompare(b, 'ja')
  )

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '株式会社EMPLAY サイトマップ',
    url: 'https://emplay.jp/site-map',
    inLanguage: 'ja-JP',
    isPartOf: { '@id': 'https://emplay.jp/#website' },
  }

  return (
    <main className="site-map-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="site-map-header">
        <div className="container">
          <p className="site-map-eyebrow">SITE MAP</p>
          <h1>サイトマップ</h1>
          <p>サービスと公開中の記事をカテゴリ別に掲載しています。</p>
        </div>
      </header>

      <Breadcrumb items={[{ label: 'サイトマップ' }]} />

      <section className="site-map-section" aria-labelledby="site-map-primary-heading">
        <div className="container">
          <h2 id="site-map-primary-heading">主要ページ</h2>
          <ul className="site-map-primary-list">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <a href="https://academy.emplay.jp/" target="_blank" rel="noopener noreferrer">
                AI ACADEMY <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="site-map-section site-map-articles" aria-labelledby="site-map-articles-heading">
        <div className="container">
          <div className="site-map-section-heading">
            <h2 id="site-map-articles-heading">ブログ記事</h2>
            <p>{posts.length}件</p>
          </div>

          <div className="site-map-category-list">
            {categories.map((category) => {
              const categoryPosts = posts.filter((post) => post.category === category)
              return (
                <section className="site-map-category" key={category} aria-labelledby={`category-${getCategorySlug(category)}`}>
                  <div className="site-map-category-heading">
                    <h3 id={`category-${getCategorySlug(category)}`}>{category}</h3>
                    <Link href={`/blog/category/${getCategorySlug(category)}`}>カテゴリを見る</Link>
                  </div>
                  <ul>
                    {categoryPosts.map((post) => (
                      <li key={post.id}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
