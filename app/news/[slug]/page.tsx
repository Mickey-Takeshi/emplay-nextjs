import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getNewsArticle, getAllNewsSlugs } from '@/lib/supabase'
import Breadcrumb from '@/components/Breadcrumb'
import './NewsDetail.css'

// SSG: ビルド時にすべてのニュース記事のパスを生成
export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

// 動的メタデータ生成
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsArticle(slug)

  if (!article) {
    return {
      title: '記事が見つかりません',
    }
  }

  return {
    title: article.title,
    description: `${article.title} - 株式会社EMPLAYからのお知らせです。`,
    openGraph: {
      title: `${article.title} | 株式会社EMPLAY`,
      description: `${article.title} - 株式会社EMPLAYからのお知らせです。`,
      type: 'article',
      publishedTime: article.published_at,
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

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getNewsArticle(slug)

  if (!article) {
    notFound()
  }

  // 構造化データ
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    datePublished: article.published_at,
    dateModified: article.published_at,
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
      '@id': `https://emplay.jp/news/${article.slug}`
    }
  }

  return (
    <main className="news-detail-page">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ページヘッダー */}
      <header className="page-header-hero" aria-label="ページヘッダー">
        <div className="page-header-background" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
            alt=""
            className="page-header-bg-image"
          />
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-content">
          <h1 className="page-title-hero">NEWS</h1>
          <p className="page-title-ja-hero">お知らせ</p>
        </div>
      </header>

      {/* パンくずリスト */}
      <Breadcrumb items={[
        { label: 'NEWS', path: '/news' },
        { label: article.title }
      ]} />

      {/* 記事本文 */}
      <article className="news-article">
        <div className="container">
          <header className="news-article-header">
            <time className="news-article-date" dateTime={article.published_at}>
              {formatDate(article.published_at)}
            </time>
            <h2 className="news-article-title">{article.title}</h2>
          </header>

          <div className="news-article-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>

          <footer className="news-article-footer">
            <Link href="/news" className="back-to-list">
              ← お知らせ一覧に戻る
            </Link>
          </footer>
        </div>
      </article>

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
