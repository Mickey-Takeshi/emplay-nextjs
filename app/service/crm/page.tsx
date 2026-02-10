import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import '../ServiceDetail.css'

export const metadata: Metadata = {
  title: 'CRM導入支援 | 株式会社EMPLAY',
  description: '顧客管理の効率化、営業の見える化、メルマガ・LINE配信まで。CRM導入から活用までをワンストップでサポートします。',
  openGraph: {
    title: 'CRM導入支援 | 株式会社EMPLAY',
    description: '顧客管理の効率化、営業の見える化、メルマガ・LINE配信まで。CRM導入から活用までをワンストップでサポートします。',
  },
}

export default function ServiceCrmPage() {
  return (
    <main className="service-lp">
      {/* パンくずリスト */}
      <Breadcrumb items={[
        { label: 'SERVICE', path: '/service' },
        { label: 'CRM導入支援' }
      ]} />

      {/* ヒーローセクション */}
      <section className="lp-hero">
        <div className="lp-hero-background">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
            alt=""
            className="lp-hero-bg-image"
          />
          <div className="lp-hero-overlay"></div>
        </div>
        <div className="lp-hero-content">
          <span className="lp-hero-label">CRM IMPLEMENTATION</span>
          <h1 className="lp-hero-title">
            眠っている名刺を資産に変える。<br />
            顧客との関係を育てるCRM導入支援
          </h1>
          <p className="lp-hero-text">
            エクセルや紙での顧客管理から脱却。<br />
            CRMで顧客情報を一元化し、メルマガ・LINE配信で継続的な関係構築を実現します。
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
              <p>展示会や商談で交換した名刺が、机の引き出しに眠っている</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>顧客情報がエクセルや個人のメモでバラバラに管理されている</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>担当者が変わると、過去のやり取りが分からなくなる</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>フォローすべき顧客を忘れてしまう、対応漏れが発生する</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>営業活動の進捗が見えない、成果が数字で把握できない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>既存顧客へのアプローチができていない、リピートにつながらない</p>
            </div>
          </div>
        </div>
      </section>

      {/* 解決策セクション */}
      <section className="lp-solution">
        <div className="container">
          <h2 className="lp-section-title">CRM導入で、これらの課題を解決</h2>
          <p className="lp-section-lead">
            「導入して終わり」ではなく、<br />
            <strong>「使いこなせる」状態まで</strong>サポートします。
          </p>
          <div className="solution-points">
            <div className="solution-point">
              <span className="solution-point-num">01</span>
              <h3 className="solution-point-title">眠っている名刺を「使える資産」に</h3>
              <p className="solution-point-text">
                名刺をデータ化してCRMに取り込むことで、過去に接点のあった見込み顧客へ再アプローチが可能に。眠っていた名刺が売上につながる資産に変わります。
              </p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">02</span>
              <h3 className="solution-point-title">顧客情報の一元管理</h3>
              <p className="solution-point-text">
                バラバラに管理していた顧客情報を一つのシステムに集約。担当者が変わっても、過去のやり取りや商談状況がすぐに確認できます。
              </p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">03</span>
              <h3 className="solution-point-title">フォロー漏れを防止</h3>
              <p className="solution-point-text">
                リマインド機能やタスク管理機能で、「連絡し忘れた」「対応が遅れた」というミスを防ぎます。顧客との関係性を継続的に育てられます。
              </p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">04</span>
              <h3 className="solution-point-title">営業成績の見える化</h3>
              <p className="solution-point-text">
                商談の進捗状況や受注率がリアルタイムでダッシュボード表示。チーム全体のパフォーマンスを把握し、的確なマネジメントが可能に。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* サービス内容 */}
      <section className="lp-services">
        <div className="container">
          <h2 className="lp-section-title">CRM導入支援の内容</h2>
          <div className="lp-crm-services">
            <div className="lp-crm-service">
              <div className="lp-crm-service-header">
                <h3 className="lp-crm-service-title">CRMツール導入・設定</h3>
              </div>
              <p className="lp-crm-service-text">
                御社の業務フローに合わせて、CRMツール（HubSpotなど）の導入・設定を行います。既存の顧客データの移行もサポートします。
              </p>
              <ul className="lp-crm-service-list">
                <li>業務フローのヒアリング・設計</li>
                <li>CRMアカウント開設・初期設定</li>
                <li>既存データの移行・取り込み</li>
                <li>名刺データのデジタル化</li>
                <li>操作研修・マニュアル作成</li>
              </ul>
            </div>
            <div className="lp-crm-service">
              <div className="lp-crm-service-header">
                <h3 className="lp-crm-service-title">メルマガ配信代行</h3>
              </div>
              <p className="lp-crm-service-text">
                CRMに蓄積した顧客データを活用し、メールマガジンの配信を代行します。配信して終わりではなく、効果測定と改善も継続的に行います。
              </p>
              <ul className="lp-crm-service-list">
                <li>配信リストのセグメント設計</li>
                <li>配信コンテンツの企画・作成</li>
                <li>配信設定・スケジューリング</li>
                <li>開封率・クリック率の分析</li>
                <li>改善施策のご提案</li>
              </ul>
            </div>
            <div className="lp-crm-service">
              <div className="lp-crm-service-header">
                <h3 className="lp-crm-service-title">LINE公式アカウント配信代行</h3>
              </div>
              <p className="lp-crm-service-text">
                メールよりも開封率が高いLINEを活用し、顧客との距離を縮めます。友だち追加の導線設計からセグメント配信まで一括サポート。
              </p>
              <ul className="lp-crm-service-list">
                <li>LINE公式アカウントの開設・設定</li>
                <li>友だち追加の導線設計</li>
                <li>リッチメニューの設定</li>
                <li>配信コンテンツの作成</li>
                <li>セグメント配信の設計・実行</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 導入フロー */}
      <section className="lp-flow">
        <div className="container">
          <h2 className="lp-section-title">導入の流れ</h2>
          <div className="lp-flow-steps">
            <div className="lp-flow-step">
              <div className="lp-flow-step-header">
                <span className="lp-flow-step-num">PHASE 01</span>
                <h3 className="lp-flow-step-title">現状分析</h3>
              </div>
              <p className="lp-flow-step-text">
                現在の業務フロー、顧客管理の課題、ご要望をヒアリング。既存の名刺や顧客リストの状況も確認し、最適な導入プランをご提案します。
              </p>
            </div>
            <div className="lp-flow-step">
              <div className="lp-flow-step-header">
                <span className="lp-flow-step-num">PHASE 02</span>
                <h3 className="lp-flow-step-title">設計・構築</h3>
              </div>
              <p className="lp-flow-step-text">
                業務に合わせたCRMの設計を行い、ツールの設定・カスタマイズを実施。データ項目やワークフローを御社の業務に最適化します。
              </p>
            </div>
            <div className="lp-flow-step">
              <div className="lp-flow-step-header">
                <span className="lp-flow-step-num">PHASE 03</span>
                <h3 className="lp-flow-step-title">導入・研修</h3>
              </div>
              <p className="lp-flow-step-text">
                既存データの移行、スタッフへの操作研修、マニュアル作成を行い、スムーズな立ち上げをサポートします。
              </p>
            </div>
            <div className="lp-flow-step">
              <div className="lp-flow-step-header">
                <span className="lp-flow-step-num">PHASE 04</span>
                <h3 className="lp-flow-step-title">運用サポート</h3>
              </div>
              <p className="lp-flow-step-text">
                導入後の定着支援、メルマガ・LINE配信の継続代行、運用改善のご提案を継続的に行います。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 料金目安 */}
      <section className="lp-pricing">
        <div className="container">
          <h2 className="lp-section-title">料金目安</h2>
          <p className="lp-section-lead">
            導入規模や配信頻度によって変動します。まずはお気軽にご相談ください。
          </p>
          <div className="pricing-table">
            <div className="pricing-item">
              <h3 className="pricing-name">CRM導入支援</h3>
              <p className="pricing-price">20万円〜</p>
              <p className="pricing-note">設計・構築・研修込み</p>
            </div>
            <div className="pricing-item">
              <h3 className="pricing-name">メルマガ配信代行</h3>
              <p className="pricing-price">月額5万円〜</p>
              <p className="pricing-note">月4回配信の場合</p>
            </div>
            <div className="pricing-item">
              <h3 className="pricing-name">LINE配信代行</h3>
              <p className="pricing-price">月額5万円〜</p>
              <p className="pricing-note">月4回配信の場合</p>
            </div>
            <div className="pricing-item">
              <h3 className="pricing-name">名刺データ化</h3>
              <p className="pricing-price">50円〜/枚</p>
              <p className="pricing-note">枚数によりボリュームディスカウント</p>
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
              <h3 className="lp-faq-question">どのCRMツールを使いますか？</h3>
              <p className="lp-faq-answer">
                主にHubSpotをお勧めしていますが、御社の規模や予算、既存ツールとの連携要件に応じて最適なツールをご提案します。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">既存のエクセルデータは移行できますか？</h3>
              <p className="lp-faq-answer">
                はい、可能です。既存のエクセルやCSVデータを整理・クレンジングした上で、CRMに取り込みます。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">社員がITに詳しくなくても使えますか？</h3>
              <p className="lp-faq-answer">
                はい、操作研修とマニュアル作成を行いますので、ITに詳しくない方でも安心してご利用いただけます。導入後のサポートも継続します。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">少人数の会社でも導入メリットはありますか？</h3>
              <p className="lp-faq-answer">
                むしろ少人数だからこそ、一人ひとりの業務効率化の効果が大きく出ます。「忙しくてフォローが後回しになる」という課題を解消できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="container">
          <div className="lp-cta-content">
            <h2 className="lp-cta-title">まずは無料でご相談ください</h2>
            <p className="lp-cta-text">
              「名刺をデータ化したい」「顧客管理を効率化したい」など、<br />
              お気軽にご相談ください。御社に最適な導入プランをご提案します。
            </p>
            <div className="lp-cta-buttons">
              <Link href="/contact" className="btn btn-primary btn-large">無料相談を申し込む</Link>
              <Link href="/service" className="btn btn-outline-white btn-large">サービス一覧に戻る</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
