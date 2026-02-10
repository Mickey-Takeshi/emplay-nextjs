import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts, getBlogCategories } from '@/lib/supabase'
import { getCategorySlug } from '@/lib/categories'
import Breadcrumb from '@/components/Breadcrumb'
import './Blog.css'

export const metadata: Metadata = {
  title: 'ブログ',
  description: '株式会社EMPLAYのブログです。DX、ウェブマーケティング、コンテンツ制作に関する情報を発信しています。',
  openGraph: {
    title: 'ブログ | 株式会社EMPLAY',
    description: '株式会社EMPLAYのブログです。DX、ウェブマーケティング、コンテンツ制作に関する情報を発信しています。',
  },
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.')
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories()
  ])

  return (
    <main className="blog-page">
      {/* ページヘッダー */}
      <header className="page-header-hero" aria-label="ページヘッダー">
        <div className="page-header-background" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80"
            alt=""
            className="page-header-bg-image"
          />
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-content">
          <h1 className="page-title-hero">BLOG</h1>
          <p className="page-title-ja-hero">ブログ</p>
        </div>
      </header>

      {/* パンくずリスト */}
      <Breadcrumb items={[{ label: 'BLOG' }]} />

      {/* カテゴリナビ */}
      {categories.length > 0 && (
        <section className="category-nav-section">
          <div className="container">
            <div className="category-nav">
              <Link href="/blog" className="category-link active">
                すべて
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${getCategorySlug(category)}`}
                  className="category-link"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ブログ一覧 */}
      <section className="section blog-section" aria-labelledby="blog-heading">
        <div className="container">
          <h2 id="blog-heading" className="visually-hidden">ブログ記事一覧</h2>

          {posts.length === 0 ? (
            <div className="no-posts">
              <p>ブログ記事はまだありません。</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <article key={post.id} className="blog-card">
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    <figure className="blog-card-image">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                      />
                    </figure>
                    <div className="blog-card-content">
                      <span className="blog-card-category">{post.category}</span>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <time className="blog-card-date" dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                      </time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* コンタクトセクション */}
      <section className="contact-section-page" aria-label="お問い合わせ">
        <div className="container">
          <Link href="/contact" className="contact-box" aria-label="お問い合わせページへ移動">
            <div className="contact-box-content">
              <h2 className="contact-box-title">CONTACT</h2>
              <p className="contact-box-text">お問い合わせはこちらから</p>
            </div>
            <span className="contact-box-arrow" aria-hidden="true">&gt;</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
