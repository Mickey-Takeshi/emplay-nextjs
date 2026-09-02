import TrackedLink from './TrackedLink'
import './ArticleServiceCTA.css'

type Service = {
  key: string
  name: string
  desc: string
  href: string
  label: string
  external?: boolean
}

const SERVICES: Record<string, Service> = {
  ads: {
    key: 'ads',
    name: 'Web広告運用代行',
    desc: 'Google・Yahoo!・SNS広告の運用を代行。データ分析に基づく改善で費用対効果を最大化します。',
    href: '/service/ads',
    label: '広告運用サービスを見る',
  },
  hp: {
    key: 'hp',
    name: 'ホームページ制作',
    desc: 'SEO・AI検索対策(AIO)に対応したHP制作。「作って終わり」ではなく、成果が出るまで伴走します。',
    href: '/service/hp',
    label: 'HP制作サービスを見る',
  },
  crm: {
    key: 'crm',
    name: 'CRM導入支援',
    desc: 'LINE公式アカウントやメール配信ツールの導入から運用まで、顧客との関係構築を支援します。',
    href: '/service/crm',
    label: 'CRM導入支援を見る',
  },
  creative: {
    key: 'creative',
    name: 'クリエイティブ制作',
    desc: 'LP・バナー・動画など、成果につながるクリエイティブを制作します。',
    href: '/service/creative',
    label: 'クリエイティブ制作を見る',
  },
  academy: {
    key: 'academy',
    name: 'EMPLAY AI ACADEMY',
    desc: '生成AIで「自走できる」DX中核人材を育てる、オンライン完結の実践研修プログラム。',
    href: 'https://academy.emplay.jp/',
    label: 'AI ACADEMYを見る',
    external: true,
  },
  // 個別サービスに寄せられないテーマの受け皿。総合窓口なので効能を断定しない。
  overview: {
    key: 'overview',
    name: 'サービス一覧',
    desc: '集客・DX・コンテンツ制作まで、中小企業の成長をワンストップで支援します。',
    href: '/service',
    label: 'サービス一覧を見る',
  },
}

// カテゴリ(日本語名) → 記事末に出すサービス。
// internal は必ず自サイト内のページを指す(外部リンクだけになると内部リンクが積み上がらないため)。
const CATEGORY_TO_SERVICE: Record<string, { internal: string; external?: string }> = {
  'マーケティング': { internal: 'ads' },
  'データ分析': { internal: 'ads' },
  'Web制作': { internal: 'hp' },
  'EC・ネットショップ': { internal: 'hp' },
  '採用': { internal: 'hp' },
  // 研修の実体は外部のACADEMYだが、内部リンクとしてサービス一覧も併記する
  'AI活用': { internal: 'overview', external: 'academy' },
  'DX': { internal: 'crm' },
  'ビジネス': { internal: 'crm' },
  // 自社に個別サービスが無いテーマ。総合窓口へ案内し、提供していない支援を示唆しない。
  'セキュリティ': { internal: 'overview' },
  '補助金・助成金': { internal: 'overview' },
}

export default function ArticleServiceCTA({ category }: { category: string }) {
  const mapping = CATEGORY_TO_SERVICE[category] ?? { internal: 'overview' }
  const service = SERVICES[mapping.internal]
  const extra = mapping.external ? SERVICES[mapping.external] : null
  // 説明文は、具体的な提供物がある場合はそちらを紹介する
  const featured = extra ?? service

  return (
    <aside className="article-cta" aria-label="関連サービスのご案内">
      <div className="article-cta-inner">
        <p className="article-cta-eyebrow">EMPLAYができること</p>
        <h2 className="article-cta-heading">
          {category}のお悩み、<br className="sp-only" />EMPLAYにご相談ください
        </h2>
        {featured.key === 'overview' ? (
          <p className="article-cta-text">
            {featured.desc}まずはお気軽にご相談ください。
          </p>
        ) : (
          <p className="article-cta-text">
            <strong>{featured.name}</strong>で御社の課題解決を支援します。{featured.desc}
          </p>
        )}
        <div className="article-cta-actions">
          <TrackedLink
            href="/contact"
            className="article-cta-btn article-cta-btn-primary"
            event="cta_click"
            eventParams={{ cta_location: 'article_end', cta_type: 'contact', article_category: category }}
            ariaLabel="無料相談ページへ"
          >
            無料で相談する
          </TrackedLink>
          {extra && (
            <TrackedLink
              href={extra.href}
              className="article-cta-btn article-cta-btn-secondary"
              external={extra.external}
              event="cta_click"
              eventParams={{ cta_location: 'article_end', cta_type: 'service', service: extra.key, article_category: category }}
              ariaLabel={extra.label}
            >
              {extra.label}
            </TrackedLink>
          )}
          <TrackedLink
            href={service.href}
            className="article-cta-btn article-cta-btn-secondary"
            event="cta_click"
            eventParams={{ cta_location: 'article_end', cta_type: 'service', service: service.key, article_category: category }}
            ariaLabel={service.label}
          >
            {service.label}
          </TrackedLink>
        </div>
        <p className="article-cta-note">初回相談は無料・SEO/AIO無料診断レポートつき・通常1営業日以内にご返信します</p>
      </div>
    </aside>
  )
}
