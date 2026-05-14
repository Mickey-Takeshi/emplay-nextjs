'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import './ServiceTraining.css'

export default function ServiceTrainingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: '実際に成果は出ますか？',
      a: '研修＋事業支援一体型なので、学んだ内容を即実務に活かせます。AI/DX研修では業務時間20〜40%削減、採用研修では採用単価30〜50%削減などの成果が期待できます。'
    },
    {
      q: '5名未満でも利用できますか？',
      a: '要相談となります。少人数の場合は別プランや他社サービスとの組み合わせなど、最適な方法をご提案します。'
    },
    {
      q: '研修はオンラインでも可能ですか？',
      a: 'はい、対面・オンラインどちらも対応しています。全国どこからでもご参加いただけます。'
    },
    {
      q: '研修開始までどのくらいかかりますか？',
      a: 'ヒアリング・プログラム設計に約2〜3週間いただいています。お急ぎの場合はご相談ください。'
    },
    {
      q: 'カリキュラムのカスタマイズは可能ですか？',
      a: 'はい、御社の業種・課題に合わせてプログラム内容をカスタマイズいたします。ヒアリング時に詳しくお伺いします。'
    },
    {
      q: 'EMPLAY AI ACADEMYとの違いは何ですか？',
      a: 'EMPLAY AI ACADEMYはAI活用・Web制作・業務自動化に特化したオンライン完結型のプログラムです。本研修サービスは採用マーケティングやSNS攻略を含む幅広いテーマに対面でも対応できます。'
    }
  ]

  return (
    <main className="training-page">
      {/* ヒーローセクション */}
      <header className="training-hero">
        <div className="training-hero-background">
          <div className="training-hero-gradient"></div>
        </div>
        <div className="training-hero-content">
          <div className="training-hero-label">
            <span className="training-hero-label-dot"></span>
            研修サービス
          </div>
          <h1 className="training-hero-title">
            <span className="training-hero-title-accent">企業向け</span>
            <br />
            研修サービス
          </h1>
          <p className="training-hero-subtitle">研修だけで終わらせない。売上向上まで伴走します。</p>
          <div className="training-hero-badges">
            <span className="training-hero-badge">研修×事業支援一体型</span>
            <span className="training-hero-badge">成果にコミット</span>
            <span className="training-hero-badge">対面・オンライン対応</span>
          </div>
          <Link href="/contact" className="btn btn-primary btn-large training-hero-cta">無料相談を申し込む</Link>
        </div>
      </header>

      {/* パンくずリスト */}
      <Breadcrumb items={[
        { label: 'SERVICE', path: '/service' },
        { label: '研修サービス' }
      ]} />

      {/* 課題セクション */}
      <section className="training-problems">
        <div className="container">
          <p className="training-section-label">PROBLEMS</p>
          <h2 className="training-section-title">こんなお悩み、ありませんか？</h2>
          <div className="training-problems-grid">
            <div className="training-problem-card">
              <div className="training-problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="training-problem-content">
                <h3 className="training-problem-title">業務効率の課題</h3>
                <p className="training-problem-text">AIを活用したいが社内に詳しい人材がいない</p>
              </div>
            </div>
            <div className="training-problem-card">
              <div className="training-problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div className="training-problem-content">
                <h3 className="training-problem-title">採用の課題</h3>
                <p className="training-problem-text">求人を出しても応募が来ない、採用コストが高騰</p>
              </div>
            </div>
            <div className="training-problem-card">
              <div className="training-problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <div className="training-problem-content">
                <h3 className="training-problem-title">集客の課題</h3>
                <p className="training-problem-text">Web広告を活用したいが運用方法がわからない</p>
              </div>
            </div>
            <div className="training-problem-card">
              <div className="training-problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                </svg>
              </div>
              <div className="training-problem-content">
                <h3 className="training-problem-title">SNS活用の課題</h3>
                <p className="training-problem-text">SNSで情報発信したいが何から始めればいいかわからない</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* なぜ今研修投資が必要か */}
      <section className="training-why-now">
        <div className="container">
          <p className="training-section-label light">WHY NOW</p>
          <h2 className="training-section-title light">なぜ今、研修投資が必要なのか</h2>
          <div className="training-why-now-grid">
            <div className="training-why-now-card">
              <div className="training-why-now-stat">79<span>万人</span></div>
              <p className="training-why-now-text">2030年に不足すると<br />予測されるIT人材</p>
            </div>
            <div className="training-why-now-card">
              <div className="training-why-now-stat">20<span>%未満</span></div>
              <p className="training-why-now-text">生成AIを導入<br />している企業の割合</p>
            </div>
            <div className="training-why-now-card">
              <div className="training-why-now-stat">3<span>倍</span></div>
              <p className="training-why-now-text">AI活用企業の<br />生産性向上効果</p>
            </div>
          </div>
          <div className="training-why-now-conclusion">
            <p><strong>社内人材の育成</strong>が、DX推進と競争力強化の最短ルートです。</p>
          </div>
        </div>
      </section>

      {/* サービス概要 */}
      <section className="training-service-overview">
        <div className="container">
          <p className="training-section-label">SERVICE</p>
          <h2 className="training-section-title">EMPLAYの研修サービスとは</h2>
          <p className="training-section-subtitle">「研修だけ」で終わらせない。事業成果まで伴走。</p>

          <div className="training-features-grid">
            <div className="training-feature-card">
              <div className="training-feature-header">
                <span className="training-feature-number">01</span>
                <h3 className="training-feature-title">研修＋実務支援</h3>
              </div>
              <p className="training-feature-text">座学だけで終わらない。研修中から実際の業務課題に取り組み、即実務に活かせるスキルを習得します。</p>
            </div>
            <div className="training-feature-card">
              <div className="training-feature-header">
                <span className="training-feature-number">02</span>
                <h3 className="training-feature-title">成果にコミット</h3>
              </div>
              <p className="training-feature-text">業務時間削減、採用単価削減、ROAS改善など、具体的な成果指標にコミット。効果測定まで実施します。</p>
            </div>
            <div className="training-feature-card">
              <div className="training-feature-header">
                <span className="training-feature-number">03</span>
                <h3 className="training-feature-title">カスタマイズ対応</h3>
              </div>
              <p className="training-feature-text">御社の業種・課題に合わせてプログラムをカスタマイズ。対面・オンラインどちらにも対応します。</p>
            </div>
          </div>

          <div className="training-flow-visual">
            <div className="training-flow-step">
              <span className="training-flow-number">01</span>
              <h4>研修</h4>
            </div>
            <div className="training-flow-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="training-flow-step">
              <span className="training-flow-number">02</span>
              <h4>実務適用</h4>
            </div>
            <div className="training-flow-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="training-flow-step">
              <span className="training-flow-number">03</span>
              <h4>事業支援</h4>
            </div>
            <div className="training-flow-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
            <div className="training-flow-step highlight">
              <span className="training-flow-number">04</span>
              <h4>成果創出</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 研修プログラム一覧 */}
      <section className="training-programs">
        <div className="container">
          <p className="training-section-label">PROGRAMS</p>
          <h2 className="training-section-title">研修プログラム一覧</h2>
          <p className="training-section-subtitle">全プログラム共通：月8時間×3ヶ月、対面orオンライン対応</p>

          <div className="training-programs-grid">
            <div className="training-program-card">
              <div className="training-program-header">
                <div className="training-program-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="training-program-title">AI/DX活用研修</h3>
                <p className="training-program-target">業務効率化・生産性向上</p>
              </div>
              <div className="training-program-body">
                <p className="training-program-challenge">対象課題：AIを業務に活かしたいが何から始めればいいかわからない</p>
                <div className="training-program-curriculum">
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">1ヶ月目</span>
                    <p className="training-curriculum-content">生成AIの基礎、プロンプト設計 ＋ 業務フロー分析</p>
                  </div>
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">2ヶ月目</span>
                    <p className="training-curriculum-content">ChatGPT/Claude活用、自動化ツール ＋ AIツール導入支援</p>
                  </div>
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">3ヶ月目</span>
                    <p className="training-curriculum-content">業務別AI活用、セキュリティ ＋ 運用ガイドライン策定</p>
                  </div>
                </div>
                <div className="training-program-results">
                  <span className="training-results-label">期待成果</span>
                  <p>業務時間20〜40%削減、AIリテラシー向上、社内浸透</p>
                </div>
              </div>
            </div>

            <div className="training-program-card">
              <div className="training-program-header">
                <div className="training-program-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <h3 className="training-program-title">採用マーケティング研修</h3>
                <p className="training-program-target">採用難・コスト削減</p>
              </div>
              <div className="training-program-body">
                <p className="training-program-challenge">対象課題：求人を出しても応募が来ない、採用コストが高い</p>
                <div className="training-program-curriculum">
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">1ヶ月目</span>
                    <p className="training-curriculum-content">採用市場分析、ペルソナ設計 ＋ 採用戦略策定</p>
                  </div>
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">2ヶ月目</span>
                    <p className="training-curriculum-content">求人原稿作成、SNS採用 ＋ 求人媒体最適化</p>
                  </div>
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">3ヶ月目</span>
                    <p className="training-curriculum-content">面接設計、定着施策 ＋ 採用プロセス改善</p>
                  </div>
                </div>
                <div className="training-program-results">
                  <span className="training-results-label">期待成果</span>
                  <p>採用単価30〜50%削減、応募数増加、ミスマッチ減少</p>
                </div>
              </div>
            </div>

            <div className="training-program-card">
              <div className="training-program-header">
                <div className="training-program-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 className="training-program-title">Webマーケティング研修</h3>
                <p className="training-program-target">集客・売上向上</p>
              </div>
              <div className="training-program-body">
                <p className="training-program-challenge">対象課題：Web広告を出したいが運用方法がわからない</p>
                <div className="training-program-curriculum">
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">1ヶ月目</span>
                    <p className="training-curriculum-content">Web広告の基礎、媒体選定 ＋ 広告アカウント構築</p>
                  </div>
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">2ヶ月目</span>
                    <p className="training-curriculum-content">クリエイティブ作成、LP改善 ＋ 広告運用代行</p>
                  </div>
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">3ヶ月目</span>
                    <p className="training-curriculum-content">分析・改善、ROAS最適化 ＋ 運用引き継ぎ</p>
                  </div>
                </div>
                <div className="training-program-results">
                  <span className="training-results-label">期待成果</span>
                  <p>広告運用内製化、ROAS改善、代理店依存脱却</p>
                </div>
              </div>
            </div>

            <div className="training-program-card">
              <div className="training-program-header">
                <div className="training-program-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                  </svg>
                </div>
                <h3 className="training-program-title">SNS攻略研修</h3>
                <p className="training-program-target">集客・ブランディング</p>
              </div>
              <div className="training-program-body">
                <p className="training-program-challenge">対象課題：SNSで集客したいが何を投稿すればいいかわからない</p>
                <div className="training-program-curriculum">
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">1ヶ月目</span>
                    <p className="training-curriculum-content">SNS戦略設計、ターゲット分析 ＋ アカウント設計・構築</p>
                  </div>
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">2ヶ月目</span>
                    <p className="training-curriculum-content">投稿作成、撮影・編集 ＋ 投稿テンプレート作成</p>
                  </div>
                  <div className="training-curriculum-month">
                    <span className="training-curriculum-label">3ヶ月目</span>
                    <p className="training-curriculum-content">分析・改善、広告活用 ＋ 運用マニュアル完成</p>
                  </div>
                </div>
                <div className="training-program-results">
                  <span className="training-results-label">期待成果</span>
                  <p>SNS運用人材育成、エンゲージメント向上、問い合わせ増</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMPLAY AI ACADEMY 誘導 */}
      <section className="training-academy-banner">
        <div className="container">
          <div className="training-academy-content">
            <div className="training-academy-text">
              <span className="training-academy-badge">NEW</span>
              <h2 className="training-academy-title">EMPLAY AI ACADEMY</h2>
              <p className="training-academy-desc">
                AI活用・Web制作・業務自動化に特化した、オンライン完結型の実践研修プログラム。全10プログラムから自社の課題に合わせて選べます。
              </p>
              <a href="https://academy.emplay.jp/" className="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">EMPLAY AI ACADEMYを見る →</a>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section className="training-pricing">
        <div className="container">
          <p className="training-section-label">PRICING</p>
          <h2 className="training-section-title">料金プラン</h2>

          <div className="training-pricing-comparison">
            <div className="training-pricing-after">
              <span className="training-pricing-value highlight">要お問い合わせ</span>
              <span className="training-pricing-condition">研修内容・受講人数・期間に応じてお見積もりいたします</span>
            </div>
          </div>

          <div className="training-pricing-includes">
            <h3 className="training-pricing-includes-title">料金に含まれるもの</h3>
            <div className="training-pricing-includes-grid">
              <span>研修プログラム（月8時間×3ヶ月）</span>
              <span>実務適用サポート</span>
              <span>事業支援・伴走</span>
              <span>効果測定・レポート</span>
              <span>カリキュラムカスタマイズ</span>
              <span>対面・オンライン対応</span>
            </div>
          </div>
        </div>
      </section>

      {/* 競合比較 */}
      <section className="training-comparison">
        <div className="container">
          <p className="training-section-label">COMPARISON</p>
          <h2 className="training-section-title">競合サービスとの比較</h2>

          <div className="training-comparison-table">
            <div className="training-comparison-header">
              <div className="training-comparison-cell"></div>
              <div className="training-comparison-cell">競合A（研修会社）</div>
              <div className="training-comparison-cell">競合B（コンサル）</div>
              <div className="training-comparison-cell highlight">EMPLAY</div>
            </div>
            <div className="training-comparison-row">
              <div className="training-comparison-cell label">料金</div>
              <div className="training-comparison-cell">15〜30万円/人・月</div>
              <div className="training-comparison-cell">20〜50万円/人・月</div>
              <div className="training-comparison-cell highlight">10万円/人・月</div>
            </div>
            <div className="training-comparison-row">
              <div className="training-comparison-cell label">事業支援</div>
              <div className="training-comparison-cell">なし</div>
              <div className="training-comparison-cell">別料金</div>
              <div className="training-comparison-cell highlight">込み</div>
            </div>
            <div className="training-comparison-row">
              <div className="training-comparison-cell label">カスタマイズ</div>
              <div className="training-comparison-cell">テンプレート型</div>
              <div className="training-comparison-cell">一部対応</div>
              <div className="training-comparison-cell highlight">フルカスタマイズ</div>
            </div>
            <div className="training-comparison-row">
              <div className="training-comparison-cell label">成果コミット</div>
              <div className="training-comparison-cell">なし</div>
              <div className="training-comparison-cell">一部あり</div>
              <div className="training-comparison-cell highlight">あり</div>
            </div>
          </div>
        </div>
      </section>

      {/* 導入の流れ */}
      <section className="training-flow">
        <div className="container">
          <p className="training-section-label">FLOW</p>
          <h2 className="training-section-title">導入の流れ</h2>

          <div className="training-flow-timeline">
            <div className="training-flow-item">
              <div className="training-flow-marker">
                <span>STEP 1</span>
              </div>
              <div className="training-flow-content">
                <h3>無料相談・ヒアリング</h3>
                <span className="training-flow-period">1週間</span>
                <p>現状の課題や目標をヒアリングし、最適なプログラムをご提案します。</p>
              </div>
            </div>
            <div className="training-flow-item">
              <div className="training-flow-marker">
                <span>STEP 2</span>
              </div>
              <div className="training-flow-content">
                <h3>研修プログラム設計</h3>
                <span className="training-flow-period">1〜2週間</span>
                <p>御社の業務に合わせたカリキュラムと演習課題を設計します。</p>
              </div>
            </div>
            <div className="training-flow-item">
              <div className="training-flow-marker">
                <span>STEP 3</span>
              </div>
              <div className="training-flow-content">
                <h3>研修実施＋事業支援</h3>
                <span className="training-flow-period">3ヶ月〜</span>
                <p>月8時間の研修と並行して、実務への適用と事業支援を行います。</p>
              </div>
            </div>
            <div className="training-flow-item">
              <div className="training-flow-marker">
                <span>STEP 4</span>
              </div>
              <div className="training-flow-content">
                <h3>効果測定・報告</h3>
                <p>研修終了後、成果をレポートにまとめ、今後の改善提案を行います。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="training-faq">
        <div className="container">
          <p className="training-section-label">FAQ</p>
          <h2 className="training-section-title">よくあるご質問</h2>
          <div className="training-faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`training-faq-item ${openFaq === index ? 'open' : ''}`}>
                <button
                  className="training-faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="training-faq-question-text">{faq.q}</span>
                  <span className="training-faq-toggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {openFaq === index ? (
                        <path d="M5 12h14"/>
                      ) : (
                        <path d="M12 5v14M5 12h14"/>
                      )}
                    </svg>
                  </span>
                </button>
                <div className="training-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="training-cta">
        <div className="container">
          <div className="training-cta-content">
            <h2 className="training-cta-title">まずは無料相談から</h2>
            <p className="training-cta-text">
              「どの研修が合うか分からない」「まずは話を聞いてみたい」など、<br className="pc-only" />
              お気軽にご相談ください。御社に最適なプランをご提案します。
            </p>
            <Link href="/contact" className="btn btn-primary btn-large training-cta-button">無料相談を申し込む</Link>
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
