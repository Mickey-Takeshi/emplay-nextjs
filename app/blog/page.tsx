import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPaginatedBlogPosts, getBlogCategories } from '@/lib/supabase'
import { getCategorySlug } from '@/lib/categories'
import { BLOG_PAGE_SIZE, parsePageParam } from '@/lib/pagination'
import Breadcrumb from '@/components/Breadcrumb'
import BlogPagination from '@/components/BlogPagination'
import './Blog.css'

interface BlogPageProps {
  searchParams: Promise<{ page?: string | string[] }>
}

const BLOG_DESCRIPTION = '株式会社EMPLAYのブログです。DX、ウェブマーケティング、コンテンツ制作に関する情報を発信しています。'

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { page: pageParam } = await searchParams
  const page = parsePageParam(pageParam)
  const canonical = page === 1 ? '/blog' : `/blog?page=${page}`

  return {
    title: page === 1 ? 'ブログ' : `ブログ - ${page}ページ目`,
    description: BLOG_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title: page === 1 ? 'ブログ | 株式会社EMPLAY' : `ブログ - ${page}ページ目 | 株式会社EMPLAY`,
      description: BLOG_DESCRIPTION,
      url: canonical,
    },
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tokyo',
  }).replace(/\//g, '.')
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams
  const currentPage = parsePageParam(pageParam)
  const [paginatedPosts, categories] = await Promise.all([
    getPaginatedBlogPosts(currentPage, BLOG_PAGE_SIZE),
    getBlogCategories()
  ])
  const { posts, totalCount, totalPages } = paginatedPosts

  if (totalPages > 0 && currentPage > totalPages) notFound()

  return (
    <main className="blog-page">
      {/* ページヘッダー */}
      <header className="page-header-hero" aria-label="ページヘッダー">
        <div className="page-header-bg" aria-hidden="true"></div>
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
            <>
              <p className="blog-results-summary">
                全{totalCount}件中 {(currentPage - 1) * BLOG_PAGE_SIZE + 1}〜
                {Math.min(currentPage * BLOG_PAGE_SIZE, totalCount)}件を表示
              </p>
              <div className="blog-grid">
              {posts.map((post, index) => (
                <article key={post.id} className="blog-card">
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    <figure className="blog-card-image">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : undefined}
                        decoding="async"
                        width="800"
                        height="500"
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
              <BlogPagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} />
            </>
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
