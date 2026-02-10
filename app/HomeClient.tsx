'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NewsArticle } from '@/lib/supabase'

interface HomeClientProps {
  news: NewsArticle[]
}

export default function HomeClient({ news }: HomeClientProps) {
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    // ヒーローアニメーション開始
    const timer = setTimeout(() => setHeroLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // スクロールアニメーション用のIntersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll('.animate-on-scroll')
    animateElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // パララックス効果
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroBackground = document.querySelector('.hero-background') as HTMLElement
      const missionBackground = document.querySelector('.mission-background') as HTMLElement

      if (heroBackground) {
        const heroMove = Math.min(scrollY * 0.3, window.innerHeight * 0.3)
        heroBackground.style.transform = `translateY(${heroMove}px)`
      }

      if (missionBackground) {
        const missionSection = document.querySelector('.mission-section') as HTMLElement
        if (missionSection) {
          const rect = missionSection.getBoundingClientRect()
          const offsetY = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.2
          const clampedOffset = Math.max(-100, Math.min(100, offsetY))
          missionBackground.style.transform = `translateY(${clampedOffset}px)`
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ヒーローセクション */}
      <section className="hero" aria-label="メインビジュアル">
        <div className="hero-background" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt=""
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className={`hero-content ${heroLoaded ? 'hero-loaded' : ''}`}>
          <h1 className="hero-title hero-animate hero-animate-1">
            EMPLAY<br />EVERYTHING
          </h1>
          <p className="hero-mission hero-animate hero-animate-2">OUR MISSION</p>
          <p className="hero-tagline hero-animate hero-animate-3">社会にもっとわくわくを創り続ける</p>
          <p className="hero-description hero-animate hero-animate-4">
            わくわくの源泉は選択を超える可能性だ。<br />
            期待を果たし続けて、洗練された解決策を追いかけ続ける。
          </p>
          <div className="hero-actions hero-animate hero-animate-5">
            <Link href="/company" className="btn btn-primary" aria-label="会社概要ページへ">
              わたしたちについて
            </Link>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">SCROLL</div>
      </section>

      {/* ミッションセクション */}
      <section className="mission-section" aria-label="ミッション">
        <div className="mission-background" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
            alt=""
            className="mission-bg-image"
          />
          <div className="mission-overlay"></div>
        </div>
        <div className="mission-content animate-on-scroll">
          <h2 className="mission-title">想定外を企てる</h2>
          <p className="mission-text">
            理想の先にとどまらず、組み合わせて、積み合わせる。<br />
            新たな可能性を追い求め、繰り返し続ける。
          </p>
          <p className="mission-text">
            変化の激しい社会に勝利の正解は無い。<br />
            常に変化して、想定外を武てることが、未来の一手を生き継ぎする。
          </p>
        </div>
      </section>

      {/* サービスセクション */}
      <section className="section service-section" aria-labelledby="service-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="service-heading" className="section-title-large">SERVICE</h2>
            <Link href="/service" className="view-more" aria-label="サービス一覧を見る">VIEW MORE →</Link>
          </header>

          <div className="service-items">
            <article className="service-item animate-on-scroll">
              <figure className="service-item-image">
                <img
                  src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80"
                  alt="Webサイト制作・デザインのイメージ"
                />
              </figure>
              <div className="service-item-content">
                <h3 className="service-item-title">クリエイティブ制作</h3>
                <p className="service-item-text">
                  Webサイト、LP、バナー、動画など、<br />
                  成果につながるクリエイティブを制作します。
                </p>
                <Link href="/service#creative" className="btn btn-dark" aria-label="クリエイティブ制作の詳細を見る">詳しく見る →</Link>
              </div>
            </article>

            <article className="service-item service-item-reverse animate-on-scroll">
              <div className="service-item-content">
                <h3 className="service-item-title">Web広告運用代行</h3>
                <p className="service-item-text">
                  Google・Yahoo!・SNS広告の運用を代行。<br />
                  データ分析に基づく改善で費用対効果を最大化します。
                </p>
                <Link href="/service#ads" className="btn btn-dark" aria-label="Web広告運用代行の詳細を見る">詳しく見る →</Link>
              </div>
              <figure className="service-item-image">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
                  alt="Web広告の分析・運用のイメージ"
                />
              </figure>
            </article>

            <article className="service-item animate-on-scroll">
              <figure className="service-item-image">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80"
                  alt="CRMツール導入・顧客管理のイメージ"
                />
              </figure>
              <div className="service-item-content">
                <h3 className="service-item-title">CRM導入支援</h3>
                <p className="service-item-text">
                  LINE公式アカウントやメール配信ツールの導入から<br />
                  運用まで、顧客との関係構築をサポートします。
                </p>
                <Link href="/service#crm" className="btn btn-dark" aria-label="CRM導入支援の詳細を見る">詳しく見る →</Link>
              </div>
            </article>

            <article className="service-item service-item-reverse animate-on-scroll">
              <div className="service-item-content">
                <h3 className="service-item-title">AI/DX研修</h3>
                <p className="service-item-text">
                  ChatGPTや生成AIの活用方法、業務効率化ツールの<br />
                  使い方を実践形式で学べる研修を提供します。
                </p>
                <Link href="/service#training" className="btn btn-dark" aria-label="AI/DX研修の詳細を見る">詳しく見る →</Link>
              </div>
              <figure className="service-item-image">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
                  alt="AI・DX研修・セミナーのイメージ"
                />
              </figure>
            </article>
          </div>
        </div>
      </section>

      {/* CTAバナー */}
      <section className="cta-banner" aria-label="お問い合わせへの導線">
        <div className="cta-banner-content animate-on-scroll">
          <h2 className="cta-banner-title">テクノロジーを活用して事業を推進していきます</h2>
          <p className="cta-banner-text">サービスに関するお問い合わせや、無料のご相談もこちらから承っております</p>
          <Link href="/contact" className="btn btn-outline-white" aria-label="お問い合わせページへ">お問い合わせはこちら →</Link>
        </div>
      </section>

      {/* ニュースセクション */}
      <section className="section news-section" aria-labelledby="news-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="news-heading" className="section-title-large">NEWS</h2>
            <Link href="/news" className="view-more" aria-label="お知らせ一覧を見る">VIEW MORE →</Link>
          </header>
          <div className="news-list-home" role="list">
            {news.length > 0 ? (
              news.map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="news-item-home" role="listitem">
                  <time className="news-date" dateTime={article.published_at}>{new Date(article.published_at).toLocaleDateString('ja-JP')}</time>
                  <span className="news-title-home">{article.title}</span>
                </Link>
              ))
            ) : (
              <p className="no-news">ニュースはありません</p>
            )}
          </div>
        </div>
      </section>

      {/* コンタクトセクション */}
      <section className="contact-section-home" aria-label="お問い合わせ">
        <div className="container">
          <Link href="/contact" className="contact-box animate-on-scroll" aria-label="お問い合わせページへ移動">
            <div className="contact-box-content">
              <h2 className="contact-box-title">CONTACT</h2>
              <p className="contact-box-text">お問い合わせはこちらから</p>
            </div>
            <span className="contact-box-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
