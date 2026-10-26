import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import FaqJsonLd, { type FaqEntry } from '@/components/FaqJsonLd'
import ServiceJsonLd from '@/components/ServiceJsonLd'
import ServiceRelatedPosts, { type RelatedPost } from '@/components/ServiceRelatedPosts'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import TrackedLink from '@/components/TrackedLink'
import {
  buildContextHref,
  inquiryEventParams,
  type InquiryContext,
  type LandingVariant,
} from '@/lib/inquiry-context'
import './RenewalLanding.css'

type LandingKind = 'hp' | 'wordpress'

interface VariantCopy {
  title: string
  lead: string
}

interface RenewalLandingProps {
  kind: LandingKind
  context: InquiryContext
}

const HP_VARIANTS: Partial<Record<LandingVariant, VariantCopy>> = {
  partner: {
    title: 'ホームページ刷新を、成果まで伴走',
    lead: '戦略設計から公開後の改善まで、事業と社内体制に合わせて一貫して支援します。',
  },
  legacy: {
    title: '古い企業サイトを、更新しやすく使えるサイトへ',
    lead: '構成・デザイン・更新体制を整理し、顧客にも社内にも使いやすい企業サイトへ刷新します。',
  },
  conversion: {
    title: '問い合わせにつながる企業サイトへ',
    lead: '情報設計と導線を見直し、訪問者がサービスを理解して相談まで進めるホームページを制作します。',
  },
}

const WORDPRESS_VARIANTS: Partial<Record<LandingVariant, VariantCopy>> = {
  security: {
    title: 'WordPressの不安を、刷新の機会に',
    lead: '更新状況・構成・保守体制を確認し、改修と再構築のどちらが適切かを整理します。',
  },
  maintenance: {
    title: '放置したWordPressを見直す',
    lead: '更新状況の確認から、保守・改修・再構築まで、現在の状態に合った進め方をご提案します。',
  },
}

const HP_FAQS: FaqEntry[] = [
  {
    q: 'どの段階から相談できますか？',
    a: 'リニューアルするか決まっていない段階でもご相談いただけます。現状、目的、更新体制を確認し、優先順位から整理します。',
  },
  {
    q: '現在のURLや検索評価を引き継げますか？',
    a: '既存URL、検索流入、計測環境を確認し、必要なリダイレクトやcanonical、サイトマップを含めて移行設計を行います。',
  },
  {
    q: '公開後の更新や改善も依頼できますか？',
    a: '可能です。社内更新を前提とした構成にも、コンテンツ作成や効果測定を継続支援する形にも対応します。',
  },
  {
    q: '費用はどのように決まりますか？',
    a: 'ページ数、原稿や撮影の有無、機能、移行範囲によって変わります。現状を確認したうえで、必要な項目を分けてお見積りします。',
  },
]

const WORDPRESS_FAQS: FaqEntry[] = [
  {
    q: 'WordPressを使い続けるか、別の構成にするかも相談できますか？',
    a: '可能です。更新頻度、必要な機能、社内の運用体制、現在の構成を確認し、WordPressの継続利用と再構築を比較します。',
  },
  {
    q: '保守運用プランには何が含まれますか？',
    a: 'CMS更新、不具合・障害対応、セキュリティ・脆弱性対応、稼働監視などを契約範囲に応じて行います。緊急時の駆除・復旧と継続監視も保守運用プラン契約時の対応範囲です。詳細条件は事前にご案内します。',
  },
  {
    q: 'すでに不具合や改ざんが発生している場合も相談できますか？',
    a: 'まず状況を確認し、対応可否と優先順位をご案内します。緊急対応の受付条件や作業範囲は、サイトの状態と保守運用プランの契約内容によって異なります。',
  },
  {
    q: '制作会社や管理者が分からない状態でも進められますか？',
    a: '分かる範囲の情報から整理できます。ドメイン、サーバ、管理画面、バックアップなど、確認が必要な項目を一覧にして進めます。',
  },
]

const HP_RELATED_POSTS: RelatedPost[] = [
  { slug: 'website-development-cost-guide', anchor: 'ホームページ制作費用の相場と見積書の読み方', relation: '予算と制作範囲を整理する' },
  { slug: 'web-production-company-selection', anchor: '失敗しないホームページ制作会社の選び方', relation: '依頼先を比較する基準を確認する' },
  { slug: 'website-renewal-seo-migration', anchor: 'リニューアルでSEO順位を落とさない移行手順', relation: '公開前後に必要なSEO対応を確認する' },
]

const WORDPRESS_RELATED_POSTS: RelatedPost[] = [
  { slug: 'wordpress-security-hardening', anchor: 'WordPressのセキュリティ対策', relation: '更新・権限・バックアップの確認点を整理する' },
  { slug: 'website-maintenance-cost-guide', anchor: 'ホームページ保守費用と対応範囲', relation: '保守契約で確認すべき項目を比べる' },
  { slug: 'website-renewal-seo-migration', anchor: 'リニューアルでSEO順位を落とさない移行手順', relation: '再構築時のURL移行を確認する' },
]

const HP_PROBLEMS = [
  '会社やサービスの現在の姿と、サイトの内容が合っていない',
  'スマートフォンで読みにくく、必要な情報へたどり着きにくい',
  '問い合わせへの導線が弱く、アクセスを商談へつなげられない',
  '更新方法や担当者が決まらず、公開後に情報が古くなる',
]

const WORDPRESS_PROBLEMS = [
  'WordPress本体やプラグインを長期間更新していない',
  '管理者、制作会社、サーバの契約状況を把握できていない',
  'バックアップの取得状況や、復旧方法が分からない',
  '不具合が増え、改修を続けるべきか再構築すべきか判断できない',
]

const HP_SUPPORT = [
  { number: '01', title: '現状と目的の整理', text: 'アクセス、掲載情報、競合、社内体制を確認し、刷新の目的と優先順位をそろえます。' },
  { number: '02', title: '情報・問い合わせ導線の設計', text: '訪問者が比較・判断しやすい構成と、相談まで迷わないCTA・フォームを設計します。' },
  { number: '03', title: 'デザイン・実装・移行', text: '企業としての信頼感、表示速度、スマートフォン対応、SEO/AIOを含めて制作します。' },
  { number: '04', title: '公開後の更新・改善', text: '計測結果を確認し、更新体制やコンテンツ、導線を継続的に改善できる状態を作ります。' },
]

const WORDPRESS_SUPPORT = [
  { number: '01', title: '管理・更新状況の確認', text: 'WordPress、プラグイン、テーマ、サーバ、ドメイン、バックアップの状態を確認します。' },
  { number: '02', title: '改修と再構築を比較', text: '現在の構成を生かす場合と作り直す場合の費用、期間、運用負担を整理します。' },
  { number: '03', title: '移行と公開', text: '必要なデータ、URL、計測設定を引き継ぎ、公開前後の確認まで一貫して進めます。' },
  { number: '04', title: '保守運用を設計', text: '更新、監視、バックアップ、不具合・緊急対応の範囲と連絡方法を契約前に明確にします。' },
]

export default function RenewalLanding({ kind, context }: RenewalLandingProps) {
  const isWordPress = kind === 'wordpress'
  const variantCopy = context.landingVariant
    ? (isWordPress ? WORDPRESS_VARIANTS : HP_VARIANTS)[context.landingVariant]
    : undefined
  const fallbackCopy: VariantCopy = isWordPress
    ? {
        title: 'WordPressサイトの見直し・リニューアル',
        lead: 'サイトの状態と運用体制を整理し、改修・再構築・保守の適切な進め方をご提案します。',
      }
    : {
        title: '企業サイトのリニューアル相談',
        lead: '構成・デザイン・更新体制・問い合わせ導線を整理し、事業に使えるホームページへ刷新します。',
      }
  const copy = variantCopy ?? fallbackCopy
  const contactHref = buildContextHref('/contact', context)
  const pricingHref = buildContextHref('/service/hp', context, 'pricing')
  const eventParams = inquiryEventParams(context)
  const faqs = isWordPress ? WORDPRESS_FAQS : HP_FAQS
  const problems = isWordPress ? WORDPRESS_PROBLEMS : HP_PROBLEMS
  const support = isWordPress ? WORDPRESS_SUPPORT : HP_SUPPORT
  const relatedPosts = isWordPress ? WORDPRESS_RELATED_POSTS : HP_RELATED_POSTS
  const pageTitle = isWordPress ? 'WordPressサイトの見直し' : 'ホームページリニューアル'
  const canonical = isWordPress
    ? 'https://emplay.jp/service/hp/wordpress-renewal'
    : 'https://emplay.jp/service/hp/renewal'
  const ctaLabel = isWordPress ? 'WordPressの見直しを相談する' : 'HPリニューアルを相談する'

  return (
    <main className={`ad-landing ${isWordPress ? 'ad-landing--wordpress' : 'ad-landing--hp'}`}>
      <ServiceJsonLd
        name={pageTitle}
        description={copy.lead}
        url={canonical}
        serviceType={isWordPress ? 'WordPressサイト改修・再構築・保守運用' : 'ホームページリニューアル'}
      />
      <FaqJsonLd faqs={faqs} />

      <header className="ad-landing-hero">
        <div className="ad-landing-hero-art" aria-hidden="true" />
        <div className="ad-landing-hero-overlay" aria-hidden="true" />
        <div className="ad-landing-hero-inner">
          <p className="ad-landing-eyebrow">{isWordPress ? 'WORDPRESS RENEWAL' : 'WEBSITE RENEWAL'}</p>
          <h1>{copy.title}</h1>
          <p className="ad-landing-hero-lead">{copy.lead}</p>
          <ul className="ad-landing-hero-points" aria-label="主な支援内容">
            {(isWordPress
              ? ['現状と更新状況を確認', '改修・再構築を比較', '保守運用プランもご案内']
              : ['構成と導線を再設計', 'SEO・AI検索対策に対応', '公開後の改善まで伴走']
            ).map((point) => <li key={point}>{point}</li>)}
          </ul>
          <div className="ad-landing-hero-actions">
            <TrackedLink
              href={contactHref}
              className="btn btn-cta btn-large"
              eventParams={{ ...eventParams, cta_location: 'landing_hero', cta_type: 'contact' }}
            >
              {ctaLabel}
            </TrackedLink>
            <TrackedLink
              href={pricingHref}
              className="btn btn-outline btn-large"
              eventParams={{ ...eventParams, cta_location: 'landing_hero', cta_type: 'pricing' }}
            >
              料金と支援内容を見る
            </TrackedLink>
          </div>
          <p className="ad-landing-hero-note">初回相談無料・通常1営業日以内にご返信します</p>
        </div>
      </header>

      <Breadcrumb items={[
        { label: 'SERVICE', path: '/service' },
        { label: 'HP制作サービス', path: '/service/hp' },
        { label: pageTitle },
      ]} />

      <section className="ad-landing-check" aria-labelledby="ad-landing-check-heading">
        <div className="container">
          <p className="ad-landing-section-label">CHECK</p>
          <h2 id="ad-landing-check-heading">
            {isWordPress ? 'この状態を、そのままにしていませんか？' : 'リニューアルを考えるサイン'}
          </h2>
          <p className="ad-landing-section-lead">
            {isWordPress
              ? '不安があっても、すぐに作り直す必要があるとは限りません。まず管理状況と事業への影響を確認し、優先順位を付けます。'
              : '見た目だけを変えるのではなく、事業・顧客・運用の変化にサイトが追いついているかを確認します。'}
          </p>
          <ul className="ad-landing-check-grid">
            {problems.map((problem, index) => (
              <li key={problem}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <p>{problem}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ad-landing-support" aria-labelledby="ad-landing-support-heading">
        <div className="container">
          <p className="ad-landing-section-label">SUPPORT</p>
          <h2 id="ad-landing-support-heading">
            {isWordPress ? '現状確認から、再構築・保守まで整理します' : '成果につながるサイトへ、必要な範囲を再設計'}
          </h2>
          <p className="ad-landing-section-lead">
            制作すること自体を目的にせず、相談前後の情報、社内での更新、公開後の改善まで一つの流れとして設計します。
          </p>
          <ol className="ad-landing-support-grid">
            {support.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {isWordPress && (
        <section className="ad-landing-maintenance" aria-labelledby="ad-landing-maintenance-heading">
          <div className="container">
            <div className="ad-landing-maintenance-heading">
              <div>
                <p className="ad-landing-section-label">MAINTENANCE</p>
                <h2 id="ad-landing-maintenance-heading">保守運用プラン契約時の対応</h2>
              </div>
              <p>制作・再構築だけの場合と保守運用プランの範囲を分け、契約前に対象と連絡方法を明確にします。</p>
            </div>
            <div className="ad-landing-scope-table" role="table" aria-label="保守運用プランの対応範囲">
              <div role="row" className="ad-landing-scope-head">
                <span role="columnheader">項目</span>
                <span role="columnheader">対応内容</span>
              </div>
              {[
                ['システム・CMS更新', 'WordPress本体、テーマ、プラグインの更新と表示確認'],
                ['不具合・障害対応', '原因調査、復旧作業、対応内容のご報告'],
                ['緊急時の対応', '影響範囲の特定、拡大防止、必要な駆除・復旧'],
                ['セキュリティ対応', '脆弱性情報の確認、点検、必要な対応'],
                ['継続監視', '稼働状況と運用環境の継続的な確認'],
              ].map(([title, text]) => (
                <div role="row" key={title}>
                  <strong role="cell">{title}</strong>
                  <span role="cell">{text}</span>
                </div>
              ))}
            </div>
            <p className="ad-landing-scope-note">
              監視の粒度、緊急対応の受付条件、作業範囲はサイトの状態に応じて契約前に確定します。
            </p>
          </div>
        </section>
      )}

      <section className="ad-landing-mid-cta" aria-labelledby="ad-landing-mid-cta-heading">
        <div className="container ad-landing-mid-cta-inner">
          <div>
            <p className="ad-landing-section-label">CONSULTATION</p>
            <h2 id="ad-landing-mid-cta-heading">まず、現在の状態と優先順位を整理します</h2>
            <p>依頼内容が決まっていなくても問題ありません。分かる範囲の情報から、次に確認することをご案内します。</p>
          </div>
          <TrackedLink
            href={contactHref}
            className="btn btn-cta btn-large"
            eventParams={{ ...eventParams, cta_location: 'landing_middle', cta_type: 'contact' }}
          >
            {ctaLabel}
          </TrackedLink>
        </div>
      </section>

      <section className="ad-landing-process" aria-labelledby="ad-landing-process-heading">
        <div className="container">
          <div className="ad-landing-process-intro">
            <div>
              <p className="ad-landing-section-label">PROCESS</p>
              <h2 id="ad-landing-process-heading">ご相談から公開・運用まで</h2>
              <p className="ad-landing-section-lead">判断に必要な情報と次の作業を、段階ごとに共有しながら進めます。</p>
            </div>
            <img
              src="/images/renewal/process-tall.webp"
              srcSet="/images/renewal/process-tall-sm.webp 960w, /images/renewal/process-tall.webp 1536w"
              sizes="(max-width: 760px) 100vw, 42vw"
              alt="課題整理から制作、公開後の改善までの進行イメージ"
              loading="lazy"
              width="1536"
              height="1024"
            />
          </div>
          <ol className="ad-landing-process-list">
            {[
              ['01', '無料相談', '現状、目的、困っていることを確認します。'],
              ['02', '調査・ご提案', '必要な確認を行い、対応範囲・進め方・費用をご提案します。'],
              ['03', '制作・移行', '認識を合わせながら、設計・制作・確認を進めます。'],
              ['04', '公開・運用', '公開後の確認と、更新・改善・保守の体制を整えます。'],
            ].map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ad-landing-faq" aria-labelledby="ad-landing-faq-heading">
        <div className="container">
          <p className="ad-landing-section-label">FAQ</p>
          <h2 id="ad-landing-faq-heading">よくあるご質問</h2>
          <div className="ad-landing-faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ServiceRelatedPosts
        heading="判断材料として読んでおきたい記事"
        lead="費用、移行、保守の考え方を、相談前に確認できます。"
        posts={relatedPosts}
        categories={[{ path: '/blog/category/web-design', label: 'Web制作の記事一覧' }]}
      />

      <section className="ad-landing-final-cta" aria-labelledby="ad-landing-final-cta-heading">
        <div className="container ad-landing-final-cta-inner">
          <div>
            <p className="ad-landing-section-label">CONTACT</p>
            <h2 id="ad-landing-final-cta-heading">
              {isWordPress ? 'WordPressの不安を、整理するところから' : 'リニューアルの目的を、整理するところから'}
            </h2>
            <p>初回相談は無料です。現在分かっている範囲をご記入ください。</p>
          </div>
          <div className="ad-landing-final-actions">
            <TrackedLink
              href={contactHref}
              className="btn btn-cta btn-large"
              eventParams={{ ...eventParams, cta_location: 'landing_final', cta_type: 'contact' }}
            >
              {ctaLabel}
            </TrackedLink>
            <Link href={buildContextHref('/service/hp', context)} className="ad-landing-text-link">HP制作サービス全体を見る</Link>
          </div>
        </div>
      </section>

      <StickyMobileCTA
        location={isWordPress ? 'wordpress_renewal_landing' : 'hp_renewal_landing'}
        href={contactHref}
        lead={isWordPress ? 'WordPressの状態を相談' : 'HPリニューアルを相談'}
        sub="初回相談無料・1営業日以内に返信"
        eventParams={eventParams}
      />
    </main>
  )
}
