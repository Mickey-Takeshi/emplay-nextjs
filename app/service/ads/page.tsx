import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import ServiceRelatedPosts from '@/components/ServiceRelatedPosts'
import FaqJsonLd from '@/components/FaqJsonLd'
import ServiceJsonLd from '@/components/ServiceJsonLd'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import '../ServiceDetail.css'

// issue #5: サービスページからブログへの導線。記事を読んだうえで、このページの判断を助けるものを選んでいる。
const RELATED_POSTS = [
  { slug: 'chatgpt-ads-guide', anchor: 'ChatGPT広告の仕組み・料金・日本での出稿手順', relation: '会話の文脈を使う広告の特徴と、自社で出稿する際の準備が分かる' },
  { slug: 'ad-management-outsourcing-cost', anchor: '広告運用代行の費用相場｜手数料20%に何が含まれるか', relation: '本ページの料金体系を、他社相場と比べて妥当か検証できる' },
  { slug: 'listing-ads-inhouse-vs-agency', anchor: 'リスティング広告は自社運用か代行か、判断基準を比較', relation: 'そもそも外注すべきかを、予算と社内工数から判断できる' },
  { slug: 'web-ads-budget-planning', anchor: '売上目標から逆算するWeb広告の予算の決め方と配分例', relation: '相談前に、いくら広告費を用意すべきか自社で試算できる' },
  { slug: 'web-ads-types-comparison', anchor: '目的・予算別に見るWeb広告の種類と媒体の選び方', relation: 'どの媒体に出すかの提案を、根拠込みで理解できるようになる' },
  { slug: 'roas-improvement-strategies', anchor: '費用対効果が合わないときのROAS診断と改善手順', relation: '今の運用の費用対効果が悪い原因を、依頼前に切り分けられる' },
]

const RELATED_CATEGORIES = [
  { path: '/blog/category/marketing', label: 'マーケティングの記事一覧' },
  { path: '/blog/category/data-analytics', label: 'データ分析の記事一覧' },
]


export const metadata: Metadata = {
  title: 'Web広告運用代行｜ChatGPT・Google・Meta広告に対応',
  description: 'ChatGPT、Google、Meta、LINEなどのWeb広告運用を支援。商材、目的、予算、計測環境を確認し、必要な運用内容を個別にご提案します。',
  alternates: { canonical: '/service/ads' },
  openGraph: {
    title: 'Web広告運用代行｜ChatGPT広告対応 | 株式会社EMPLAY',
    description: 'ChatGPT、Google、Meta、LINEなどのWeb広告運用を支援。商材、目的、予算、計測環境を確認し、必要な運用内容を個別にご提案します。',
    url: '/service/ads',
  },
}


// FAQ構造化データ用(表示中のFAQと一致させること)
const faqs = [
  {
    q: '最低契約期間はありますか？',
    a: '3ヶ月からのご契約をお願いしています。広告運用は効果測定と改善を繰り返すことで成果が出るため、一定期間の継続が必要です。',
  },
  {
    q: '少額の予算でも対応してもらえますか？',
    a: '月額広告費10万円程度から対応可能です。予算に応じて、最も効果が見込める媒体に集中投下する戦略をご提案します。',
  },
  {
    q: '広告アカウントは誰のものになりますか？',
    a: '御社名義のアカウントを作成するため、契約終了後もアカウントは御社のものとしてお使いいただけます。',
  },
  {
    q: 'ChatGPT広告は日本から出稿できますか？',
    a: '2026年9月8日時点で、日本に所在し、請求を受ける法人はOpenAI Ads Managerのセルフサービスを利用できます。ただし、アカウント認証と広告審査があり、業種や広告内容によって掲載できない場合があります。',
  },
  {
    q: 'ChatGPT広告だけでも依頼できますか？',
    a: 'ChatGPT広告単体の出稿・運用についてもご相談いただけます。商材、予算、ランディングページ、計測環境を確認し、対応可否、支援範囲、費用をご案内します。',
  },
  {
    q: '他社で運用中のアカウントを引き継げますか？',
    a: 'はい、可能です。現状の広告パフォーマンスを分析した上で、改善提案を行いながら運用を引き継ぎます。',
  },
]

export default function ServiceAdsPage() {
  return (
    <main className="service-lp service-lp--ads">
      <ServiceJsonLd
        name="Web広告運用代行"
        description="ChatGPT、Google、Yahoo!、Meta、LINE、TikTokなどのWeb広告を、戦略設計から運用・効果測定まで支援します。"
        url="https://emplay.jp/service/ads"
        serviceType="Web広告運用代行"
      />
      <FaqJsonLd faqs={faqs} />
      {/* パンくずリスト */}
      <Breadcrumb items={[
        { label: 'SERVICE', path: '/service' },
        { label: 'Web広告運用代行' }
      ]} />

      {/* ヒーローセクション */}
      <section className="lp-hero">
        <div className="page-header-bg"></div>
        <div className="lp-hero-content">
          <span className="lp-hero-label">WEB ADVERTISING</span>
          <h1 className="lp-hero-title">
            「届けたい人」に届ける。<br />
            成果にこだわるWeb広告運用
          </h1>
          <p className="lp-hero-text">
            ChatGPT、Google、Yahoo!、Meta、LINE、TikTokなど主要Web広告を一括運用。<br />
            戦略設計から日々の最適化、効果測定まで、広告運用のすべてをお任せください。
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
              <p>Web広告を出したいが、何から始めればいいか分からない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>自社で運用しているが、成果が出ない・改善方法が分からない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>広告代理店に任せているが、レポートの見方が分からない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>どの媒体に出せばいいか判断できない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>広告費をかけているが、費用対効果が合わない</p>
            </div>
            <div className="problem-item">
              <span className="problem-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </span>
              <p>広告の効果を正しく測定できていない</p>
            </div>
          </div>
        </div>
      </section>

      {/* 解決策セクション */}
      <section className="lp-solution">
        <div className="container">
          <h2 className="lp-section-title">EMPLAYなら、その悩みを解決できます</h2>
          <p className="lp-section-lead">
            広告の「設定」だけでなく、<br />
            <strong>「成果を出す」ための運用</strong>にこだわります。
          </p>
          <div className="solution-points">
            <div className="solution-point">
              <span className="solution-point-num">01</span>
              <h3 className="solution-point-title">御社に最適な媒体を選定</h3>
              <p className="solution-point-text">
                商品・サービスの特性、ターゲット、予算に応じて、最も効果が見込める広告媒体をご提案。「とりあえず全部出す」ではなく、限られた予算で最大の成果を目指します。
              </p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">02</span>
              <h3 className="solution-point-title">日々の細やかな運用調整</h3>
              <p className="solution-point-text">
                「出して終わり」ではありません。入札単価の調整、ターゲティングの改善、広告文の改善など、日々の細かな運用で成果を最大化します。
              </p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">03</span>
              <h3 className="solution-point-title">分かりやすいレポーティング</h3>
              <p className="solution-point-text">
                専門用語だらけのレポートではなく、「何がうまくいって、何を改善すべきか」が分かるレポートをお届け。ビジネスの意思決定に活用できる情報を提供します。
              </p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">04</span>
              <h3 className="solution-point-title">LP制作との連携</h3>
              <p className="solution-point-text">
                広告の誘導先となるLP（ランディングページ）の制作・改善も一括対応。広告とLPを連携させることで、コンバージョン率を向上させます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 取り扱い媒体 */}
      <section className="lp-services">
        <div className="container">
          <h2 className="lp-section-title">取り扱い広告媒体</h2>
          <div className="lp-media-grid">
            <div className="lp-media-card lp-media-card--featured">
              <h3 className="lp-media-name">ChatGPT広告</h3>
              <p className="lp-media-desc">
                ChatGPTで情報を比較・検討している利用者へ、会話の文脈に関連する広告を回答とは別の枠で表示します。出稿可否の確認から配信設計、計測、改善までご相談いただけます。
              </p>
              <ul className="lp-media-types">
                <li>CPM・CPC・oCPC配信</li>
                <li>コンテキストヒント設計</li>
                <li><a href="#chatgpt-ads">運用内容を見る</a></li>
              </ul>
            </div>
            <div className="lp-media-card">
              <h3 className="lp-media-name">Google広告</h3>
              <p className="lp-media-desc">
                世界最大の検索エンジンに広告を配信。「今まさに探している人」にアプローチできるため、購買意欲の高いユーザーを獲得できます。
              </p>
              <ul className="lp-media-types">
                <li>検索広告</li>
                <li>ディスプレイ広告</li>
                <li>YouTube広告</li>
                <li>ショッピング広告</li>
              </ul>
            </div>
            <div className="lp-media-card">
              <h3 className="lp-media-name">Yahoo!広告</h3>
              <p className="lp-media-desc">
                国内第2位のシェアを持つ検索エンジンとYahoo!ニュースなどへ広告を配信。40代以上のユーザーが多く、幅広い年代にリーチしたい場合に有効です。
              </p>
              <ul className="lp-media-types">
                <li>検索広告</li>
                <li>ディスプレイ広告</li>
              </ul>
            </div>
            <div className="lp-media-card">
              <h3 className="lp-media-name">Meta広告</h3>
              <p className="lp-media-desc">
                Facebook/Instagramへ詳細なターゲティングで配信。ビジュアルで訴求する商材、BtoC向けサービス、ブランディングに効果を発揮します。
              </p>
              <ul className="lp-media-types">
                <li>フィード広告</li>
                <li>ストーリーズ広告</li>
                <li>リール広告</li>
              </ul>
            </div>
            <div className="lp-media-card">
              <h3 className="lp-media-name">LINE広告</h3>
              <p className="lp-media-desc">
                国内9,000万人以上が利用するLINEに広告を配信。幅広い年代・属性にリーチでき、店舗集客やECサイトに適しています。
              </p>
              <ul className="lp-media-types">
                <li>タイムライン広告</li>
                <li>LINEニュース面</li>
              </ul>
            </div>
            <div className="lp-media-card">
              <h3 className="lp-media-name">TikTok広告</h3>
              <p className="lp-media-desc">
                若年層を中心に急成長中の動画プラットフォーム。短尺動画で商品の魅力を伝え、認知拡大やバズを狙うキャンペーンに最適です。
              </p>
              <ul className="lp-media-types">
                <li>インフィード広告</li>
                <li>TopView広告</li>
              </ul>
            </div>
            <div className="lp-media-card">
              <h3 className="lp-media-name">DSP広告</h3>
              <p className="lp-media-desc">
                複数のWebサイトやアプリに横断して広告を配信。リターゲティングや認知拡大に効果的です。
              </p>
              <ul className="lp-media-types">
                <li>リターゲティング</li>
                <li>オーディエンスターゲティング</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-solution lp-chatgpt-ads" id="chatgpt-ads">
        <div className="container">
          <h2 className="lp-section-title">ChatGPT広告の運用代行</h2>
          <p className="lp-section-lead">
            検索語だけではなく、利用者が会話で示す目的や検討条件を踏まえて広告を設計します。<br />
            広告はChatGPTの回答と分離され、出稿によって回答内の推奨を購入するものではありません。
          </p>
          <div className="solution-points">
            <div className="solution-point">
              <span className="solution-point-num">01</span>
              <h3 className="solution-point-title">掲載可否を事前確認</h3>
              <p className="solution-point-text">商材、訴求、ランディングページを確認し、OpenAIの広告ポリシーと審査要件に沿って準備します。</p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">02</span>
              <h3 className="solution-point-title">会話文脈から配信設計</h3>
              <p className="solution-point-text">商品が役立つ利用場面ごとに広告グループとコンテキストヒントを整理し、広告文・画像・LPの訴求をそろえます。</p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">03</span>
              <h3 className="solution-point-title">成果計測を準備</h3>
              <p className="solution-point-text">UTM、OpenAI Pixelなどを使い、クリック後の問い合わせや購入まで確認できる計測環境を設計します。</p>
            </div>
            <div className="solution-point">
              <span className="solution-point-num">04</span>
              <h3 className="solution-point-title">配信後も継続改善</h3>
              <p className="solution-point-text">表示、クリック、コンバージョン、商談・売上の順に課題を切り分け、予算、訴求、LPを改善します。</p>
            </div>
          </div>
          <p className="lp-chatgpt-ads-note">Conversions API、広告画像、LPの制作・改善は、必要な範囲を確認して別途お見積りします。</p>
          <div className="lp-chatgpt-ads-actions">
            <Link href="/contact" className="btn btn-primary btn-large">ChatGPT広告について無料相談する</Link>
            <Link href="/blog/chatgpt-ads-guide" className="btn btn-outline-white btn-large">仕組みと出稿手順を確認する</Link>
          </div>
        </div>
      </section>

      {/* 運用内容 */}
      <section className="lp-operation">
        <div className="container">
          <h2 className="lp-section-title">運用代行の内容</h2>
          <div className="lp-operation-grid">
            <div className="lp-operation-item">
              <div className="lp-operation-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 12h6M9 16h6" />
                </svg>
              </div>
              <h3 className="lp-operation-title">戦略設計</h3>
              <p className="lp-operation-text">御社の商品・サービス、ターゲット、予算に応じて、最適な媒体と配信戦略を設計します。</p>
            </div>
            <div className="lp-operation-item">
              <div className="lp-operation-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <h3 className="lp-operation-title">広告制作・入稿</h3>
              <p className="lp-operation-text">広告文の作成、バナーや動画の制作、各媒体への入稿作業を行います。</p>
            </div>
            <div className="lp-operation-item">
              <div className="lp-operation-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <h3 className="lp-operation-title">日次運用・最適化</h3>
              <p className="lp-operation-text">予算配分の調整、入札単価の最適化、ターゲティングの改善など、日々の細かな調整で成果を最大化します。</p>
            </div>
            <div className="lp-operation-item">
              <div className="lp-operation-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 20V10M12 20V4M6 20v-6" />
                </svg>
              </div>
              <h3 className="lp-operation-title">効果測定・分析</h3>
              <p className="lp-operation-text">クリック数、コンバージョン数、費用対効果などを継続的に分析。データに基づいた改善を行います。</p>
            </div>
            <div className="lp-operation-item">
              <div className="lp-operation-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              </div>
              <h3 className="lp-operation-title">レポーティング</h3>
              <p className="lp-operation-text">成果を分かりやすくまとめた月次レポートをご提出。改善施策のご提案も合わせて行います。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 料金目安 */}
      <section className="lp-pricing" id="pricing">
        <div className="container">
          <h2 className="lp-section-title">料金体系</h2>
          <p className="lp-section-lead">
            広告運用代行費は、月額広告費の20%を目安としています。
          </p>
          <div className="pricing-table">
            <div className="pricing-item">
              <h3 className="pricing-name">初期設定費</h3>
              <p className="pricing-price">5万円〜</p>
              <p className="pricing-note">アカウント構築、タグ設置など</p>
            </div>
            <div className="pricing-item">
              <h3 className="pricing-name">運用代行費</h3>
              <p className="pricing-price">広告費の20%</p>
              <p className="pricing-note">最低月額5万円〜</p>
            </div>
            <div className="pricing-item">
              <h3 className="pricing-name">バナー制作</h3>
              <p className="pricing-price">5,000円〜/枚</p>
              <p className="pricing-note">運用と合わせてご依頼の場合</p>
            </div>
            <div className="pricing-item">
              <h3 className="pricing-name">LP制作</h3>
              <p className="pricing-price">15万円〜</p>
              <p className="pricing-note">広告との連携設計込み</p>
            </div>
          </div>
          <p className="pricing-note">ChatGPT広告も上記を基準とし、アカウント状況と計測・制作範囲を確認して個別にお見積りします。</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-faq">
        <div className="container">
          <h2 className="lp-section-title">よくあるご質問</h2>
          <div className="lp-faq-list">
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">最低契約期間はありますか？</h3>
              <p className="lp-faq-answer">
                3ヶ月からのご契約をお願いしています。広告運用は効果測定と改善を繰り返すことで成果が出るため、一定期間の継続が必要です。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">少額の予算でも対応してもらえますか？</h3>
              <p className="lp-faq-answer">
                月額広告費10万円程度から対応可能です。予算に応じて、最も効果が見込める媒体に集中投下する戦略をご提案します。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">広告アカウントは誰のものになりますか？</h3>
              <p className="lp-faq-answer">
                御社名義のアカウントを作成するため、契約終了後もアカウントは御社のものとしてお使いいただけます。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">ChatGPT広告は日本から出稿できますか？</h3>
              <p className="lp-faq-answer">
                2026年9月8日時点で、日本に所在し、請求を受ける法人はOpenAI Ads Managerのセルフサービスを利用できます。ただし、アカウント認証と広告審査があり、業種や広告内容によって掲載できない場合があります。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">ChatGPT広告だけでも依頼できますか？</h3>
              <p className="lp-faq-answer">
                ChatGPT広告単体の出稿・運用についてもご相談いただけます。商材、予算、ランディングページ、計測環境を確認し、対応可否、支援範囲、費用をご案内します。
              </p>
            </div>
            <div className="lp-faq-item">
              <h3 className="lp-faq-question">他社で運用中のアカウントを引き継げますか？</h3>
              <p className="lp-faq-answer">
                はい、可能です。現状の広告パフォーマンスを分析した上で、改善提案を行いながら運用を引き継ぎます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <ServiceRelatedPosts lead="手数料の相場、自社運用との比較、広告費の決め方など、依頼を決める前の判断材料です。" posts={RELATED_POSTS} categories={RELATED_CATEGORIES} />

      <section className="lp-cta">
        <div className="container">
          <div className="lp-cta-content">
            <h2 className="lp-cta-title">まずは無料でご相談ください</h2>
            <p className="lp-cta-text">
              「どの媒体がいいか分からない」「今の運用に不満がある」など、<br />
              お気軽にご相談ください。現状分析と改善提案は無料です。
            </p>
            <div className="lp-cta-buttons">
              <Link href="/contact" className="btn btn-primary btn-large">無料相談を申し込む</Link>
              <Link href="/service" className="btn btn-outline-white btn-large">サービス一覧に戻る</Link>
            </div>
          </div>
        </div>
      </section>
      <StickyMobileCTA location="service_ads" />
    </main>
  )
}
