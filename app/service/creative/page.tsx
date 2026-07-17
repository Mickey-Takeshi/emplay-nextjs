import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import FaqJsonLd from '@/components/FaqJsonLd'
import ServiceJsonLd from '@/components/ServiceJsonLd'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import '../ServiceDetail.css'

export const metadata: Metadata = {
  title: 'クリエイティブ制作｜LP・バナー・動画制作',
  description: 'ホームページ、LP、バナー、動画制作。成果につながるWebクリエイティブをワンストップで提供。お見積り・ご相談は無料です。',
  alternates: { canonical: '/service/creative' },
  openGraph: {
    title: 'クリエイティブ制作 | 株式会社EMPLAY',
    description: 'ホームページ、LP、バナー、動画制作。成果につながるWebクリエイティブをワンストップで提供。お見積り・ご相談は無料です。',
    url: '/service/creative',
  },
}


// FAQ構造化データ用(表示中のFAQと一致させること)
const faqs = [
  {
    q: '制作期間はどれくらいですか？',
    a: 'ホームページで1.5〜2ヶ月、LPで2〜4週間が目安です。スケジュールはご要望に応じて調整可能ですので、お急ぎの場合もご相談ください。',
  },
  {
    q: '原稿や写真は用意する必要がありますか？',
    a: '原稿の作成代行、写真撮影、素材手配も承ります。「何を用意すればいいか分からない」という場合も、ヒアリングを通じてサポートしますのでご安心ください。',
  },
  {
    q: '公開後の修正や更新は対応してもらえますか？',
    a: 'はい、対応しています。軽微な修正から、コンテンツの追加、運用保守まで、ご要望に応じてサポートプランをご用意しています。',
  },
  {
    q: '既存サイトのリニューアルも可能ですか？',
    a: 'もちろん可能です。既存サイトの課題分析を行った上で、改善のご提案をさせていただきます。',
  },
]

export default function ServiceCreativePage() {
  return (
    <main className="service-lp service-lp--creative">
      <ServiceJsonLd
        name="クリエイティブ制作"
        description="ホームページ、LP、バナー、動画を、戦略設計から公開後の改善までワンストップで支援します。"
        url="https://emplay.jp/service/creative"
        serviceType="Webクリエイティブ制作"
      />
      <FaqJsonLd faqs={faqs} />
      {/* パンくずリスト */}
      <Breadcrumb items={[
        { label: 'SERVICE', path: '/service' },
        { label: 'クリエイティブ制作' }
      ]} />

      {/* ヒーローセクション */}
      <section className="lp-hero">
        <div className="page-header-bg"></div>
        <div className="lp-hero-content">
          <span className="lp-hero-label">CREATIVE PRODUCTION</span>
          <h1 className="lp-hero-title">
            「作って終わり」ではない。<br />
            成果につながるクリエイティブ制作
          </h1>
          <p className="lp-hero-text">
            ホームページ、ランディングページ、バナー、動画。<br />
            御社のビジネスを加速させるWebクリエイティブをワンストップで提供します。
          </p>
          <Link href="/contact" className="btn btn-primary btn-large">無料相談を申し込む</Link>
        </div>
      </section>

      {/* 課題セクション */}
      <section className="lp-problems">
        <div className="container">
          <h2 className="lp-section-title">こんなお悩みありませんか？</h2>
          <div className="problems-grid">
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>ホームページが古くなってきた、スマホ対応していない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>サイトはあるが、問い合わせや申し込みにつながらない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>広告を出したいが、誘導先のページがない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>バナーや動画を作りたいが、社内にデザイナーがいない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>制作会社に依頼したが、思ったものと違った</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>制作と広告運用がバラバラで、PDCAが回しにくい</p>
            </div>
          </div>
        </div>
      </section>

      {/* 解決策セクション */}
      <section className="lp-solution">
        <div className="container">
          <h2 className="lp-section-title">EMPLAYなら、その悩みを解決できます</h2>
          <p className="lp-section-lead">
            私たちは「見た目がきれい」だけでなく、<br />
            <strong>「成果が出る」クリエイティブ</strong>にこだわります。
          </p>
          <div className="solution-points">
            <div className="solution-point">
              <span className="solution-point-num">01</span>
              <h3 className="solution-point-title">マーケティング視点の設計</h3>
              <p className="solution-point-text">
                デザインの前に、御社のビジネスとターゲットを徹底的に理解。「誰に」「何を」「どう伝えるか」を設計した上で制作に入ります。
              </p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">02</span>
              <h3 className="solution-point-title">広告運用との連携</h3>
              <p className="solution-point-text">
                広告運用チームと制作チームが連携。広告の成果データをもとにした改善提案、A/Bテスト用の複数パターン制作など、PDCAを素早く回せます。
              </p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">03</span>
              <h3 className="solution-point-title">ワンストップ対応</h3>
              <p className="solution-point-text">
                ホームページ、LP、バナー、動画まで一括対応。複数の会社に依頼する手間やコミュニケーションコストを削減できます。
              </p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">04</span>
              <h3 className="solution-point-title">公開後も伴走</h3>
              <p className="solution-point-text">
                公開して終わりではありません。アクセス解析をもとにした改善提案、コンテンツの追加・更新など、サイトを育てるサポートを継続します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* サービス内容 */}
      <section className="lp-services">
        <div className="container">
          <h2 className="lp-section-title">制作できるもの</h2>
          <div className="lp-services-grid">
            <div className="lp-service-card">
              <div className="lp-service-image">
                <div className="service-icon-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                </div>
              </div>
              <div className="lp-service-content">
                <h3 className="lp-service-title">ホームページ（コーポレートサイト）</h3>
                <p className="lp-service-text">
                  会社の信頼性を高め、サービス内容を正しく伝えるWebサイトです。会社概要、サービス紹介、採用情報、お問い合わせフォームなど、必要な情報を整理して掲載。検索エンジンで見つけてもらいやすいSEO対策も施します。
                </p>
                <ul className="lp-service-features">
                  <li>スマートフォン対応（レスポンシブデザイン）</li>
                  <li>SEO内部対策</li>
                  <li>お問い合わせフォーム設置</li>
                  <li>アクセス解析設定</li>
                </ul>
              </div>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-image">
                <div className="service-icon-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z" /><path d="M4 9h16" /><circle cx="8" cy="14" r="2" /></svg>
                </div>
              </div>
              <div className="lp-service-content">
                <h3 className="lp-service-title">ランディングページ（LP）</h3>
                <p className="lp-service-text">
                  特定の商品・サービスの申込みや購入を促す、1ページ完結型のWebページです。Web広告からの受け皿として機能し、訪問者を顧客へと導きます。
                </p>
                <ul className="lp-service-features">
                  <li>コンバージョン重視の構成設計</li>
                  <li>A/Bテスト対応</li>
                  <li>広告との連携設計</li>
                  <li>フォーム最適化</li>
                </ul>
              </div>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-image">
                <div className="service-icon-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
                </div>
              </div>
              <div className="lp-service-content">
                <h3 className="lp-service-title">記事LP</h3>
                <p className="lp-service-text">
                  読み物形式で商品の必要性や価値を伝えるランディングページです。「なぜこの商品が必要なのか」をストーリーで理解してもらい、納得した上での購入・申込みにつなげます。
                </p>
                <ul className="lp-service-features">
                  <li>ストーリー設計</li>
                  <li>読了率を高める構成</li>
                  <li>自然な購買導線</li>
                </ul>
              </div>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-image">
                <div className="service-icon-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                </div>
              </div>
              <div className="lp-service-content">
                <h3 className="lp-service-title">バナー制作</h3>
                <p className="lp-service-text">
                  Web広告やSNSで使用する画像素材を制作します。クリックしたくなるデザインと、伝わるコピーライティングで、広告効果を最大化します。
                </p>
                <ul className="lp-service-features">
                  <li>各媒体サイズに対応</li>
                  <li>A/Bテスト用の複数パターン制作</li>
                  <li>GIF/アニメーションバナー対応</li>
                </ul>
              </div>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-image">
                <div className="service-icon-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
                </div>
              </div>
              <div className="lp-service-content">
                <h3 className="lp-service-title">動画制作</h3>
                <p className="lp-service-text">
                  商品紹介、サービス説明、会社紹介など、目的に合わせた動画を制作。YouTube広告やSNS広告、Webサイト掲載用など、用途に応じた最適なフォーマットでお届けします。
                </p>
                <ul className="lp-service-features">
                  <li>企画・構成からお任せ</li>
                  <li>撮影・編集一括対応</li>
                  <li>各SNS向けサイズ調整</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 制作フロー */}
      <section className="lp-flow">
        <div className="container">
          <h2 className="lp-section-title">制作の流れ</h2>
          <div className="lp-flow-steps">
            <div className="lp-flow-step">
              <div className="lp-flow-step-header">
                <span className="lp-flow-step-num">STEP 01</span>
                <h3 className="lp-flow-step-title">ヒアリング</h3>
              </div>
              <p className="lp-flow-step-text">
                御社のビジネス、ターゲット、競合状況、ご要望を詳しくお伺いします。オンラインでのお打ち合わせも可能です。
              </p>
            </div>
            <div className="lp-flow-step">
              <div className="lp-flow-step-header">
                <span className="lp-flow-step-num">STEP 02</span>
                <h3 className="lp-flow-step-title">企画・構成提案</h3>
              </div>
              <p className="lp-flow-step-text">
                ヒアリング内容をもとに、サイト構成やデザインの方向性をご提案。この段階で全体像を共有し、認識のズレを防ぎます。
              </p>
            </div>
            <div className="lp-flow-step">
              <div className="lp-flow-step-header">
                <span className="lp-flow-step-num">STEP 03</span>
                <h3 className="lp-flow-step-title">デザイン制作</h3>
              </div>
              <p className="lp-flow-step-text">
                ご承認いただいた構成をもとに、デザインを制作。修正のご要望も柔軟に対応します。
              </p>
            </div>
            <div className="lp-flow-step">
              <div className="lp-flow-step-header">
                <span className="lp-flow-step-num">STEP 04</span>
                <h3 className="lp-flow-step-title">コーディング・実装</h3>
              </div>
              <p className="lp-flow-step-text">
                デザインを実際に動くWebサイトとして構築。スマートフォン対応、表示速度の最適化も行います。
              </p>
            </div>
            <div className="lp-flow-step">
              <div className="lp-flow-step-header">
                <span className="lp-flow-step-num">STEP 05</span>
                <h3 className="lp-flow-step-title">公開・納品</h3>
              </div>
              <p className="lp-flow-step-text">
                最終確認後、サイトを公開。アクセス解析の設定、納品後の修正対応や運用サポートもお任せください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 料金目安 */}
      <section className="lp-pricing" id="pricing">
        <div className="container">
          <h2 className="lp-section-title">料金目安</h2>
          <p className="lp-section-lead">
            制作内容やページ数によって変動します。まずはお気軽にご相談ください。
          </p>
          <div className="pricing-table">
            <div className="pricing-item">
              <h3 className="pricing-name">ホームページ（5ページ程度）</h3>
              <p className="pricing-price">30万円〜</p>
              <p className="pricing-note">企画・デザイン・コーディング込み</p>
            </div>
            <div className="pricing-item">
              <h3 className="pricing-name">ランディングページ</h3>
              <p className="pricing-price">15万円〜</p>
              <p className="pricing-note">構成・デザイン・コーディング込み</p>
            </div>
            <div className="pricing-item">
              <h3 className="pricing-name">バナー制作</h3>
              <p className="pricing-price">5,000円〜/枚</p>
              <p className="pricing-note">サイズ・仕様により変動</p>
            </div>
            <div className="pricing-item">
              <h3 className="pricing-name">動画制作</h3>
              <p className="pricing-price">10万円〜</p>
              <p className="pricing-note">企画・撮影・編集込み</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-faq">
        <div className="container">
          <h2 className="lp-section-title">よくあるご質問</h2>
          <div className="lp-faq-list">
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">制作期間はどれくらいですか？</h3>
              <p className="lp-faq-answer">
                ホームページで1.5〜2ヶ月、LPで2〜4週間が目安です。スケジュールはご要望に応じて調整可能ですので、お急ぎの場合もご相談ください。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">原稿や写真は用意する必要がありますか？</h3>
              <p className="lp-faq-answer">
                原稿の作成代行、写真撮影、素材手配も承ります。「何を用意すればいいか分からない」という場合も、ヒアリングを通じてサポートしますのでご安心ください。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">公開後の修正や更新は対応してもらえますか？</h3>
              <p className="lp-faq-answer">
                はい、対応しています。軽微な修正から、コンテンツの追加、運用保守まで、ご要望に応じてサポートプランをご用意しています。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">既存サイトのリニューアルも可能ですか？</h3>
              <p className="lp-faq-answer">
                もちろん可能です。既存サイトの課題分析を行った上で、改善のご提案をさせていただきます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="container">
          <div className="lp-cta-content">
            <h2 className="lp-cta-title">まずはお気軽にご相談ください</h2>
            <p className="lp-cta-text">
              「こんなサイトを作りたい」「費用感を知りたい」など、<br />
              お気軽にお問い合わせください。ご相談は無料です。
            </p>
            <div className="lp-cta-buttons">
              <Link href="/contact" className="btn btn-primary btn-large">無料相談を申し込む</Link>
              <Link href="/service" className="btn btn-outline-white btn-large">サービス一覧に戻る</Link>
            </div>
          </div>
        </div>
      </section>
      <StickyMobileCTA location="service_creative" />
    </main>
  )
}
