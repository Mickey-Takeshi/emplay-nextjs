import type { Metadata } from 'next'
import ContactClient from './ContactClient'
import { parseContactContext, type QueryValue } from '@/lib/inquiry-context'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'サービスに関するご質問、お見積り依頼など、お気軽にお問い合わせください。株式会社EMPLAYへのお問い合わせフォームです。',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'お問い合わせ | 株式会社EMPLAY',
    description: 'サービスに関するご質問、お見積り依頼など、お気軽にお問い合わせください。株式会社EMPLAYへのお問い合わせフォームです。',
    url: '/contact',
  },
  // フォームページは検索結果に出さない(robots.txtではDisallowしない方針)
  robots: {
    index: false,
    follow: false,
  },
}

interface ContactPageProps {
  searchParams: Promise<{
    topic?: QueryValue
    intent?: QueryValue
    source?: QueryValue
  }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const context = parseContactContext(await searchParams)
  return <ContactClient context={context} />
}
