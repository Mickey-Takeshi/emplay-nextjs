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
}

// カテゴリ(日本語名) → 最も関連するサービス
const CATEGORY_TO_SERVICE: Record<string, string> = {
  'マーケティング': 'ads',
  'データ分析': 'ads',
  'Web制作': 'hp',
  'EC・ネットショップ': 'hp',
  '採用': 'hp',
  'AI活用': 'academy',
  'DX': 'crm',
  'ビジネス': 'crm',
  // 個別サービスに該当しないテーマは総合相談へ案内する
}

export default function ArticleServiceCTA({ category }: { category: string }) {
  const serviceKey = CATEGORY_TO_SERVICE[category]
  const service = serviceKey ? SERVICES[serviceKey] : null

  return (
    <aside className="article-cta" aria-label="関連サービスのご案内">
      <div className="article-cta-inner">
        <p className="article-cta-eyebrow">EMPLAYができること</p>
        <h2 className="article-cta-heading">
          {category}のお悩み、<br className="sp-only" />EMPLAYにご相談ください
        </h2>
        {service ? (
          <p className="article-cta-text">
            <strong>{service.name}</strong>で御社の課題解決を支援します。{service.desc}
          </p>
        ) : (
          <p className="article-cta-text">
            集客・DX・コンテンツ制作まで、中小企業の成長をワンストップで支援します。まずはお気軽にご相談ください。
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
          {service && (
            <TrackedLink
              href={service.href}
              className="article-cta-btn article-cta-btn-secondary"
              external={service.external}
              event="cta_click"
              eventParams={{ cta_location: 'article_end', cta_type: 'service', service: service.key, article_category: category }}
              ariaLabel={service.label}
            >
              {service.label}
            </TrackedLink>
          )}
        </div>
        <p className="article-cta-note">初回相談は無料・通常1営業日以内にご返信します</p>
      </div>
    </aside>
  )
}
