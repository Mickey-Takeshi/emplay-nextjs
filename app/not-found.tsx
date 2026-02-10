import type { Metadata } from 'next'
import Link from 'next/link'

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
      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-en)', fontSize: '6rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            404
          </h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            ページが見つかりません
          </h2>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
            お探しのページは移動または削除された可能性があります。
          </p>
          <Link href="/" className="btn btn-primary">
            トップページへ戻る
          </Link>
        </div>
      </section>
    </main>
  )
}
