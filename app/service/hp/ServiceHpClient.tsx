'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import './ServiceHp.css'

export default function ServiceHpClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: '既存HPの改善も対応できますか？',
      a: 'はい、既存HPの分析・改善も承ります。現状サイトを診断し、SEO/AIOの観点から改善点をご提案します。'
    },
    {
      q: 'AIO（AI検索最適化）とは？',
      a: 'ChatGPT、Perplexity、Gemini等のAI検索で「引用される」ための最適化です。構造化データ、E-E-A-T対応、AIが理解しやすい文章構成を施します。'
    },
    {
      q: '記事を書く時間がありません',
      a: '問題ありません。スタンダードプラン以上では、SEO最適化記事を弊社で代行作成します。キーワード選定から公開まですべてお任せください。'
    },
    {
      q: '成果が出るまでどのくらい？',
      a: '一般的に3〜6ヶ月で効果が現れます。1〜3ヶ月が基盤構築期、4〜6ヶ月が成長期、7ヶ月以降が成果期です。'
    },
    {
      q: '解約時はどうなりますか？',
      a: '制作したサイトのデータ一式を納品いたします（別途30万円）。サイトは継続してご利用いただけます。'
    },
    {
      q: '助成金は活用できますか？',
      a: 'HP制作研修プランでは、人材開発支援助成金（最大75%助成）を活用いただける場合があります。詳細はお問い合わせください。'
    }
  ]

  return (
    <main className="service-hp-page">
      {/* ヒーローセクション */}
      <header className="hp-hero">
        <div className="hp-hero-background">
          <div className="hp-hero-gradient"></div>
        </div>
        <div className="hp-hero-content">
          <div className="hp-hero-label">
            <span className="hp-hero-label-dot"></span>
            HP制作サービス
          </div>
          <h1 className="hp-hero-title">
            <span className="hp-hero-title-accent">成果が出るまで</span>
            <br />
            伴走するHP制作
          </h1>
          <p className="hp-hero-text">
            SEO＋AIO対応で、3年後も検索されるサイトを。<br />
            月10本〜の記事作成と効果測定で、問い合わせ獲得まで支援します。
          </p>
          <div className="hp-hero-features">
            <span className="hp-hero-feature">SEO対策</span>
            <span className="hp-hero-feature">AIO対策</span>
            <span className="hp-hero-feature">記事代行</span>
            <span className="hp-hero-feature">効果測定</span>
          </div>
          <Link href="/contact" className="btn btn-primary btn-large hp-hero-cta">無料相談を申し込む</Link>
        </div>
      </header>

      {/* パンくずリスト */}
      <Breadcrumb items={[
        { label: 'SERVICE', path: '/service' },
        { label: 'HP制作サービス' }
      ]} />

      {/* 課題セクション */}
      <section className="hp-problems">
        <div className="container">
          <p className="hp-section-label">PROBLEMS</p>
          <h2 className="hp-section-title">こんなお悩み、ありませんか？</h2>
          <div className="problems-grid">
            <div className="problem-card">
              <div className="problem-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <p className="problem-card-text">HPはあるが<br />問い合わせが来ない</p>
            </div>
            <div className="problem-card">
              <div className="problem-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="problem-card-text">更新する時間がなく<br />放置状態に</p>
            </div>
            <div className="problem-card">
              <div className="problem-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="problem-card-text">SEO対策したが<br />効果が見えない</p>
            </div>
            <div className="problem-card">
              <div className="problem-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <p className="problem-card-text">AI時代に対応<br />できているか不安</p>
            </div>
          </div>
          <div className="problems-solution">
            <p>これらの課題、<strong>EMPLAYのHP制作で解決</strong>できます</p>
          </div>
        </div>
      </section>

      {/* なぜ今HP刷新が必要か */}
      <section className="hp-why-now">
        <div className="container">
          <p className="hp-section-label light">WHY NOW</p>
          <h2 className="hp-section-title light">なぜ今、HP刷新が必要なのか</h2>
          <div className="why-now-grid">
            <div className="why-now-card">
              <div className="why-now-number">40<span>%</span></div>
              <p className="why-now-text">中小企業の約40%が<br />HPからの集客に課題</p>
            </div>
            <div className="why-now-card">
              <div className="why-now-number">50<span>%+</span></div>
              <p className="why-now-text">検索の50%以上が<br />AI検索に移行と予測</p>
            </div>
            <div className="why-now-card accent">
              <div className="why-now-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <p className="why-now-text">SEOだけでは<br />不十分な時代に</p>
            </div>
          </div>
          <div className="why-now-message">
            <p><strong>SEO ＋ AIO</strong>対応が、これからのHP制作の必須条件</p>
          </div>
        </div>
      </section>

      {/* サービス概要 */}
      <section className="hp-service-overview">
        <div className="container">
          <p className="hp-section-label">SERVICE</p>
          <h2 className="hp-section-title">EMPLAYのHP制作サービス</h2>
          <p className="hp-section-subtitle">「作って終わり」ではなく「成果が出るまで伴走」</p>

          <div className="service-flow-visual">
            <div className="flow-step-card">
              <span className="flow-step-number">01</span>
              <h3>HP制作</h3>
              <p>SEO/AIO対応設計</p>
            </div>
            <div className="flow-connector">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="flow-step-card">
              <span className="flow-step-number">02</span>
              <h3>コンテンツ作成</h3>
              <p>月10〜20本の記事代行</p>
            </div>
            <div className="flow-connector">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="flow-step-card">
              <span className="flow-step-number">03</span>
              <h3>効果測定・改善</h3>
              <p>月次レポート提供</p>
            </div>
          </div>

          <div className="service-goal-box">
            <div className="service-goal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p><strong>目指すゴール：</strong>検索上位表示 → アクセス増加 → 問い合わせ獲得</p>
          </div>
        </div>
      </section>

      {/* 選ばれる3つの理由 */}
      <section className="hp-reasons-section">
        <div className="container">
          <p className="hp-section-label">FEATURES</p>
          <h2 className="hp-section-title">選ばれる3つの理由</h2>

          <div className="reason-cards-grid">
            <div className="reason-card">
              <div className="reason-card-header">
                <span className="reason-card-number">01</span>
                <h3 className="reason-card-title">SEO＋AIO対応</h3>
              </div>
              <div className="reason-card-body">
                <p className="reason-card-description">Google検索だけでなく、AI検索（ChatGPT、Perplexity等）にも対応。構造化データ、E-E-A-T対応で「3年後も検索される」サイトを設計します。</p>
                <div className="reason-card-comparison">
                  <div className="comparison-item">
                    <span className="comparison-label">従来</span>
                    <span className="comparison-value">SEO対策のみ</span>
                  </div>
                  <div className="comparison-item highlight">
                    <span className="comparison-label">EMPLAY</span>
                    <span className="comparison-value">SEO ＋ AIO対策</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-card-header">
                <span className="reason-card-number">02</span>
                <h3 className="reason-card-title">記事作成代行</h3>
              </div>
              <div className="reason-card-body">
                <p className="reason-card-description">HPは「作っただけ」では上位表示されません。月10〜20本のSEO最適化記事を代行作成。キーワード選定から公開まで全てお任せいただけます。</p>
                <div className="reason-card-stats">
                  <div className="stat-item">
                    <span className="stat-number">10〜20</span>
                    <span className="stat-label">本/月</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">3倍</span>
                    <span className="stat-label">検索流入（6ヶ月後）</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="reason-card">
              <div className="reason-card-header">
                <span className="reason-card-number">03</span>
                <h3 className="reason-card-title">長期パートナーシップ</h3>
              </div>
              <div className="reason-card-body">
                <p className="reason-card-description">SEO/AIOの効果は3〜6ヶ月で徐々に現れます。2年間かけて「資産となるHP」を一緒に育てます。月次レポートと定例MTGで効果を可視化。</p>
                <div className="reason-card-includes">
                  <span>月次レポート</span>
                  <span>定例MTG</span>
                  <span>改善提案</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section className="hp-pricing">
        <div className="container">
          <p className="hp-section-label">PRICING</p>
          <h2 className="hp-section-title">料金プラン</h2>
          <div className="pricing-grid-new">
            <div className="pricing-card-new">
              <div className="pricing-card-header-new">
                <h3 className="pricing-plan-name">ライトプラン</h3>
                <p className="pricing-plan-desc">HP管理のみ依頼したい方向け</p>
              </div>
              <div className="pricing-card-body-new">
                <div className="pricing-amounts">
                  <div className="pricing-amount-row">
                    <span className="pricing-amount-label">初期費用</span>
                    <span className="pricing-amount-value">¥200,000</span>
                  </div>
                  <div className="pricing-amount-row main">
                    <span className="pricing-amount-label">月額</span>
                    <span className="pricing-amount-value">¥10,000</span>
                  </div>
                </div>
                <ul className="pricing-features-new">
                  <li>保守管理</li>
                  <li>軽微な修正対応</li>
                  <li>セキュリティ更新</li>
                </ul>
              </div>
            </div>

            <div className="pricing-card-new recommended">
              <div className="pricing-recommend-badge">おすすめ</div>
              <div className="pricing-card-header-new">
                <h3 className="pricing-plan-name">スタンダードプラン</h3>
                <p className="pricing-plan-desc">集客を本気で伸ばしたい方向け</p>
              </div>
              <div className="pricing-card-body-new">
                <div className="pricing-amounts">
                  <div className="pricing-amount-row">
                    <span className="pricing-amount-label">初期費用</span>
                    <span className="pricing-amount-value">¥200,000</span>
                  </div>
                  <div className="pricing-amount-row main">
                    <span className="pricing-amount-label">月額</span>
                    <span className="pricing-amount-value">¥50,000〜</span>
                  </div>
                </div>
                <ul className="pricing-features-new">
                  <li>保守管理</li>
                  <li className="highlight">月10本の記事作成</li>
                  <li className="highlight">SEO/AIO対策</li>
                  <li className="highlight">月次レポート</li>
                  <li className="highlight">定例MTG（月1回）</li>
                </ul>
              </div>
            </div>

            <div className="pricing-card-new premium">
              <div className="pricing-premium-badge">本格運用</div>
              <div className="pricing-card-header-new">
                <h3 className="pricing-plan-name">プレミアムプラン</h3>
                <p className="pricing-plan-desc">最速で成果を出したい方向け</p>
              </div>
              <div className="pricing-card-body-new">
                <div className="pricing-amounts">
                  <div className="pricing-amount-row">
                    <span className="pricing-amount-label">初期費用</span>
                    <span className="pricing-amount-value">¥300,000</span>
                  </div>
                  <div className="pricing-amount-row main">
                    <span className="pricing-amount-label">月額</span>
                    <span className="pricing-amount-value">¥100,000〜</span>
                  </div>
                </div>
                <ul className="pricing-features-new">
                  <li>保守管理</li>
                  <li className="highlight">月20本の記事作成</li>
                  <li className="highlight">SEO/AIO対策</li>
                  <li className="highlight">週次レポート</li>
                  <li className="highlight">定例MTG（月2回）</li>
                  <li className="highlight">競合分析レポート</li>
                  <li className="highlight">優先サポート</li>
                </ul>
              </div>
            </div>

            <div className="pricing-card-new training">
              <div className="pricing-card-header-new">
                <h3 className="pricing-plan-name">HP制作研修</h3>
                <p className="pricing-plan-desc">自社でHP運用できる人材を育成</p>
              </div>
              <div className="pricing-card-body-new">
                <div className="pricing-amounts">
                  <div className="pricing-amount-row main">
                    <span className="pricing-amount-label">費用</span>
                    <span className="pricing-amount-value">¥300,000<small>/月</small></span>
                  </div>
                </div>
                <div className="pricing-subsidy-badge">
                  <span>最大75%助成金対応</span>
                </div>
                <ul className="pricing-features-new">
                  <li>HP制作スキル習得</li>
                  <li>SEO/AIO知識研修</li>
                  <li>コンテンツ作成研修</li>
                  <li>実践ワークショップ</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="pricing-note-new">※2年契約 / 解約時データ納品：30万円</p>
        </div>
      </section>

      {/* 導入の流れ */}
      <section className="hp-flow">
        <div className="container">
          <p className="hp-section-label">FLOW</p>
          <h2 className="hp-section-title">導入の流れ</h2>
          <div className="flow-timeline-new">
            <div className="flow-timeline-item">
              <div className="flow-timeline-marker">
                <span>STEP 1</span>
              </div>
              <div className="flow-timeline-content">
                <h3>ヒアリング・ご提案</h3>
                <span className="flow-timeline-period">1〜2週間</span>
                <p>現状の課題をヒアリング、競合分析・キーワード調査を行い、最適なプランをご提案します。</p>
              </div>
            </div>
            <div className="flow-timeline-item">
              <div className="flow-timeline-marker">
                <span>STEP 2</span>
              </div>
              <div className="flow-timeline-content">
                <h3>制作・準備</h3>
                <span className="flow-timeline-period">4〜8週間</span>
                <p>サイト設計・デザイン、SEO/AIO最適化構築、初期コンテンツ作成を行います。</p>
              </div>
            </div>
            <div className="flow-timeline-item">
              <div className="flow-timeline-marker">
                <span>STEP 3</span>
              </div>
              <div className="flow-timeline-content">
                <h3>公開・運用開始</h3>
                <p>サイト公開後、毎月のコンテンツ作成と月次レポート・定例MTGを開始します。</p>
              </div>
            </div>
          </div>

          <div className="flow-result-box">
            <h3>成果が出るまでのイメージ</h3>
            <div className="flow-result-phases">
              <div className="flow-result-phase">
                <span className="phase-label">1〜3ヶ月</span>
                <span className="phase-name">基盤構築期</span>
                <p>検索インデックス登録</p>
              </div>
              <div className="flow-result-phase">
                <span className="phase-label">4〜6ヶ月</span>
                <span className="phase-name">成長期</span>
                <p>検索順位上昇</p>
              </div>
              <div className="flow-result-phase active">
                <span className="phase-label">7ヶ月〜</span>
                <span className="phase-name">成果期</span>
                <p>問い合わせ増加</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="hp-faq">
        <div className="container">
          <p className="hp-section-label">FAQ</p>
          <h2 className="hp-section-title">よくあるご質問</h2>
          <div className="faq-list-new">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item-new ${openFaq === index ? 'open' : ''}`}>
                <button
                  className="faq-question-new"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="faq-question-text-new">{faq.q}</span>
                  <span className="faq-toggle-new">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {openFaq === index ? (
                        <path d="M5 12h14"/>
                      ) : (
                        <path d="M12 5v14M5 12h14"/>
                      )}
                    </svg>
                  </span>
                </button>
                <div className="faq-answer-new">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hp-cta">
        <div className="container">
          <div className="cta-content-new">
            <h2 className="cta-title-new">まずは無料相談から</h2>
            <p className="cta-text-new">
              HPリニューアル、SEO/AIO対策、他社比較、助成金活用など<br className="pc-only" />
              お気軽にご相談ください。
            </p>
            <Link href="/contact" className="btn btn-primary btn-large cta-button-new">無料相談を申し込む</Link>
          </div>
        </div>
      </section>

      {/* コンタクトセクション */}
      <section className="contact-section-page">
        <div className="container">
          <Link href="/contact" className="contact-box">
            <div className="contact-box-content">
              <h2 className="contact-box-title">CONTACT</h2>
              <p className="contact-box-text">お問い合わせはこちらから</p>
            </div>
            <span className="contact-box-arrow">&gt;</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
