'use client'

import { useState } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import FaqJsonLd from '@/components/FaqJsonLd'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import './Service.css'

interface ServiceDefinition {
  number: string
  label: string
  title: string
  description: string
  points: string[]
  href: string
  cta: string
  external?: boolean
}

interface ChallengeRoute {
  title: string
  description: string
  links: Array<{ label: string; href: string; external?: boolean }>
}

const services: ServiceDefinition[] = [
  {
    number: '01',
    label: 'WEB FOUNDATION',
    title: 'HP制作サービス',
    description: '企業の信頼性と問い合わせ獲得を両立するホームページを、SEO・AIOを踏まえて設計。公開後のコンテンツ運用と改善まで伴走します。',
    points: ['ホームページ制作', 'SEO・AIO設計', '記事制作・改善運用'],
    href: '/service/hp',
    cta: 'HP制作サービスを見る',
  },
  {
    number: '02',
    label: 'CREATIVE',
    title: 'クリエイティブ制作',
    description: 'Webサイト、LP、バナー、動画など、目的と利用場面に合わせたクリエイティブを企画・制作します。',
    points: ['コーポレートサイト・LP', 'バナー・記事LP', '動画制作'],
    href: '/service/creative',
    cta: 'クリエイティブ制作を見る',
  },
  {
    number: '03',
    label: 'ADVERTISING',
    title: 'Web広告運用代行',
    description: '媒体選定から配信設計、クリエイティブ改善、効果検証まで一貫して支援し、集客施策を継続的に改善します。',
    points: ['Google・Yahoo!広告', 'SNS広告', 'LP・クリエイティブ改善'],
    href: '/service/ads',
    cta: 'Web広告運用代行を見る',
  },
  {
    number: '04',
    label: 'CUSTOMER MANAGEMENT',
    title: 'CRM導入支援',
    description: '顧客情報の整理からツール選定、初期設定、配信・運用まで支援。社内で継続して活用できる状態をつくります。',
    points: ['顧客データ整備', 'CRM選定・初期設定', 'メール・LINE配信'],
    href: '/service/crm',
    cta: 'CRM導入支援を見る',
  },
  {
    number: '05',
    label: 'AI TRAINING',
    title: 'EMPLAY AI ACADEMY',
    description: '生成AIの基礎から業務活用、Web制作、業務改善まで、実務で使える成果物をつくりながら学ぶ企業向け研修です。',
    points: ['生成AI・ChatGPT活用', 'AIを使ったWeb制作', '業務改善・自動化'],
    href: 'https://academy.emplay.jp/',
    cta: '研修プログラムを見る',
    external: true,
  },
]

const challengeRoutes: ChallengeRoute[] = [
  {
    title: '企業サイトと発信基盤を整えたい',
    description: '新規制作からリニューアル、継続的な記事発信まで、信頼と集客の土台を整えます。',
    links: [
      { label: 'HP制作', href: '/service/hp' },
      { label: 'クリエイティブ制作', href: '/service/creative' },
    ],
  },
  {
    title: '問い合わせと商談を増やしたい',
    description: '広告、LP、顧客データをつなぎ、流入から継続的なアプローチまで改善します。',
    links: [
      { label: 'Web広告運用', href: '/service/ads' },
      { label: 'CRM導入', href: '/service/crm' },
    ],
  },
  {
    title: 'AI活用を社内に定着させたい',
    description: '知識の習得だけで終わらず、自社業務で使える形まで実践し、継続活用につなげます。',
    links: [
      { label: 'AI ACADEMY', href: 'https://academy.emplay.jp/', external: true },
    ],
  },
]

const processSteps = [
  { number: '01', title: '課題の整理', text: '現状、目標、社内体制を確認し、優先して取り組む課題を明確にします。' },
  { number: '02', title: '支援内容の設計', text: '必要な施策と進行方法、役割分担、費用を整理してご提案します。' },
  { number: '03', title: '制作・導入', text: '定期的に認識を合わせながら、制作や設定、研修を進めます。' },
  { number: '04', title: '運用・改善', text: '公開・導入後の状況を確認し、成果につながる運用を支援します。' },
]

const faqs = [
  {
    q: '相談だけでも大丈夫ですか？',
    a: 'はい。現状やご要望を伺い、優先して取り組むべき内容から整理します。具体的な依頼内容が決まっていない段階でもご相談いただけます。',
  },
  {
    q: '必要なサービスだけ依頼できますか？',
    a: '可能です。ホームページ制作、広告運用、CRM導入など、必要な領域だけをご依頼いただけます。複数施策を連携させるご提案も可能です。',
  },
  {
    q: '他社が制作したサイトの改善にも対応できますか？',
    a: '対応可能です。現在のサイトや運用状況を確認し、改善範囲と進め方をご提案します。',
  },
  {
    q: '社内にWebやAIの担当者がいなくても進められますか？',
    a: '問題ありません。専門用語をできるだけ使わず、判断に必要な情報と次の作業を整理しながら進行します。',
  },
  {
    q: '地方の企業でも依頼できますか？',
    a: 'オンラインでの打ち合わせと進行に対応しているため、全国からご依頼いただけます。',
  },
]

export default function ServiceClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="service-page">
      <FaqJsonLd faqs={faqs} />

      <header className="service-hero" aria-label="ページヘッダー">
        <div className="service-hero-bg" aria-hidden="true" />
        <div className="service-hero-content">
          <p className="service-hero-label">SERVICE</p>
          <h1 className="service-hero-title">WebとAI活用を、<br />必要なところから。</h1>
          <p className="service-hero-text">
            中小企業のWeb制作・集客・顧客管理・AI研修を、<br className="pc-only" />
            課題整理から実行、運用まで一貫して支援します。
          </p>
          <div className="service-hero-actions">
            <a href="#services" className="btn btn-primary btn-large">支援領域を見る</a>
            <Link href="/contact" className="btn btn-outline-white btn-large">相談する</Link>
          </div>
        </div>
      </header>

      <Breadcrumb items={[{ label: 'SERVICE' }]} />

      <section className="service-hub-section" id="services" aria-labelledby="services-heading">
        <div className="container">
          <div className="service-section-heading">
            <p className="section-label">SERVICES</p>
            <h2 id="services-heading">5つの支援領域</h2>
            <p>単独のご依頼にも、複数領域を組み合わせた支援にも対応します。</p>
          </div>

          <div className="service-catalog">
            {services.map((service) => (
              <article className="service-catalog-item" key={service.number}>
                <div className="service-catalog-number" aria-hidden="true">{service.number}</div>
                <div className="service-catalog-content">
                  <p className="service-catalog-label">{service.label}</p>
                  <h3>{service.title}</h3>
                  <p className="service-catalog-description">{service.description}</p>
                  <ul className="service-catalog-points" aria-label={`${service.title}の支援内容`}>
                    {service.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </div>
                <div className="service-catalog-action">
                  {service.external ? (
                    <a href={service.href} target="_blank" rel="noopener noreferrer" className="service-text-link" aria-label={`${service.cta}（新しいタブで開く）`}>
                      {service.cta}<span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link href={service.href} className="service-text-link">
                      {service.cta}<span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-route-section" aria-labelledby="route-heading">
        <div className="container">
          <div className="service-section-heading service-section-heading-left">
            <p className="section-label">BY CHALLENGE</p>
            <h2 id="route-heading">課題から支援を選ぶ</h2>
          </div>
          <div className="service-route-grid">
            {challengeRoutes.map((route) => (
              <article className="service-route-item" key={route.title}>
                <h3>{route.title}</h3>
                <p>{route.description}</p>
                <div className="service-route-links">
                  {route.links.map((link) => link.external ? (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label}（新しいタブで開く）`}>{link.label}<span aria-hidden="true">↗</span></a>
                  ) : (
                    <Link key={link.label} href={link.href}>{link.label}<span aria-hidden="true">→</span></Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-process-section" aria-labelledby="process-heading">
        <div className="container">
          <div className="service-section-heading">
            <p className="section-label">PROCESS</p>
            <h2 id="process-heading">ご相談から運用まで</h2>
            <p>目的と社内体制に合わせて、必要な工程を調整します。</p>
          </div>
          <ol className="service-process-list">
            {processSteps.map((step) => (
              <li key={step.number}>
                <span className="service-process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="service-faq-section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="service-section-heading">
            <p className="section-label">FAQ</p>
            <h2 id="faq-heading">よくあるご質問</h2>
          </div>
          <div className="service-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div className={`service-faq-item ${isOpen ? 'open' : ''}`} key={faq.q}>
                  <button
                    type="button"
                    id={`service-faq-button-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`service-faq-answer-${index}`}
                  >
                    <span className="service-faq-mark">Q</span>
                    <span className="service-faq-question">{faq.q}</span>
                    <span className="service-faq-toggle" aria-hidden="true">{isOpen ? '−' : '＋'}</span>
                  </button>
                  <div
                    id={`service-faq-answer-${index}`}
                    className="service-faq-answer"
                    role="region"
                    aria-labelledby={`service-faq-button-${index}`}
                    hidden={!isOpen}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="service-final-cta" aria-labelledby="service-cta-heading">
        <div className="container">
          <div className="service-final-cta-inner">
            <div>
              <p className="section-label">CONTACT</p>
              <h2 id="service-cta-heading">取り組む順番から、一緒に整理します。</h2>
              <p>依頼内容が決まっていない段階でも、現在の課題を伺ったうえで進め方をご提案します。</p>
            </div>
            <Link href="/contact" className="btn btn-primary btn-large">無料相談を申し込む</Link>
          </div>
        </div>
      </section>
      <StickyMobileCTA location="service_list" />
    </main>
  )
}
