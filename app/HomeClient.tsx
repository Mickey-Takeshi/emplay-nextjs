'use client'

import Link from 'next/link'
import { NewsArticleSummary } from '@/lib/supabase'
import FaqJsonLd from '@/components/FaqJsonLd'

// unoptimized運用のため、生成済みのモバイル派生をsrcsetで配信する。
const sm = (src: string) => src.replace(/\.webp$/, '-sm.webp')
const SRCSET = (src: string, desktopWidth = 1536, mobileWidth = 960) =>
  `${sm(src)} ${mobileWidth}w, ${src} ${desktopWidth}w`

interface HomeClientProps {
  news: NewsArticleSummary[]
}

const homeFaqs = [
  { q: '相談だけでも大丈夫ですか？', a: 'はい。現状の課題整理からで構いません。必要な施策と優先順位を一緒に整理します。' },
  { q: 'どのようなサービスを依頼できますか？', a: 'HP制作、クリエイティブ制作、Web広告運用、CRM導入支援、EMPLAY AI ACADEMYをご相談いただけます。' },
  { q: '地方の会社でも対応してもらえますか？', a: 'はい。オンラインでのお打ち合わせが可能ですので、全国からご相談いただけます。' },
  { q: '小規模な会社でも依頼できますか？', a: 'はい。予算と社内体制に合わせ、優先度の高い施策からご提案します。' },
]

const services = [
  { no: '01', label: 'HP PRODUCTION', title: 'HP制作サービス', text: 'SEO・AIOを見据え、問い合わせにつながる企業サイトを初期費用45万円から制作します。', href: '/service/hp', cardImage: '/images/renewal/service-hp.webp', cardImageWidth: 1536, cardImageHeight: 1024, alt: 'ホームページを構成するレイヤーの図解' },
  { no: '02', label: 'CREATIVE', title: 'クリエイティブ制作', text: 'Web、LP、バナー、動画で事業の価値を伝えます。', href: '/service/creative', cardImage: '/images/renewal/service-creative.webp', cardImageWidth: 1536, cardImageHeight: 1024, alt: '制作机上のクリエイティブ工程の図解' },
  { no: '03', label: 'ADVERTISING', title: 'Web広告運用代行', text: 'データに基づき集客効率を改善します。', href: '/service/ads', cardImage: '/images/renewal/service-ads-square.webp', cardImageWidth: 1100, cardImageHeight: 1050, alt: '広告流入を成果へつなげるファネルの図解' },
  { no: '04', label: 'CRM', title: 'CRM導入支援', text: '顧客情報と継続コミュニケーションを整えます。', href: '/service/crm', cardImage: '/images/renewal/service-crm-square.webp', cardImageWidth: 1100, cardImageHeight: 1050, alt: '顧客接点をつなぐCRM導線の図解' },
  { no: '05', label: 'AI TRAINING', title: 'EMPLAY AI ACADEMY', text: '生成AIを実務で使い、自走できる人材を育てます。', href: 'https://academy.emplay.jp/', cardImage: '/images/renewal/service-academy-square.webp', cardImageWidth: 1100, cardImageHeight: 1050, alt: '生成AIを学ぶ円形ワークショップの図解', external: true },
]

export default function HomeClient({ news }: HomeClientProps) {
  return (
    <>
      <FaqJsonLd faqs={homeFaqs} />
      <section className="renewal-hero" aria-label="メインビジュアル">
        <div className="renewal-hero-media"><img src="/images/renewal/home-hero-wide.webp" srcSet={SRCSET("/images/renewal/home-hero-wide.webp", 2400, 1200)} sizes="100vw" alt="Web制作・集客・CRM・AI活用をつなぐ事業基盤の図解" fetchPriority="high" decoding="async" style={{position:'absolute',inset:0,width:'100%',height:'100%'}} /></div>
        <div className="renewal-hero-wash" aria-hidden="true" />
        <div className="container renewal-hero-content">
          <p className="renewal-eyebrow">Web, Marketing & AI Partner</p>
          <h1>Web制作・集客・<br className="renewal-mobile-break" />AI活用を、<br className="renewal-desktop-break" />実行と<br className="renewal-mobile-break" />改善まで。</h1>
          <p>ホームページ制作、広告運用、CRM導入、AI研修。課題の整理から制作・導入、継続運用まで一貫して支援します。</p>
          <div className="renewal-actions"><Link href="/contact" className="btn btn-cta">無料相談を申し込む</Link><Link href="/service" className="btn btn-outline">支援内容を見る →</Link></div>
        </div>
      </section>

      <section className="renewal-section renewal-paper"><div className="container renewal-role"><div><p className="renewal-kicker">Our Role</p><h2>必要な施策を、<br />ひとつの実行計画へ。</h2><p>制作会社、広告代理店、システム会社を個別に探す前に、事業の課題と優先順位を整理します。</p><p className="renewal-note">窓口を分けず、Web・集客・顧客管理・人材育成を横断して支援。施策同士がつながることで、改善を続けやすくします。</p></div><figure><img src="/images/renewal/ecosystem-tall.webp" srcSet={SRCSET("/images/renewal/ecosystem-tall.webp", 1200)} sizes="(max-width: 768px) 100vw, 50vw" alt="5つの専門領域を円環状につないだ支援体制の図解" width={1200} height={1040} loading="lazy" decoding="async" /></figure></div></section>

      <section className="renewal-section"><div className="renewal-wide"><div className="container renewal-heading-row"><div><p className="renewal-kicker">Services</p><h2>5つの専門領域を、<br />必要な分だけ。</h2></div><p>各領域を単独でご相談いただくことも、複数を組み合わせて進めることもできます。</p></div><div className="renewal-service-grid">{services.map((service) => {
        const content = <><img src={service.cardImage} srcSet={SRCSET(service.cardImage, service.cardImageWidth)} sizes="(max-width: 768px) 100vw, 50vw" alt={service.alt} width={service.cardImageWidth} height={service.cardImageHeight} loading="lazy" decoding="async" /><div className="renewal-service-copy"><b>{service.no} / {service.label}</b><h3>{service.title}</h3><p>{service.text}</p></div></>
        return service.external ? <a key={service.no} className="renewal-service" href={service.href} target="_blank" rel="noopener noreferrer">{content}</a> : <Link key={service.no} className="renewal-service" href={service.href}>{content}</Link>
      })}</div></div></section>

      <section className="renewal-section renewal-paper"><div className="container"><p className="renewal-kicker">Why EMPLAY</p><h2 className="renewal-heading">成果が続く仕組みまで、<br />一緒につくる。</h2><div className="renewal-facts"><article><b>01</b><h3>ワンストップ対応</h3><p>制作、広告、CRM、AI研修まで窓口を一本化します。</p></article><article><b>02</b><h3>中小企業に伴走</h3><p>予算と体制に合わせ、実行できる優先順位を設計します。</p></article><article><b>03</b><h3>AI活用の実践知</h3><p>新しい技術を、現場で継続利用できる業務へ落とし込みます。</p></article></div></div></section>

      <section className="renewal-process"><figure><img src="/images/renewal/process.webp" srcSet={SRCSET("/images/renewal/process.webp")} sizes="(max-width: 768px) 100vw, 50vw" alt="課題整理から改善までの4段階を上る図解" width={1536} height={1024} loading="lazy" decoding="async" /></figure><div><p className="renewal-kicker">How We Work</p><h2>課題整理から改善まで、<br />迷わず進める4段階。</h2><p>現状と目標を確認し、必要な支援を選び、制作・導入後も効果を見ながら改善します。</p><ol><li><b>01</b>課題整理</li><li><b>02</b>設計・提案</li><li><b>03</b>制作・導入</li><li><b>04</b>運用・改善</li></ol></div></section>

      <section className="renewal-academy"><figure><img src="/images/renewal/service-academy.webp" srcSet={SRCSET("/images/renewal/service-academy.webp")} sizes="(max-width: 768px) 100vw, 50vw" alt="実務で生成AIを学ぶ円形ワークショップの図解" width={1536} height={1024} loading="lazy" decoding="async" /></figure><div><p className="renewal-kicker">EMPLAY AI ACADEMY</p><h2>生成AIを、<br />現場で使える力へ。</h2><p>自社の業務課題を題材に、使い方・考え方・改善方法まで身につけるオンライン実践研修です。</p><a className="btn renewal-light-btn" href="https://academy.emplay.jp/" target="_blank" rel="noopener noreferrer">研修サービスを見る ↗</a></div></section>

      <section className="renewal-section"><div className="container renewal-heading-row"><div><p className="renewal-kicker">FAQ</p><h2>よくあるご質問</h2></div></div><div className="container renewal-faq">{homeFaqs.map((faq) => <article key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></article>)}</div></section>

      {news.length > 0 && <section className="renewal-section renewal-paper"><div className="container renewal-heading-row"><div><p className="renewal-kicker">News</p><h2>お知らせ</h2></div><Link href="/news">一覧を見る →</Link></div><div className="container renewal-news">{news.map((article) => <Link key={article.id} href={`/news/${article.slug}`}><time dateTime={article.published_at}>{new Date(article.published_at).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })}</time><h3>{article.title}</h3><span>→</span></Link>)}</div></section>}

      <section className="renewal-contact"><div className="container"><div><h2>何から始めるべきか、<br />一緒に整理します。</h2><p>方向性が決まっていない段階でもお問い合わせください。</p></div><Link className="btn btn-cta" href="/contact">無料相談を申し込む →</Link></div></section>
    </>
  )
}
