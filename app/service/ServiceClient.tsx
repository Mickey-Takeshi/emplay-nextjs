'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import FaqJsonLd from '@/components/FaqJsonLd'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import './Service.css'

const services = [
  { number: '01', label: 'HP PRODUCTION', title: 'HP制作サービス', description: '企業の信頼性と問い合わせ獲得を両立するホームページを、SEO・AIOを踏まえて設計。公開後の改善まで伴走します。', href: '/service/hp', pricing: '初期費用30万円から', image: '/images/renewal/service-hp.webp', alt: 'ホームページを構成するレイヤーの図解' },
  { number: '02', label: 'CREATIVE', title: 'クリエイティブ制作', description: 'Webサイト、LP、バナー、動画など、目的と利用場面に合わせたクリエイティブを企画・制作します。', href: '/service/creative', pricing: '料金は要問い合わせ', image: '/images/renewal/service-creative.webp', alt: '制作机上のクリエイティブ工程の図解' },
  { number: '03', label: 'ADVERTISING', title: 'Web広告運用代行', description: '媒体選定から配信設計、クリエイティブ改善、効果検証まで一貫して支援します。', href: '/service/ads', pricing: '料金は要問い合わせ', image: '/images/renewal/service-ads.webp', alt: '広告流入を成果へつなげるファネルの図解' },
  { number: '04', label: 'CRM', title: 'CRM導入支援', description: '顧客情報の整理からツール選定、初期設定、配信・運用まで、社内で継続活用できる状態をつくります。', href: '/service/crm', pricing: '料金は要問い合わせ', image: '/images/renewal/service-crm.webp', alt: '顧客接点をつなぐCRM導線の図解' },
  { number: '05', label: 'AI TRAINING', title: 'EMPLAY AI ACADEMY', description: '生成AIを実務で使い、自走できる人材を育てる企業向けオンライン研修です。', href: 'https://academy.emplay.jp/', pricing: '研修プログラムを見る ↗', image: '/images/renewal/service-academy.webp', alt: '生成AIを学ぶ円形ワークショップの図解', external: true },
]

const challengeRoutes = [
  { title: '企業サイトと発信基盤を整えたい', description: '新規制作からリニューアル、継続的な情報発信まで、信頼と集客の土台を整えます。' },
  { title: '問い合わせと商談を増やしたい', description: '広告、LP、顧客データをつなぎ、流入から継続的なアプローチまで改善します。' },
  { title: 'AI活用を社内に定着させたい', description: '自社業務を題材に学び、継続して使える形まで実践します。' },
]

const processSteps = [
  { number: '01', title: '課題の整理', text: '現状、目標、社内体制を確認し、優先順位を明確にします。' },
  { number: '02', title: '支援内容の設計', text: '必要な施策、進行方法、役割分担、費用を整理します。' },
  { number: '03', title: '制作・導入', text: '認識を合わせながら、制作や設定、研修を進めます。' },
  { number: '04', title: '運用・改善', text: '公開・導入後の状況を確認し、改善を続けます。' },
]

const faqs = [
  { q: '相談だけでも大丈夫ですか？', a: 'はい。具体的な依頼内容が決まっていない段階でも、現状と優先順位の整理からご相談いただけます。' },
  { q: '必要なサービスだけ依頼できますか？', a: '可能です。必要な領域だけをご依頼いただくことも、複数施策を連携させることもできます。' },
  { q: '他社が制作したサイトの改善にも対応できますか？', a: '対応可能です。現在のサイトや運用状況を確認し、改善範囲と進め方をご提案します。' },
  { q: '社内にWebやAIの担当者がいなくても進められますか？', a: '問題ありません。判断に必要な情報と次の作業を整理しながら進行します。' },
  { q: '地方の企業でも依頼できますか？', a: 'オンラインでの打ち合わせと進行に対応しているため、全国からご依頼いただけます。' },
]

export default function ServiceClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  return <main className="service-page">
    <FaqJsonLd faqs={faqs} />
    <header className="service-hero"><div className="service-hero-bg"><Image src="/images/renewal/ecosystem.webp" alt="5つの専門領域を連携させる支援体制の図解" fill priority sizes="100vw" /></div><div className="service-hero-wash" aria-hidden="true"/><div className="container service-hero-content"><p className="service-hero-label">Services</p><h1>必要な施策を選び、<br />ひとつの実行計画へ。</h1><p>HP制作、クリエイティブ、Web広告、CRM、AI研修。各領域を単独でご相談いただくことも、課題に合わせて組み合わせることもできます。</p><div className="service-hero-actions"><Link href="/contact" className="btn btn-cta">無料相談を申し込む</Link><a href="#services" className="btn btn-outline">サービスを見る ↓</a></div></div></header>
    <Breadcrumb items={[{ label: 'SERVICE' }]} />

    <section className="service-choice"><div className="container"><div className="service-section-heading"><div><p className="section-label">How To Choose</p><h2>何を頼むべきか分からない段階から、相談できます。</h2></div><p>現状、目標、予算、社内体制を確認し、優先順位を整理します。不要な施策を増やさず、実行できる範囲から始めます。</p></div><div className="challenge-grid">{challengeRoutes.map((route, index)=><article key={route.title}><b>0{index+1}</b><h3>{route.title}</h3><p>{route.description}</p></article>)}</div></div></section>

    <section className="service-hub-section" id="services"><div className="service-wide"><div className="container service-section-heading"><div><p className="section-label">Service Lineup</p><h2>5つの専門領域</h2></div><p>サービスごとに異なる専門性を、共通の進め方と窓口で提供します。</p></div><div className="service-lines">{services.map((service)=>{
      const inner=<><span className="service-line-number">{service.number}</span><figure><Image src={service.image} alt={service.alt} width={1536} height={1024}/></figure><div className="service-line-copy"><small>{service.label}</small><h2>{service.title}</h2><p>{service.description}</p><b>{service.pricing}</b></div><span className="service-line-arrow">→</span></>
      return service.external?<a key={service.number} className="service-line" href={service.href} target="_blank" rel="noopener noreferrer" aria-label={`${service.title}の研修プログラムを見る（新しいタブで開きます）`}>{inner}</a>:<Link key={service.number} className="service-line" href={service.href}>{inner}</Link>
    })}</div></div></section>

    <section className="service-process"><figure><Image src="/images/renewal/process.webp" alt="課題整理から改善までの4段階を上る図解" width={1536} height={1024}/></figure><div><p className="section-label">Our Approach</p><h2>依頼するサービスより先に、<br />解決する課題を決める。</h2><p>目的と優先順位を揃えることで、制作・導入後も改善を続けられる状態をつくります。</p><ol>{processSteps.map(step=><li key={step.number}><b>{step.number}</b><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div></section>

    <section className="service-faq-section"><div className="container"><div className="service-section-heading"><div><p className="section-label">FAQ</p><h2>よくあるご質問</h2></div></div><div className="service-faq-list">{faqs.map((faq,index)=>{
      const questionId = `service-faq-question-${index}`
      const answerId = `service-faq-answer-${index}`
      const isOpen = openFaq === index
      return <article key={faq.q} className={isOpen?'open':''}><button id={questionId} type="button" onClick={()=>setOpenFaq(isOpen?null:index)} aria-expanded={isOpen} aria-controls={answerId}><span>{faq.q}</span><b aria-hidden="true">{isOpen?'−':'＋'}</b></button><div id={answerId} role="region" aria-labelledby={questionId} hidden={!isOpen}><p>{faq.a}</p></div></article>
    })}</div></div></section>
    <section className="service-contact"><div className="container"><div><h2>何から始めるべきか、<br />一緒に整理します。</h2><p>方向性が決まっていない段階でもお問い合わせください。</p></div><Link href="/contact" className="btn btn-cta">無料相談を申し込む →</Link></div></section>
    <StickyMobileCTA />
  </main>
}
