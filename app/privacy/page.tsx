import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import './Privacy.css'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    '株式会社EMPLAYのプライバシーポリシーです。当社が取得する個人情報の利用目的、管理方法、お問い合わせ窓口についてご案内します。',
  alternates: {
    canonical: 'https://emplay.jp/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      {/* ページヘッダー */}
      <section className="privacy-header">
        <div className="container">
          <h1 className="privacy-title">プライバシーポリシー</h1>
          <p className="privacy-subtitle">PRIVACY POLICY</p>
        </div>
      </section>

      {/* パンくずリスト */}
      <Breadcrumb items={[{ label: 'プライバシーポリシー' }]} />

      <section className="section privacy-content">
        <div className="container">
          <p className="privacy-lead">
            株式会社EMPLAY（以下「当社」といいます）は、当社が提供するサービスおよび当社ウェブサイト（https://emplay.jp）における、
            ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
          </p>

          <div className="privacy-section">
            <h2>1. 事業者情報</h2>
            <p>
              名称：株式会社EMPLAY<br />
              所在地：〒150-0001 東京都渋谷区神宮前6丁目23番4号 桑野ビル2階
            </p>
          </div>

          <div className="privacy-section">
            <h2>2. 取得する個人情報</h2>
            <p>当社は、以下の情報を取得することがあります。</p>
            <ul>
              <li>氏名</li>
              <li>会社名・所属</li>
              <li>メールアドレス</li>
              <li>電話番号</li>
              <li>お問い合わせ・ご応募の内容</li>
              <li>Cookie等により自動的に収集されるアクセス情報（閲覧ページ、ブラウザ種別、IPアドレス等）</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>3. 個人情報の利用目的</h2>
            <p>当社は、取得した個人情報を以下の目的で利用します。</p>
            <ul>
              <li>お問い合わせへの対応・ご連絡のため</li>
              <li>サービスのご提案、お見積りのご提示のため</li>
              <li>採用選考および応募者へのご連絡のため</li>
              <li>サービスの品質向上、ウェブサイトの改善のため</li>
              <li>法令に基づく対応のため</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>4. 個人情報の第三者提供</h2>
            <p>
              当社は、次に掲げる場合を除き、あらかじめご本人の同意を得ることなく、個人情報を第三者に提供しません。
            </p>
            <ul>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが困難であるとき</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>5. 個人情報の取り扱いの委託</h2>
            <p>
              当社は、利用目的の達成に必要な範囲内において、個人情報の取り扱いの全部または一部を委託する場合があります。
              この場合、委託先について適切な監督を行います。なお、当社はフォーム送信データの保管に外部クラウドサービス（Supabase）を利用しています。
            </p>
          </div>

          <div className="privacy-section">
            <h2>6. アクセス解析ツールについて</h2>
            <p>
              当社ウェブサイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
              Googleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
              このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              Cookieを無効にすることで収集を拒否できますので、お使いのブラウザの設定をご確認ください。
              詳しくは
              <a
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Googleアナリティクス利用規約
              </a>
              をご確認ください。
            </p>
          </div>

          <div className="privacy-section">
            <h2>7. 個人情報の安全管理</h2>
            <p>
              当社は、個人情報の漏えい、滅失または毀損の防止その他個人情報の安全管理のために、
              必要かつ適切な措置を講じます。
            </p>
          </div>

          <div className="privacy-section">
            <h2>8. 個人情報の開示・訂正・削除</h2>
            <p>
              ご本人から個人情報の開示、訂正、追加、削除、利用停止のご要望があった場合には、
              ご本人であることを確認のうえ、法令に従い速やかに対応します。
            </p>
          </div>

          <div className="privacy-section">
            <h2>9. プライバシーポリシーの変更</h2>
            <p>
              本ポリシーの内容は、法令の改正その他必要に応じて、ユーザーに通知することなく変更することがあります。
              変更後のプライバシーポリシーは、当社ウェブサイトに掲載したときから効力を生じるものとします。
            </p>
          </div>

          <div className="privacy-section">
            <h2>10. お問い合わせ窓口</h2>
            <p>
              本ポリシーに関するお問い合わせは、
              <Link href="/contact">お問い合わせフォーム</Link>
              よりお願いいたします。
            </p>
          </div>

          <p className="privacy-date">制定日：2026年7月3日</p>
        </div>
      </section>
    </div>
  )
}
