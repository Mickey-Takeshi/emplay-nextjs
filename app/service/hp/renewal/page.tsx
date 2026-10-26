import type { Metadata } from 'next'
import RenewalLanding from '../_components/RenewalLanding'
import { parseLandingContext, type QueryValue } from '@/lib/inquiry-context'

export const metadata: Metadata = {
  title: 'ホームページリニューアル｜問い合わせにつながる企業サイトへ',
  description: '企業サイトの構成、デザイン、更新体制、問い合わせ導線を見直し、事業に使えるホームページへ。戦略設計から制作、公開後の改善までEMPLAYが伴走します。',
  alternates: { canonical: 'https://emplay.jp/service/hp/renewal' },
  openGraph: {
    title: 'ホームページリニューアル｜問い合わせにつながる企業サイトへ | 株式会社EMPLAY',
    description: '構成、デザイン、更新体制、問い合わせ導線を見直し、事業に使える企業サイトへ刷新します。',
    url: '/service/hp/renewal',
  },
}

interface RenewalPageProps {
  searchParams: Promise<{ intent?: QueryValue; source?: QueryValue }>
}

export default async function RenewalPage({ searchParams }: RenewalPageProps) {
  const params = await searchParams
  const context = parseLandingContext('hp-renewal', params.intent, params.source)

  return <RenewalLanding kind="hp" context={context} />
}
