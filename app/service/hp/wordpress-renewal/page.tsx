import type { Metadata } from 'next'
import RenewalLanding from '../_components/RenewalLanding'
import { parseLandingContext, type QueryValue } from '@/lib/inquiry-context'

export const metadata: Metadata = {
  title: 'WordPressサイトのリニューアル・保守相談',
  description: '更新できていないWordPressサイトの現状を確認し、改修・再構築・保守運用を整理。セキュリティや管理体制に不安がある企業サイトをご支援します。',
  alternates: { canonical: 'https://emplay.jp/service/hp/wordpress-renewal' },
  openGraph: {
    title: 'WordPressサイトのリニューアル・保守相談 | 株式会社EMPLAY',
    description: 'WordPressの更新状況や管理体制を確認し、改修・再構築・保守運用の適切な進め方をご提案します。',
    url: '/service/hp/wordpress-renewal',
  },
}

interface WordPressRenewalPageProps {
  searchParams: Promise<{ intent?: QueryValue; source?: QueryValue }>
}

export default async function WordPressRenewalPage({ searchParams }: WordPressRenewalPageProps) {
  const params = await searchParams
  const context = parseLandingContext('wordpress-renewal', params.intent, params.source)

  return <RenewalLanding kind="wordpress" context={context} />
}
