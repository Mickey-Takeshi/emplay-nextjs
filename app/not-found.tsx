import type { Metadata } from 'next'
import Link from 'next/link'
import './NotFound.css'

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  description: 'お探しのページは見つかりませんでした。',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-content">
        <div className="container">
          <p className="not-found-code">404 ERROR</p>
          <h1>ページが見つかりません</h1>
          <p className="not-found-message">
            お探しのページは移動または削除された可能性があります。
          </p>
          <div className="not-found-actions">
            <Link href="/" className="btn btn-primary">トップページへ戻る</Link>
            <Link href="/service" className="btn btn-outline">サービスを見る</Link>
          </div>
          <nav className="not-found-links" aria-label="関連ページ">
            <Link href="/blog">ブログ</Link>
            <Link href="/company">会社概要</Link>
            <Link href="/contact">お問い合わせ</Link>
          </nav>
        </div>
      </section>
    </main>
  )
}
