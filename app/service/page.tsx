import type { Metadata } from 'next'
import ServiceClient from './ServiceClient'

export const metadata: Metadata = {
  title: 'ホームページ制作・Web広告・AI活用支援｜サービス一覧',
  description: '東京の中小企業向けに、Web集客から社内DXまでをワンストップで支援。ホームページ制作(SEO・AI検索対策対応)、クリエイティブ制作、Web広告運用代行、CRM導入支援、生成AI研修を提供します。',
  alternates: { canonical: '/service' },
  openGraph: {
    title: 'ホームページ制作・Web広告・AI活用支援｜サービス一覧 | 株式会社EMPLAY',
    description: '東京の中小企業向けに、Web集客から社内DXまでをワンストップで支援。ホームページ制作、クリエイティブ制作、Web広告運用代行、CRM導入支援、生成AI研修を提供します。',
    url: '/service',
  },
}

export default function ServicePage() {
  return <ServiceClient />
}
