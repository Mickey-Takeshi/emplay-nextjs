import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getBlogPost, getRelatedPosts, getAllBlogSlugs } from '@/lib/supabase'
import { getCategorySlug } from '@/lib/categories'
import Breadcrumb from '@/components/Breadcrumb'
import './BlogDetail.css'

// SSG: ビルド時にすべてのブログ記事のパスを生成
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
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
    openGraph: {
      title: `${post.title} | 株式会社EMPLAY`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
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
  })
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, post.category, 4)

  // 構造化データ（Article + BreadcrumbList）
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      '@type': 'Organization',
      name: '株式会社EMPLAY',
      url: 'https://emplay.jp'
    },
    publisher: {
      '@type': 'Organization',
      name: '株式会社EMPLAY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://emplay.jp/favicon.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://emplay.jp/blog/${post.slug}`
    }
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://emplay.jp'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'ブログ',
        item: 'https://emplay.jp/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.category,
        item: `https://emplay.jp/blog/category/${getCategorySlug(post.category)}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title
      }
    ]
  }

  return (
    <main className="blog-detail-page">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
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
          <time className="blog-date" dateTime={post.published_at}>
            {formatDate(post.published_at)}
          </time>
        </div>
      </header>

      {/* サムネイル画像 */}
      <figure className="blog-thumbnail">
        <img src={post.thumbnail} alt={post.title} />
      </figure>

      {/* 記事本文 */}
      <article className="blog-content">
        <div className="container">
          <div className="blog-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* 関連記事セクション */}
      {relatedPosts.length > 0 && (
        <section className="related-posts-section" aria-label="関連記事">
          <div className="container">
            <h2 className="related-posts-title">関連記事</h2>
            <div className="related-posts-grid">
              {relatedPosts.map((relatedPost) => (
                <Link
                  href={`/blog/${relatedPost.slug}`}
                  key={relatedPost.id}
                  className="related-post-card"
                >
                  <div className="related-post-thumbnail">
                    <img src={relatedPost.thumbnail} alt={relatedPost.title} />
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

      {/* お問い合わせCTA */}
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
