import type { Metadata } from 'next'
import Link from 'next/link'
import { getNews } from '@/lib/supabase'
import Breadcrumb from '@/components/Breadcrumb'
import './News.css'

export const metadata: Metadata = {
  title: 'お知らせ',
  description: '株式会社EMPLAYからのお知らせ・ニュースを掲載しています。',
  openGraph: {
    title: 'お知らせ | 株式会社EMPLAY',
    description: '株式会社EMPLAYからのお知らせ・ニュースを掲載しています。',
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

export default async function NewsPage() {
  const news = await getNews()

  return (
    <main className="news-page">
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
      <Breadcrumb items={[{ label: 'NEWS' }]} />

      {/* ニュース一覧 */}
      <section className="section news-list-section" aria-labelledby="news-heading">
        <div className="container">
          <h2 id="news-heading" className="visually-hidden">ニュース一覧</h2>

          {news.length === 0 ? (
            <div className="no-news">
              <p>お知らせはまだありません。</p>
            </div>
          ) : (
            <div className="news-list" role="list">
              {news.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="news-item"
                  role="listitem"
                >
                  <time className="news-item-date" dateTime={article.published_at}>
                    {formatDate(article.published_at)}
                  </time>
                  <span className="news-item-title">{article.title}</span>
                </Link>
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
