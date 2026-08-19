'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import './Company.css'

export default function CompanyClient() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="company-page">
      {/* ヒーロー */}
      <section className="company-hero">
        <div className="company-hero-bg" aria-hidden="true">
          <div className="company-hero-pattern"></div>
        </div>
        <div className="company-hero-content">
          <p className="company-hero-label">ABOUT US</p>
          <h1 className="company-hero-title">
            社会にもっと<br />わくわくを創り続ける
          </h1>
          <p className="company-hero-description">
            わくわくの源泉は過去を超える可能性だ。<br />
            課題を再定義して、洗練された解法を求め続ける。
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'COMPANY' }]} />

      {/* ミッション */}
      <section className="section mission-section">
        <div className="container">
          <div className="mission-content animate-on-scroll">
            <p className="section-label">MISSION</p>
            <h2 className="mission-heading">想定外を企てる</h2>
            <div className="mission-texts">
              <p>
                既存の枠に囚われずに、組み合わせ、積み合わせる。<br />
                新たな可能性を追い求めて、突破する。
              </p>
              <p>
                変化の激しい社会に勝利の正解は無い。<br />
                常に変化して、想定外を企てることが、未来への一手となる。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section values-section">
        <div className="container">
          <div className="values-header animate-on-scroll">
            <p className="section-label">VALUES</p>
            <h2 className="values-title">EMPLAYの4P</h2>
            <p className="values-subtitle">私たちが大切にする4つの価値観</p>
          </div>

          <div className="values-grid">
            <article className="value-card animate-on-scroll">
              <div className="value-number">01</div>
              <h3 className="value-title">PLAN</h3>
              <p className="value-subtitle">企てる</p>
              <p className="value-text">
                小さな課題や疑問に対して、常に創造し自分のアイディアを形にする。
              </p>
            </article>
            <article className="value-card animate-on-scroll">
              <div className="value-number">02</div>
              <h3 className="value-title">PLAY</h3>
              <p className="value-subtitle">遊ぶ</p>
              <p className="value-text">
                押し付けるのではなく寄り添う。スマートな振る舞いを心がける。
              </p>
            </article>
            <article className="value-card animate-on-scroll">
              <div className="value-number">03</div>
              <h3 className="value-title">POSITIVE</h3>
              <p className="value-subtitle">逆境を乗りこなす</p>
              <p className="value-text">
                課題に対して、常に一歩先に前進する。ポジティブは周囲を幸せにする。
              </p>
            </article>
            <article className="value-card animate-on-scroll">
              <div className="value-number">04</div>
              <h3 className="value-title">PROFESSIONAL</h3>
              <p className="value-subtitle">プロとして遂行する</p>
              <p className="value-text">
                自分のこだわりを大切に、最後まで責任を持ってやり遂げる。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 会社概要 */}
      <section className="section company-info-section">
        <div className="container">
          <div className="company-info-content animate-on-scroll">
            <p className="section-label">COMPANY INFO</p>
            <h2 className="company-info-title">会社概要</h2>

            <dl className="company-info-list">
              <div className="company-info-item">
                <dt>会社名</dt>
                <dd>株式会社EMPLAY</dd>
              </div>
              <div className="company-info-item">
                <dt>所在地</dt>
                <dd>
                  <address>
                    〒150-0001<br />
                    東京都渋谷区神宮前6丁目23番4号<br />
                    桑野ビル2階
                  </address>
                </dd>
              </div>
              <div className="company-info-item">
                <dt>設立</dt>
                <dd><time dateTime="2023-12">2023年12月</time></dd>
              </div>
              <div className="company-info-item">
                <dt>事業内容</dt>
                <dd>
                  Webマーケティング支援 / クリエイティブ制作 / DX・AI導入支援
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="company-cta-section">
        <div className="container">
          <div className="company-cta-content animate-on-scroll">
            <h2 className="company-cta-title">一緒に「わくわく」を創りませんか？</h2>
            <p className="company-cta-text">
              サービスに関するお問い合わせや、無料のご相談を承っております
            </p>
            <Link href="/contact" className="btn btn-primary btn-large">
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
