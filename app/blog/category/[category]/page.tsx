import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPostsByCategory, getBlogCategories } from '@/lib/supabase'
import { getCategorySlug, getCategoryName } from '@/lib/categories'
import { getCategoryDescription } from '@/lib/categoryDescriptions'
import Breadcrumb from '@/components/Breadcrumb'
import '../../Blog.css'

// SSG: ビルド時にすべてのカテゴリページのパスを生成
export async function generateStaticParams() {
  const categories = await getBlogCategories()
  return categories.map((category) => ({
    category: getCategorySlug(category)
  }))
}

// 動的メタデータ生成
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params
  const categoryName = getCategoryName(categorySlug)
  const categoryDesc = getCategoryDescription(categoryName)
  const description = categoryDesc?.summary || `${categoryName}に関するブログ記事の一覧です。`

  return {
    title: `${categoryName}の記事一覧`,
    description,
    openGraph: {
      title: `${categoryName}の記事一覧 | 株式会社EMPLAY`,
      description,
    },
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.')
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params
  const categoryName = getCategoryName(categorySlug)
  const [posts, categories] = await Promise.all([
    getBlogPostsByCategory(categoryName),
    getBlogCategories()
  ])
  const categoryDescription = getCategoryDescription(categoryName)

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
          <p className="page-title-ja-hero">{categoryName}</p>
        </div>
      </header>

      {/* パンくずリスト */}
      <Breadcrumb items={[
        { label: 'BLOG', path: '/blog' },
        { label: categoryName }
      ]} />

      {/* カテゴリナビ */}
      {categories.length > 0 && (
        <section className="category-nav-section">
          <div className="container">
            <div className="category-nav">
              <Link href="/blog" className="category-link">
                すべて
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog/category/${getCategorySlug(cat)}`}
                  className={`category-link ${cat === categoryName ? 'active' : ''}`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* カテゴリ説明 */}
      {categoryDescription && (
        <section className="category-description-section">
          <div className="container">
            <div className="category-description-box">
              <h2 className="category-description-title">{categoryName}について</h2>
              <p className="category-description-text">{categoryDescription.summary}</p>
            </div>
          </div>
        </section>
      )}

      {/* ブログ一覧 */}
      <section className="section blog-section" aria-labelledby="blog-heading">
        <div className="container">
          <h2 id="blog-heading" className="visually-hidden">{categoryName}の記事一覧</h2>

          {posts.length === 0 ? (
            <div className="no-posts">
              <p>このカテゴリの記事はまだありません。</p>
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
