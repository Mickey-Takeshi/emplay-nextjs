'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import './Service.css'

export default function ServiceClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: '相談だけでも大丈夫ですか？',
      a: 'はい、もちろんです。まずは御社の課題やご要望をお聞かせください。最適な施策をご提案いたします。'
    },
    {
      q: '他社で作成したサイトの改善もお願いできますか？',
      a: '対応可能です。現状のサイトを分析し、改善点をご提案いたします。'
    },
    {
      q: '広告運用だけ、制作だけの依頼も可能ですか？',
      a: '可能です。必要なサービスのみをご利用いただけます。'
    },
    {
      q: '名刺が紙のままですが、データ化もお願いできますか？',
      a: '対応可能です。名刺のスキャン・データ化からCRMへの取り込みまで、一括でサポートいたします。'
    },
    {
      q: 'メルマガやLINEの配信だけお願いすることもできますか？',
      a: '可能です。既存の顧客リストをお預かりし、配信代行のみのご依頼も承ります。'
    },
    {
      q: '研修に使える補助金があるか知りたいのですが？',
      a: 'お問い合わせ時に御社の情報をお伺いし、活用可能な補助金・助成金をご案内いたします。補助金診断は無料で行っておりますので、お気軽にご相談ください。'
    },
    {
      q: '補助金の申請は自社で行う必要がありますか？',
      a: '申請自体は御社名義で行っていただきますが、事業計画書や申請書類の作成、手続きのアドバイスなど、採択に向けたサポートを行います。'
    },
    {
      q: '地方の企業ですが対応できますか？',
      a: 'オンラインでの打ち合わせ・納品が可能ですので、全国どこからでもご依頼いただけます。'
    },
    {
      q: '社内にWeb担当者がいないのですが大丈夫ですか？',
      a: '専門知識がなくても問題ありません。専任の担当者が分かりやすくご説明しながら進めます。'
    }
  ]

  return (
    <main className="service-page">
      {/* ヒーローセクション */}
      <header className="service-hero" aria-label="ページヘッダー">
        <div className="service-hero-background" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80"
            alt=""
            className="service-hero-bg-image"
            loading="eager"
          />
          <div className="service-hero-overlay"></div>
        </div>
        <div className="service-hero-content">
          <p className="service-hero-label">SERVICE</p>
          <h1 className="service-hero-title">
            Web集客から社内DXまで、<br />
            ビジネスの成長をワンストップで支援
          </h1>
          <p className="service-hero-text">
            「サイトを作りたい」「もっと集客したい」「業務を効率化したい」<br className="pc-only" />
            そんなお悩みに、戦略設計から実行・運用まで一貫して伴走します。
          </p>
        </div>
      </header>

      {/* パンくずリスト */}
      <Breadcrumb items={[{ label: 'SERVICE' }]} />

      {/* HP制作サービス（NEW） */}
      <section className="service-detail service-detail-featured" id="hp" aria-labelledby="hp-heading">
        <div className="container">
          <div className="service-detail-header">
            <span className="service-detail-number service-new-badge">NEW SERVICE</span>
            <h2 id="hp-heading" className="service-detail-title">HP制作サービス</h2>
            <p className="service-detail-catch">「作って終わり」ではない。成果が出るまで伴走するHP制作</p>
            <p className="service-detail-desc">
              SEOだけでなく「AIO（AI検索最適化）」にも対応した、これからの時代に必要なHP制作サービスです。制作後も継続的なコンテンツ作成と効果測定で、検索上位表示から問い合わせ獲得まで伴走します。
            </p>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">なぜ今、HP刷新が必要なのか</h3>
            <div className="hp-reasons">
              <div className="hp-reason-card">
                <div className="hp-reason-stat">40%</div>
                <p className="hp-reason-text">中小企業の約40%がHPからの集客に課題を感じている</p>
              </div>
              <div className="hp-reason-card">
                <div className="hp-reason-stat">50%+</div>
                <p className="hp-reason-text">検索の50%以上がAI検索に移行すると予測</p>
              </div>
              <div className="hp-reason-card">
                <div className="hp-reason-stat">SEO+AIO</div>
                <p className="hp-reason-text">従来のSEOだけでは検索上位に表示されにくい時代に</p>
              </div>
            </div>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">選ばれる3つの理由</h3>
            <div className="hp-features">
              <div className="hp-feature">
                <span className="hp-feature-num">01</span>
                <h4 className="hp-feature-title">SEO＋AIO対応設計</h4>
                <p className="hp-feature-text">Google検索だけでなく、ChatGPT・Perplexity・GeminiなどのAI検索にも「引用される」「参照される」サイト設計。3年後も検索されるHPを構築します。</p>
              </div>
              <div className="hp-feature">
                <span className="hp-feature-num">02</span>
                <h4 className="hp-feature-title">継続コンテンツ作成</h4>
                <p className="hp-feature-text">HPは「作っただけ」では検索上位に上がりません。毎月10本のSEO最適化記事を代行作成し、検索流入と問い合わせを継続的に増やします。</p>
              </div>
              <div className="hp-feature">
                <span className="hp-feature-num">03</span>
                <h4 className="hp-feature-title">長期パートナーシップ</h4>
                <p className="hp-feature-text">SEO/AIOの効果は3〜6ヶ月で徐々に現れます。2年間かけて「資産となるHP」を一緒に育て、月次レポートと定例MTGで効果を可視化します。</p>
              </div>
            </div>
          </div>

          <div className="service-detail-cta">
            <Link href="/service/hp" className="btn btn-primary btn-large">HP制作サービスの詳細を見る</Link>
          </div>
        </div>
      </section>

      {/* 3つの課題セクション */}
      <section className="service-challenges" aria-labelledby="challenges-heading">
        <div className="container">
          <h2 id="challenges-heading" className="section-title-center">EMPLAYが解決する3つの課題</h2>
          <div className="challenges-grid">
            <article className="challenge-card">
              <span className="challenge-number">01</span>
              <h3 className="challenge-title">自社のHP・LPを作りたい</h3>
              <p className="challenge-text">
                「会社のWebサイトがない」「あるけど古くて恥ずかしい」「広告用のページが必要」<br />
                ビジネスの顔となるWebサイトやランディングページを、企画から制作まで一括でお任せいただけます。
              </p>
            </article>
            <article className="challenge-card">
              <span className="challenge-number">02</span>
              <h3 className="challenge-title">リード（見込み顧客）を増やしたい</h3>
              <p className="challenge-text">
                「サイトはあるのにお問い合わせが来ない」「広告を出したいけどやり方がわからない」<br />
                Web広告の運用代行で、御社の商品・サービスを「今すぐ欲しい人」に届けます。
              </p>
            </article>
            <article className="challenge-card">
              <span className="challenge-number">03</span>
              <h3 className="challenge-title">社内のDX推進を進めたい</h3>
              <p className="challenge-text">
                「顧客管理がエクセルのまま」「AIを活用したいけど何から始めれば…」<br />
                CRMの導入支援やAI研修で、業務効率化と生産性向上を実現します。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* サービス01: クリエイティブ制作 */}
      <section className="service-detail" id="creative" aria-labelledby="creative-heading">
        <div className="container">
          <div className="service-detail-header">
            <span className="service-detail-number">SERVICE 01</span>
            <h2 id="creative-heading" className="service-detail-title">クリエイティブ制作</h2>
            <p className="service-detail-catch">ビジネスの第一印象を決める、Webサイト・LP・動画・バナー制作</p>
            <p className="service-detail-desc">
              御社のサービスや商品の魅力を最大限に伝えるクリエイティブを制作します。「作って終わり」ではなく、集客や成約につながる設計を重視。広告運用との連携を前提とした、成果の出るクリエイティブをご提供します。
            </p>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">制作できるもの</h3>
            <div className="service-items-grid">
              <div className="service-item">
                <div className="service-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <div className="service-item-content">
                  <h4 className="service-item-title">ホームページ（コーポレートサイト）</h4>
                  <p className="service-item-text">
                    会社の信頼性を高め、サービス内容を正しく伝えるWebサイトです。会社概要、サービス紹介、採用情報、お問い合わせフォームなど、必要な情報を整理して掲載。検索エンジンで見つけてもらいやすいSEO対策も施します。
                  </p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 9h16" />
                    <path d="M12 9v11" />
                    <circle cx="8" cy="14" r="2" />
                  </svg>
                </div>
                <div className="service-item-content">
                  <h4 className="service-item-title">ランディングページ（LP）</h4>
                  <p className="service-item-text">
                    特定の商品・サービスの申込みや購入を促す、1ページ完結型のWebページです。Web広告からの受け皿として機能し、訪問者を顧客へと導きます。
                  </p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <div className="service-item-content">
                  <h4 className="service-item-title">記事LP</h4>
                  <p className="service-item-text">
                    読み物形式で商品の必要性や価値を伝えるランディングページです。「なぜこの商品が必要なのか」をストーリーで理解してもらい、納得した上での購入・申込みにつなげます。
                  </p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <div className="service-item-content">
                  <h4 className="service-item-title">バナー制作</h4>
                  <p className="service-item-text">
                    Web広告やSNSで使用する画像素材を制作します。クリックしたくなるデザインと、伝わるコピーライティングで、広告効果を最大化します。
                  </p>
                </div>
              </div>
              <div className="service-item">
                <div className="service-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" />
                  </svg>
                </div>
                <div className="service-item-content">
                  <h4 className="service-item-title">動画制作</h4>
                  <p className="service-item-text">
                    商品紹介、サービス説明、会社紹介など、目的に合わせた動画を制作。YouTube広告やSNS広告、Webサイト掲載用など、用途に応じた最適なフォーマットでお届けします。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="service-flow">
            <h3 className="service-flow-title">制作の流れ</h3>
            <div className="service-flow-steps">
              <div className="flow-step">
                <span className="flow-step-num">STEP 1</span>
                <h4 className="flow-step-title">ヒアリング</h4>
                <p className="flow-step-text">御社のビジネス、ターゲット、競合状況、ご要望を詳しくお伺いします。</p>
              </div>
              <div className="flow-step">
                <span className="flow-step-num">STEP 2</span>
                <h4 className="flow-step-title">企画・構成提案</h4>
                <p className="flow-step-text">ヒアリング内容をもとに、サイト構成やデザインの方向性をご提案します。</p>
              </div>
              <div className="flow-step">
                <span className="flow-step-num">STEP 3</span>
                <h4 className="flow-step-title">デザイン制作</h4>
                <p className="flow-step-text">ご承認いただいた構成をもとに、デザインを制作。修正のご要望も柔軟に対応します。</p>
              </div>
              <div className="flow-step">
                <span className="flow-step-num">STEP 4</span>
                <h4 className="flow-step-title">コーディング・実装</h4>
                <p className="flow-step-text">デザインを実際に動くWebサイトとして構築します。</p>
              </div>
              <div className="flow-step">
                <span className="flow-step-num">STEP 5</span>
                <h4 className="flow-step-title">公開・納品</h4>
                <p className="flow-step-text">最終確認後、サイトを公開。納品後の修正対応や運用サポートもお任せください。</p>
              </div>
            </div>
          </div>

          <div className="service-detail-cta">
            <Link href="/service/creative" className="btn btn-outline btn-large">クリエイティブ制作の詳細を見る</Link>
          </div>
        </div>
      </section>

      {/* サービス02: Web広告運用代行 */}
      <section className="service-detail service-detail-alt" id="ads" aria-labelledby="ads-heading">
        <div className="container">
          <div className="service-detail-header">
            <span className="service-detail-number">SERVICE 02</span>
            <h2 id="ads-heading" className="service-detail-title">Web広告運用代行</h2>
            <p className="service-detail-catch">「届けたい人」に届ける、成果にこだわる広告運用</p>
            <p className="service-detail-desc">
              Google、Yahoo!、Meta（Facebook/Instagram）、LINE、TikTok、DSPなど、主要なWeb広告媒体の運用を代行します。媒体選定から広告文の作成、日々の調整、効果測定まで、広告運用に必要なすべてをワンストップでお任せいただけます。
            </p>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">取り扱い媒体</h3>
            <div className="media-grid">
              <div className="media-card">
                <h4 className="media-name">Google広告</h4>
                <p className="media-desc">世界最大の検索エンジンに広告を配信。「今まさに探している人」にアプローチできるため、購買意欲の高いユーザーを獲得できます。</p>
              </div>
              <div className="media-card">
                <h4 className="media-name">Yahoo!広告</h4>
                <p className="media-desc">国内第2位のシェアを持つ検索エンジンとYahoo!ニュースなどへ広告を配信。40代以上のユーザーが多く、幅広い年代にリーチしたい場合に有効です。</p>
              </div>
              <div className="media-card">
                <h4 className="media-name">Meta広告</h4>
                <p className="media-desc">Facebook/Instagramへ詳細なターゲティングで配信。ビジュアルで訴求する商材、BtoC向けサービス、ブランディングに効果を発揮します。</p>
              </div>
              <div className="media-card">
                <h4 className="media-name">LINE広告</h4>
                <p className="media-desc">国内9,000万人以上が利用するLINEに広告を配信。幅広い年代・属性にリーチでき、店舗集客やECサイトに適しています。</p>
              </div>
              <div className="media-card">
                <h4 className="media-name">TikTok広告</h4>
                <p className="media-desc">若年層を中心に急成長中の動画プラットフォーム。短尺動画で商品の魅力を伝え、認知拡大やバズを狙うキャンペーンに最適です。</p>
              </div>
              <div className="media-card">
                <h4 className="media-name">DSP広告</h4>
                <p className="media-desc">複数のWebサイトやアプリに横断して広告を配信。リターゲティングや認知拡大に効果的です。</p>
              </div>
            </div>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">運用代行の内容</h3>
            <div className="operation-grid">
              <div className="operation-item">
                <h4 className="operation-title">戦略設計</h4>
                <p className="operation-text">御社の商品・サービス、ターゲット、予算に応じて、最適な媒体と配信戦略を設計します。</p>
              </div>
              <div className="operation-item">
                <h4 className="operation-title">広告制作・入稿</h4>
                <p className="operation-text">広告文の作成、バナーや動画の制作、各媒体への入稿作業を行います。</p>
              </div>
              <div className="operation-item">
                <h4 className="operation-title">日次運用・最適化</h4>
                <p className="operation-text">予算配分の調整、入札単価の最適化、ターゲティングの改善など、日々の細かな調整で成果を最大化します。</p>
              </div>
              <div className="operation-item">
                <h4 className="operation-title">効果測定・分析</h4>
                <p className="operation-text">クリック数、コンバージョン数、費用対効果などを継続的に分析。データに基づいた改善を行います。</p>
              </div>
              <div className="operation-item">
                <h4 className="operation-title">レポーティング</h4>
                <p className="operation-text">成果を分かりやすくまとめた月次レポートをご提出。改善施策のご提案も合わせて行います。</p>
              </div>
            </div>
          </div>

          <div className="metrics-section">
            <h3 className="service-items-title">成果指標について</h3>
            <p className="metrics-intro">広告運用では、以下の指標を用いて成果を測定・報告します。</p>
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-name">IMP</span>
                <span className="metric-desc">広告が表示された回数</span>
              </div>
              <div className="metric-item">
                <span className="metric-name">CPC</span>
                <span className="metric-desc">1クリックあたりの費用</span>
              </div>
              <div className="metric-item">
                <span className="metric-name">CTR</span>
                <span className="metric-desc">広告がクリックされた割合</span>
              </div>
              <div className="metric-item">
                <span className="metric-name">CV</span>
                <span className="metric-desc">目標とする成果の件数</span>
              </div>
              <div className="metric-item">
                <span className="metric-name">CPA</span>
                <span className="metric-desc">1件の成果を得るのにかかった費用</span>
              </div>
              <div className="metric-item">
                <span className="metric-name">ROAS</span>
                <span className="metric-desc">広告費に対する売上の指標</span>
              </div>
            </div>
          </div>

          <div className="service-detail-cta">
            <Link href="/service/ads" className="btn btn-outline btn-large">Web広告運用代行の詳細を見る</Link>
          </div>
        </div>
      </section>

      {/* サービス03: CRM導入支援 */}
      <section className="service-detail" id="crm" aria-labelledby="crm-heading">
        <div className="container">
          <div className="service-detail-header">
            <span className="service-detail-number">SERVICE 03</span>
            <h2 id="crm-heading" className="service-detail-title">CRM導入支援</h2>
            <p className="service-detail-catch">眠っている名刺を資産に変え、顧客との関係を継続的に育てる</p>
            <p className="service-detail-desc">
              CRM（顧客関係管理システム）の導入をサポートします。エクセルや紙で管理していた顧客情報、机の引き出しに眠っている名刺をシステムで一元化。フォロー漏れの防止、営業活動の可視化に加え、メルマガやLINE配信で継続的な顧客接点を構築します。
            </p>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">CRM導入で実現できること</h3>
            <div className="crm-benefits">
              <div className="crm-benefit">
                <div className="crm-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M7 8h2" />
                    <path d="M7 12h4" />
                    <path d="M7 16h6" />
                  </svg>
                </div>
                <h4 className="crm-benefit-title">眠っている名刺を「使える資産」に</h4>
                <p className="crm-benefit-text">展示会や商談で交換した名刺、そのまま眠っていませんか？名刺をデータ化してCRMに取り込むことで、過去に接点のあった見込み顧客へ再アプローチが可能に。</p>
              </div>
              <div className="crm-benefit">
                <div className="crm-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h4 className="crm-benefit-title">顧客情報の一元管理</h4>
                <p className="crm-benefit-text">バラバラに管理していた顧客情報を一つのシステムに集約。担当者が変わっても、過去のやり取りや商談状況がすぐに確認できます。</p>
              </div>
              <div className="crm-benefit">
                <div className="crm-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h4 className="crm-benefit-title">対応履歴の自動記録</h4>
                <p className="crm-benefit-text">いつ、誰が、どんな対応をしたかが自動で記録されます。「前回何を話したか覚えていない」という状況がなくなります。</p>
              </div>
              <div className="crm-benefit">
                <div className="crm-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4 className="crm-benefit-title">フォロー漏れの防止</h4>
                <p className="crm-benefit-text">リマインド機能やタスク管理機能で、「連絡し忘れた」「対応が遅れた」というミスを防ぎます。</p>
              </div>
              <div className="crm-benefit">
                <div className="crm-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 20V10" />
                    <path d="M12 20V4" />
                    <path d="M6 20v-6" />
                  </svg>
                </div>
                <h4 className="crm-benefit-title">営業成績の見える化</h4>
                <p className="crm-benefit-text">商談の進捗状況や受注率がリアルタイムでダッシュボード表示。チーム全体のパフォーマンスを把握できます。</p>
              </div>
              <div className="crm-benefit">
                <div className="crm-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h4 className="crm-benefit-title">情報共有の効率化</h4>
                <p className="crm-benefit-text">チーム内での引き継ぎや情報共有が簡単に。「あの案件どうなってる？」と聞き回る必要がなくなります。</p>
              </div>
            </div>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">メルマガ・LINE配信代行</h3>
            <p className="service-items-intro">CRMに蓄積した顧客データを活用し、メールマガジンやLINE公式アカウントの配信を代行します。</p>
            <div className="delivery-grid">
              <div className="delivery-card">
                <h4 className="delivery-title">メルマガ配信代行</h4>
                <p className="delivery-text">顧客リストのセグメント分け、配信コンテンツの企画・作成、配信設定、効果測定までを一括でサポート。開封率やクリック率を分析し、継続的に改善します。</p>
              </div>
              <div className="delivery-card">
                <h4 className="delivery-title">LINE公式アカウント配信代行</h4>
                <p className="delivery-text">友だち追加の導線設計から、配信コンテンツの作成、セグメント配信、リッチメニューの設定までをサポート。メールよりも開封率が高いLINEを活用し、顧客との距離を縮めます。</p>
              </div>
            </div>
          </div>

          <div className="service-flow">
            <h3 className="service-flow-title">導入の流れ</h3>
            <div className="service-flow-steps service-flow-steps-4">
              <div className="flow-step">
                <span className="flow-step-num">PHASE 1</span>
                <h4 className="flow-step-title">現状分析</h4>
                <p className="flow-step-text">現在の業務フロー、課題、ご要望をヒアリング。既存の名刺や顧客リストの状況も確認します。</p>
              </div>
              <div className="flow-step">
                <span className="flow-step-num">PHASE 2</span>
                <h4 className="flow-step-title">設計・構築</h4>
                <p className="flow-step-text">業務に合わせたシステム設計を行い、ツールの設定・カスタマイズを実施します。</p>
              </div>
              <div className="flow-step">
                <span className="flow-step-num">PHASE 3</span>
                <h4 className="flow-step-title">導入・研修</h4>
                <p className="flow-step-text">既存データの移行、操作研修、マニュアル作成を行い、スムーズな立ち上げをサポートします。</p>
              </div>
              <div className="flow-step">
                <span className="flow-step-num">PHASE 4</span>
                <h4 className="flow-step-title">運用サポート</h4>
                <p className="flow-step-text">導入後の定着支援、配信の継続代行、運用改善のご提案を継続的に行います。</p>
              </div>
            </div>
          </div>

          <div className="service-detail-cta">
            <Link href="/service/crm" className="btn btn-outline btn-large">CRM導入支援の詳細を見る</Link>
          </div>
        </div>
      </section>

      {/* サービス04: 助成金活用研修 */}
      <section className="service-detail service-detail-alt" id="training" aria-labelledby="training-heading">
        <div className="container">
          <div className="service-detail-header">
            <span className="service-detail-number">SERVICE 04</span>
            <h2 id="training-heading" className="service-detail-title">助成金を活用した研修サービス</h2>
            <p className="service-detail-catch">研修だけで終わらせない。売上向上まで伴走します。</p>
            <p className="service-detail-desc">
              最大75%助成で実質月2.5万円/人〜。研修×事業支援一体型のサービスです。「研修だけ」で終わらせず、事業成果まで伴走します。
            </p>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">選ばれる3つの理由</h3>
            <div className="training-features">
              <div className="training-feature">
                <span className="training-feature-num">01</span>
                <h4 className="training-feature-title">研修＋実務支援</h4>
                <p className="training-feature-text">座学だけで終わらない。研修中から実際の業務課題に取り組み、即実務に活かせるスキルを習得します。</p>
              </div>
              <div className="training-feature">
                <span className="training-feature-num">02</span>
                <h4 className="training-feature-title">成果にコミット</h4>
                <p className="training-feature-text">業務時間削減、採用単価削減、ROAS改善など、具体的な成果指標にコミット。効果測定まで実施します。</p>
              </div>
              <div className="training-feature">
                <span className="training-feature-num">03</span>
                <h4 className="training-feature-title">助成金申請サポート込み</h4>
                <p className="training-feature-text">最大75%の助成金申請を追加料金なしでフルサポート。面倒な書類作成もお任せください。</p>
              </div>
            </div>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">研修プログラム一覧</h3>
            <div className="training-menu">
              <div className="training-menu-item">
                <h4 className="training-menu-title">AI/DX活用研修</h4>
                <p className="training-menu-desc">業務効率化・生産性向上。ChatGPT/Claude活用から自動化ツール導入まで、業務時間20〜40%削減を目指します。</p>
              </div>
              <div className="training-menu-item">
                <h4 className="training-menu-title">採用マーケティング研修</h4>
                <p className="training-menu-desc">採用難・コスト削減。求人原稿作成からSNS採用まで、採用単価30〜50%削減を目指します。</p>
              </div>
              <div className="training-menu-item">
                <h4 className="training-menu-title">Webマーケティング研修</h4>
                <p className="training-menu-desc">集客・売上向上。Web広告の基礎から運用内製化まで、ROAS改善と代理店依存脱却を実現。</p>
              </div>
              <div className="training-menu-item">
                <h4 className="training-menu-title">SNS攻略研修</h4>
                <p className="training-menu-desc">集客・ブランディング。戦略設計から投稿作成、分析改善まで、SNS運用人材を育成します。</p>
              </div>
            </div>
            <p className="subsidy-note">※全プログラム共通：月8時間×3ヶ月、対面orオンライン対応</p>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">活用できる助成金制度</h3>
            <div className="subsidy-grid">
              <div className="subsidy-card">
                <h4 className="subsidy-name">人材開発支援助成金</h4>
                <p className="subsidy-desc">経費75%＋賃金1,000円/時が助成。事業展開等リスキリング支援コースが対象です。</p>
              </div>
              <div className="subsidy-card">
                <h4 className="subsidy-name">東京都DXリスキリング助成金</h4>
                <p className="subsidy-desc">3/4助成、年間上限100万円。都内中小企業が対象です。</p>
              </div>
            </div>
            <p className="subsidy-note">※国と都は併用不可。EMPLAYが最適プランを提案します。</p>
          </div>

          <div className="service-items">
            <h3 className="service-items-title">料金</h3>
            <div className="training-pricing-simple">
              <div className="pricing-comparison">
                <div className="pricing-before">
                  <span className="pricing-label">通常価格</span>
                  <span className="pricing-value">月10万円<small>/人</small></span>
                </div>
                <span className="pricing-arrow">→</span>
                <div className="pricing-after">
                  <span className="pricing-label">助成金適用後</span>
                  <span className="pricing-value highlight">月2.5万円〜<small>/人</small></span>
                </div>
              </div>
              <p className="pricing-note">※5名〜、3ヶ月〜 / 最大75%助成＋賃金助成8,000円/人・月</p>
            </div>
          </div>

          <div className="service-detail-cta">
            <Link href="/service/training" className="btn btn-outline btn-large">研修サービスの詳細を見る</Link>
          </div>
        </div>
      </section>

      {/* 課題別ソリューション */}
      <section className="solutions-section" aria-labelledby="solutions-heading">
        <div className="container">
          <h2 id="solutions-heading" className="section-title-center">お悩み別おすすめの組み合わせ</h2>
          <div className="solutions-grid">
            <div className="solution-card">
              <h3 className="solution-title">「初めてWebサイトを作りたい」</h3>
              <p className="solution-text">まずはコーポレートサイトやサービス紹介ページを制作。企業としての信頼性を確保し、お問い合わせの受け皿を整えます。</p>
              <span className="solution-services">クリエイティブ制作</span>
            </div>
            <div className="solution-card">
              <h3 className="solution-title">「サイトはあるが集客できていない」</h3>
              <p className="solution-text">Web広告を活用して、御社のサービスを必要としている人に情報を届けます。既存サイトの改善提案も合わせて行います。</p>
              <span className="solution-services">Web広告運用代行 ＋ LP改善</span>
            </div>
            <div className="solution-card">
              <h3 className="solution-title">「広告もサイトも本格的に取り組みたい」</h3>
              <p className="solution-text">広告効果を最大化するLPを新規制作し、広告運用と連携。制作と運用をワンストップで行うことで、PDCAを素早く回せます。</p>
              <span className="solution-services">クリエイティブ制作 ＋ Web広告運用代行</span>
            </div>
            <div className="solution-card">
              <h3 className="solution-title">「名刺や顧客リストを活用できていない」</h3>
              <p className="solution-text">眠っている名刺をデータ化し、CRMで一元管理。メルマガやLINE配信で定期的にアプローチすることで、過去の接点を売上につなげます。</p>
              <span className="solution-services">CRM導入支援 ＋ メルマガ・LINE配信代行</span>
            </div>
            <div className="solution-card">
              <h3 className="solution-title">「社内でAIを活用したい」</h3>
              <p className="solution-text">まずは基礎研修でAIリテラシーを向上。その後、実践研修で自社業務への適用方法を具体化します。補助金を活用すれば費用負担を抑えて導入できます。</p>
              <span className="solution-services">AI/DX研修（補助金活用サポート付き）</span>
            </div>
            <div className="solution-card">
              <h3 className="solution-title">「DX推進を本格的に進めたい」</h3>
              <p className="solution-text">研修とツール導入を組み合わせ、組織全体のDXを推進。戦略策定から実行、定着まで伴走します。</p>
              <span className="solution-services">AI/DX研修 ＋ CRM導入支援</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="service-cta" aria-label="お問い合わせ">
        <div className="container">
          <div className="service-cta-content">
            <h2 className="service-cta-title">まずはお気軽にご相談ください</h2>
            <p className="service-cta-text">
              「何から始めればいいか分からない」という段階でも大丈夫です。<br />
              御社の現状と課題をお伺いした上で、最適なソリューションをご提案します。
            </p>
            <Link href="/contact" className="btn btn-primary btn-large">無料相談を申し込む</Link>
          </div>
        </div>
      </section>

      {/* FAQ セクション */}
      <section className="faq-section" aria-labelledby="faq-heading">
        <div className="container">
          <h2 id="faq-heading" className="section-title-center">よくあるご質問</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="faq-q">Q.</span>
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-toggle" aria-hidden="true">{openFaq === index ? '−' : '＋'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
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
