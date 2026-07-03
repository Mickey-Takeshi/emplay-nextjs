import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'サービスに関するご質問、お見積り依頼など、お気軽にお問い合わせください。株式会社EMPLAYへのお問い合わせフォームです。',
  openGraph: {
    title: 'お問い合わせ | 株式会社EMPLAY',
    description: 'サービスに関するご質問、お見積り依頼など、お気軽にお問い合わせください。株式会社EMPLAYへのお問い合わせフォームです。',
  },
  // フォームページは検索結果に出さない(robots.txtではDisallowしない方針)
  robots: {
    index: false,
    follow: false,
  },
}

export default function ContactPage() {
  return <ContactClient />
}
