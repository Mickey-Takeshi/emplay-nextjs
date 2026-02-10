import type { Metadata } from 'next'
import ServiceClient from './ServiceClient'

export const metadata: Metadata = {
  title: 'サービス一覧',
  description: 'Web集客から社内DXまで、ビジネスの成長をワンストップで支援。HP制作、クリエイティブ制作、Web広告運用代行、CRM導入支援、助成金を活用した研修サービスを提供します。',
  openGraph: {
    title: 'サービス一覧 | 株式会社EMPLAY',
    description: 'Web集客から社内DXまで、ビジネスの成長をワンストップで支援。HP制作、クリエイティブ制作、Web広告運用代行、CRM導入支援、助成金を活用した研修サービスを提供します。',
  },
}

export default function ServicePage() {
  return <ServiceClient />
}
