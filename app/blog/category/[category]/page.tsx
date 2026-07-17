import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPaginatedBlogPostsByCategory, getBlogCategories } from '@/lib/supabase'
import { getCategorySlug, SLUG_TO_NAME } from '@/lib/categories'
import { getCategoryDescription } from '@/lib/categoryDescriptions'
import { BLOG_PAGE_SIZE, parsePageParam } from '@/lib/pagination'
import Breadcrumb from '@/components/Breadcrumb'
import BlogPagination from '@/components/BlogPagination'
import '../../Blog.css'

// SSG: ビルド時にすべてのカテゴリページのパスを生成
export const dynamicParams = false

export async function generateStaticParams() {
  try {
    const categories = await getBlogCategories()
    return categories.map((category) => ({
      category: getCategorySlug(category)
    }))
  } catch {
    return []
  }
}

// 動的メタデータ生成
interface BlogCategoryPageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string | string[] }>
}

function getKnownCategoryName(categorySlug: string) {
  const categoryName = SLUG_TO_NAME[categorySlug]
  if (!categoryName) notFound()
  return categoryName
}

export async function generateMetadata({ params, searchParams }: BlogCategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const { page: pageParam } = await searchParams
  const page = parsePageParam(pageParam)
  const categoryName = getKnownCategoryName(categorySlug)
  const categoryDesc = getCategoryDescription(categoryName)
  const description = categoryDesc?.summary || `${categoryName}に関するブログ記事の一覧です。`
  const canonical = page === 1
    ? `/blog/category/${categorySlug}`
    : `/blog/category/${categorySlug}?page=${page}`

  return {
    title: page === 1 ? `${categoryName}の記事一覧` : `${categoryName}の記事一覧 - ${page}ページ目`,
    description,
    alternates: { canonical },
    openGraph: {
      title: page === 1
        ? `${categoryName}の記事一覧 | 株式会社EMPLAY`
        : `${categoryName}の記事一覧 - ${page}ページ目 | 株式会社EMPLAY`,
      description,
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

export default async function BlogCategoryPage({ params, searchParams }: BlogCategoryPageProps) {
  const { category: categorySlug } = await params
  const { page: pageParam } = await searchParams
  const currentPage = parsePageParam(pageParam)
  const categoryName = getKnownCategoryName(categorySlug)
  const [paginatedPosts, categories] = await Promise.all([
    getPaginatedBlogPostsByCategory(categoryName, currentPage, BLOG_PAGE_SIZE),
    getBlogCategories()
  ])
  const { posts, totalCount, totalPages } = paginatedPosts
  const categoryDescription = getCategoryDescription(categoryName)
  const pageLabel = currentPage === 1
    ? `${categoryName}の記事一覧`
    : `${categoryName}の記事一覧 ${currentPage}ページ目`
  const pageUrl = currentPage === 1
    ? `https://emplay.jp/blog/category/${categorySlug}`
    : `https://emplay.jp/blog/category/${categorySlug}?page=${currentPage}`
  const categoryStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageLabel,
    description: categoryDescription?.summary || `${categoryName}に関するブログ記事の一覧です。`,
    url: pageUrl,
    inLanguage: 'ja-JP',
    isPartOf: { '@id': 'https://emplay.jp/blog#blog' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalCount,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: (currentPage - 1) * BLOG_PAGE_SIZE + index + 1,
        name: post.title,
        url: `https://emplay.jp/blog/${post.slug}`,
      })),
    },
  }

  if (totalPages > 0 && currentPage > totalPages) notFound()

  return (
    <main className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      {/* ページヘッダー */}
      <header className="page-header-hero" aria-label="ページヘッダー">
        <div className="page-header-bg" aria-hidden="true"></div>
        <div className="page-header-content">
          <h1 className="page-title-hero">{categoryName}</h1>
          <p className="page-title-ja-hero">
            {currentPage === 1 ? '記事一覧' : `記事一覧 ${currentPage}ページ目`}
          </p>
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
      {categoryDescription && currentPage === 1 && (
        <section className="category-summary-section" aria-labelledby="category-summary-heading">
          <div className="container">
            <div className="category-summary">
              <h2 id="category-summary-heading" className="visually-hidden">{categoryName}カテゴリについて</h2>
              <p className="category-summary-text">{categoryDescription.summary}</p>
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
              <BlogPagination
                basePath={`/blog/category/${categorySlug}`}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </section>

      {categoryDescription && currentPage === 1 && (
        <section className="category-description-section" aria-labelledby="category-guide-heading">
          <div className="container">
            <div className="category-description">
              <h2 id="category-guide-heading" className="category-description-title">
                {categoryName}の実践ガイド
              </h2>
              <div className="category-description-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {categoryDescription.description}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </section>
      )}

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
