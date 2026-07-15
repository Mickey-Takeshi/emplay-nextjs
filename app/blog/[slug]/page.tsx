import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getBlogPost, getRelatedPosts, getAllBlogSlugs } from '@/lib/supabase'
import { getCategorySlug } from '@/lib/categories'
import { createHeadingIdGenerator, extractToc } from '@/lib/toc'
import Breadcrumb from '@/components/Breadcrumb'
import ArticleServiceCTA from '@/components/ArticleServiceCTA'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import './BlogDetail.css'

// ReactMarkdownの見出しノードからテキストを取り出す(アンカーID生成用)
function nodeText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (node && typeof node === 'object' && 'props' in (node as { props?: { children?: unknown } })) {
    return nodeText((node as { props: { children?: unknown } }).props.children)
  }
  return ''
}

// SSG: ビルド時にすべてのブログ記事のパスを生成
export const dynamicParams = false

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

// 動的メタデータ生成
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: '記事が見つかりません',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | 株式会社EMPLAY`,
      description: post.excerpt,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      images: [post.thumbnail],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail],
    },
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  })
}

function dateKey(dateString: string) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(dateString))
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, post.category, 4)
  const toc = extractToc(post.content).filter((item) => item.level === 2)
  const headingId = createHeadingIdGenerator()
  const modifiedAt = post.updated_at || post.published_at
  const hasUpdatedDate = dateKey(modifiedAt) !== dateKey(post.published_at)

  // 構造化データ（Article + BreadcrumbList）
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail,
    datePublished: post.published_at,
    dateModified: modifiedAt,
    inLanguage: 'ja-JP',
    articleSection: post.category,
    author: {
      '@type': 'Organization',
      '@id': 'https://emplay.jp/#organization',
      name: '株式会社EMPLAY',
      url: 'https://emplay.jp'
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://emplay.jp/#organization',
      name: '株式会社EMPLAY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://emplay.jp/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://emplay.jp/blog/${post.slug}`
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://emplay.jp/blog#blog',
      name: '株式会社EMPLAY ブログ',
    },
  }

  return (
    <main className="blog-detail-page">
      {/* 構造化データ（BreadcrumbListはBreadcrumbコンポーネントが出力） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* パンくずリスト */}
      <Breadcrumb items={[
        { label: 'BLOG', path: '/blog' },
        { label: post.category, path: `/blog/category/${getCategorySlug(post.category)}` },
        { label: post.title }
      ]} />

      {/* ブログ記事ヘッダー */}
      <header className="blog-header">
        <div className="container">
          <Link href={`/blog/category/${getCategorySlug(post.category)}`} className="blog-category-link">
            {post.category}
          </Link>
          <h1 className="blog-title">{post.title}</h1>
          <div className="blog-dates" aria-label="記事の日付">
            <time className="blog-date" dateTime={post.published_at}>
              公開日 {formatDate(post.published_at)}
            </time>
            {hasUpdatedDate && (
              <time className="blog-date blog-date-updated" dateTime={modifiedAt}>
                更新日 {formatDate(modifiedAt)}
              </time>
            )}
          </div>
        </div>
      </header>

      {/* サムネイル画像 */}
      <figure className="blog-thumbnail">
        <img src={post.thumbnail} alt={post.title} fetchPriority="high" decoding="async" width="1200" height="675" />
      </figure>

      {/* 記事本文 */}
      <article className="blog-content">
        <div className="container">
          {/* 目次（見出しが3つ以上のとき） */}
          {toc.length >= 3 && (
            <nav className="blog-toc" aria-label="目次">
              <p className="blog-toc-title">目次</p>
              <ul className="blog-toc-list">
                {toc.map((item, i) => (
                  <li key={i} className={`blog-toc-item blog-toc-l${item.level}`}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="blog-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => <h2 id={headingId(nodeText(children))}>{children}</h2>,
                h3: ({ children }) => <h3 id={headingId(nodeText(children))}>{children}</h3>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* 著者・監修（E-E-A-T） */}
          <div className="blog-author">
            <div className="blog-author-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="8,5 19,12 8,19" />
                <polygon points="3,5 8,8 8,16 3,19" />
              </svg>
            </div>
            <div className="blog-author-body">
              <p className="blog-author-name">株式会社EMPLAY 編集部</p>
              <p className="blog-author-desc">
                中小企業のWeb集客・DX推進を支援するEMPLAYが、現場で得た実践知をもとに執筆・監修しています。
                <Link href="/company">運営会社について</Link>
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* 記事→サービスCTA（カテゴリ連動） */}
      <ArticleServiceCTA category={post.category} />

      {/* 関連記事セクション */}
      {relatedPosts.length > 0 && (
        <section className="related-posts-section" aria-label="関連記事">
          <div className="container">
            <h2 className="related-posts-title">あわせて読みたい</h2>
            <div className="related-posts-grid">
              {relatedPosts.map((relatedPost) => (
                <Link
                  href={`/blog/${relatedPost.slug}`}
                  key={relatedPost.id}
                  className="related-post-card"
                >
                  <div className="related-post-thumbnail">
                    <img src={relatedPost.thumbnail} alt={relatedPost.title} loading="lazy" decoding="async" width="800" height="450" />
                  </div>
                  <div className="related-post-content">
                    <span className="related-post-category">{relatedPost.category}</span>
                    <h3 className="related-post-title">{relatedPost.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <StickyMobileCTA location="blog_article" />
    </main>
  )
}
