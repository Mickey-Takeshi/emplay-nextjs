'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NewsArticleSummary, BlogPostSummary } from '@/lib/supabase'
import FaqJsonLd from '@/components/FaqJsonLd'

interface HomeClientProps {
  news: NewsArticleSummary[]
  latestPosts: BlogPostSummary[]
}

const homeFaqs = [
  {
    q: '相談だけでも大丈夫ですか？',
    a: 'はい、もちろんです。現状の課題整理からで構いません。無料相談で御社に最適な施策をご提案します。',
  },
  {
    q: 'どのようなサービスを依頼できますか？',
    a: 'HP制作、Web広告運用、クリエイティブ制作、CRM導入支援、生成AI研修（EMPLAY AI ACADEMY）まで、Webとテクノロジー活用をワンストップでご依頼いただけます。',
  },
  {
    q: '地方の会社でも対応してもらえますか？',
    a: 'はい。オンラインでのお打ち合わせが可能ですので、全国からご相談いただけます。',
  },
  {
    q: '小規模な会社でも依頼できますか？',
    a: 'はい。中小企業の支援を得意としています。ご予算に応じて、優先度の高い施策からご提案します。',
  },
]

function formatDate(dateString: string) {
  return new Date(dateString)
    .toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' })
    .replace(/\//g, '.')
}

export default function HomeClient({ news, latestPosts }: HomeClientProps) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <FaqJsonLd faqs={homeFaqs} />
      {/* ヒーローセクション */}
      <section className="hero" aria-label="メインビジュアル" style={{ marginTop: '-72px' }}>
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-grid-pattern"></div>
        </div>
        <div className="hero-content">
          <p className="hero-label">
            中小企業のWeb・AI活用パートナー
          </p>
          <h1 className="hero-title">
            Web制作・集客・AI活用を、<br />実行と改善まで。
          </h1>
          <p className="hero-description">
            ホームページ制作、広告運用、CRM導入、AI研修。<br className="pc-only" />
            課題の整理から制作・導入、継続運用まで一貫して支援します。
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-cta btn-large">
              無料相談を申し込む
            </Link>
            <Link href="/service" className="btn btn-outline-white btn-large">
              支援内容を見る
            </Link>
          </div>
          <ul className="hero-services" aria-label="支援範囲">
            <li>課題整理</li>
            <li>制作・導入</li>
            <li>運用・改善</li>
          </ul>
        </div>
      </section>

      {/* サービスセクション */}
      <section className="section service-section" aria-labelledby="service-heading">
        <div className="container">
          <div className="section-header-center animate-on-scroll">
            <p className="section-label">SERVICE</p>
            <h2 id="service-heading" className="section-heading">
              ビジネスの課題を<br className="sp-only" />解決するサービス
            </h2>
            <p className="section-desc">
              Web集客から社内DXまで、必要なサービスを選んでご利用いただけます。
            </p>
          </div>

          <div className="service-cards">
            {/* HP制作 - フィーチャーカード */}
            <div className="service-card service-card-featured animate-on-scroll">
              <div className="service-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="service-card-title">HP制作サービス</h3>
              <p className="service-card-text">
                SEO + AIO対応で「3年後も検索されるHP」を制作。継続的な記事作成代行と効果測定で、問い合わせ獲得まで伴走します。
              </p>
              <Link href="/service/hp" className="service-card-link">
                詳しく見る
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* クリエイティブ制作 */}
            <div className="service-card animate-on-scroll">
              <div className="service-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <h3 className="service-card-title">クリエイティブ制作</h3>
              <p className="service-card-text">
                Webサイト、LP、バナー、動画など、成果につながるクリエイティブを制作します。
              </p>
              <Link href="/service/creative" className="service-card-link">
                詳しく見る
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Web広告運用 */}
            <div className="service-card animate-on-scroll">
              <div className="service-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
                </svg>
              </div>
              <h3 className="service-card-title">Web広告運用代行</h3>
              <p className="service-card-text">
                Google・Yahoo!・SNS広告の運用を代行。データ分析に基づく改善で費用対効果を最大化します。
              </p>
              <Link href="/service/ads" className="service-card-link">
                詳しく見る
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* CRM導入支援 */}
            <div className="service-card animate-on-scroll">
              <div className="service-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="service-card-title">CRM導入支援</h3>
              <p className="service-card-text">
                顧客情報の一元管理からメルマガ・LINE配信まで、顧客との関係構築をサポートします。
              </p>
              <Link href="/service/crm" className="service-card-link">
                詳しく見る
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* EMPLAY AI ACADEMY */}
            <div className="service-card animate-on-scroll">
              <div className="service-card-icon service-card-icon-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="service-card-title">EMPLAY AI ACADEMY</h3>
              <p className="service-card-text">
                全10プログラム、オンライン完結。生成AIで「自走できる」DX中核人材を育てる実践研修。
              </p>
              <a href="https://academy.emplay.jp/" className="service-card-link" target="_blank" rel="noopener noreferrer" aria-label="EMPLAY AI ACADEMYの詳細を見る（新しいタブで開く）">
                詳しく見る
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <div className="service-more animate-on-scroll">
            <Link href="/service" className="btn btn-outline">
              サービス一覧を見る
            </Link>
          </div>
        </div>
      </section>

      {/* 強みセクション */}
      <section className="section strengths-section" aria-labelledby="strengths-heading">
        <div className="container">
          <div className="section-header-center animate-on-scroll">
            <p className="section-label">STRENGTHS</p>
            <h2 id="strengths-heading" className="section-heading">EMPLAYの3つの強み</h2>
          </div>
          <div className="strengths-grid">
            <div className="strength-card animate-on-scroll">
              <div className="strength-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </div>
              <h3 className="strength-title">ワンストップ対応</h3>
              <p className="strength-text">
                戦略設計からHP制作、広告運用、CRM導入、AI研修まで一気通貫。
                複数の会社に依頼する手間と調整コストをなくします。
              </p>
            </div>
            <div className="strength-card animate-on-scroll">
              <div className="strength-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="strength-title">中小企業に伴走</h3>
              <p className="strength-text">
                「作って終わり」「導入して終わり」にしません。
                成果が出るまで効果測定と改善を繰り返す伴走型の支援です。
              </p>
            </div>
            <div className="strength-card animate-on-scroll">
              <div className="strength-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <path d="M9 21h6" />
                </svg>
              </div>
              <h3 className="strength-title">AI活用の実践知</h3>
              <p className="strength-text">
                生成AIを自社業務で使い倒す実践知を、支援と研修（EMPLAY AI
                ACADEMY）の両方に還元。最新技術を現場で使える形で届けます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAバナー */}
      <section className="cta-banner" aria-label="お問い合わせへの導線">
        <div className="cta-banner-content animate-on-scroll">
          <p className="cta-banner-label">CONTACT</p>
          <h2 className="cta-banner-title">まずはお気軽にご相談ください</h2>
          <p className="cta-banner-text">
            「何から始めればいいか分からない」という段階でも大丈夫です。<br className="pc-only" />
            御社の現状と課題をお伺いした上で、最適なソリューションをご提案します。
          </p>
          <div className="cta-banner-actions">
            <Link href="/contact" className="btn btn-primary btn-large cta-banner-btn">
              無料相談を申し込む
            </Link>
          </div>
        </div>
      </section>

      {/* 最新の知見（ブログ）セクション */}
      {latestPosts.length > 0 && (
        <section className="section insights-section" aria-labelledby="insights-heading">
          <div className="container">
            <div className="section-header-row">
              <div>
                <p className="section-label">INSIGHTS</p>
                <h2 id="insights-heading" className="section-heading">最新の知見</h2>
              </div>
              <Link href="/blog" className="view-more" aria-label="ブログ一覧を見る">VIEW MORE →</Link>
            </div>
            <p className="insights-lead">
              Webマーケティング・AI活用の実践知を、現場のコンサルタントが発信しています。
            </p>
            <div className="insights-grid">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="insight-card animate-on-scroll">
                  <figure className="insight-thumbnail">
                    <img src={post.thumbnail} alt="" width="800" height="450" loading="lazy" />
                  </figure>
                  <div className="insight-content">
                    <div className="insight-meta">
                      <span className="insight-category">{post.category}</span>
                      <time className="insight-date" dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                      </time>
                    </div>
                    <h3 className="insight-title">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQセクション */}
      <section className="section home-faq-section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header-center animate-on-scroll">
            <p className="section-label">FAQ</p>
            <h2 id="faq-heading" className="section-heading">よくあるご質問</h2>
          </div>
          <div className="home-faq-list">
            {homeFaqs.map((faq, index) => (
              <div key={index} className="home-faq-item animate-on-scroll">
                <h3 className="home-faq-question">{faq.q}</h3>
                <p className="home-faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ニュースセクション */}
      <section className="section news-section" aria-labelledby="news-heading">
        <div className="container">
          <div className="section-header-row">
            <div>
              <p className="section-label">NEWS</p>
              <h2 id="news-heading" className="section-heading">お知らせ</h2>
            </div>
            <Link href="/news" className="view-more" aria-label="お知らせ一覧を見る">VIEW MORE →</Link>
          </div>
          <ul className="news-list-home">
            {news.length > 0 ? (
              news.map((article) => (
                <li key={article.id}>
                  <Link href={`/news/${article.slug}`} className="news-item-home">
                    <time className="news-date" dateTime={article.published_at}>{new Date(article.published_at).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })}</time>
                    <span className="news-title-home">{article.title}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="no-news">ニュースはありません</li>
            )}
          </ul>
        </div>
      </section>

      {/* フローティングCTA */}
      <FloatingCTA />
    </>
  )
}

function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`floating-cta ${visible ? 'floating-cta-visible' : ''}`}>
      <Link href="/contact" className="floating-cta-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span>無料相談</span>
      </Link>
    </div>
  )
}
