import type { Metadata } from 'next'
import CareersClient from './CareersClient'

export const metadata: Metadata = {
  title: '採用情報',
  description: '株式会社EMPLAYの採用情報です。私たちと一緒に「わくわく」を創りませんか？',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: '採用情報 | 株式会社EMPLAY',
    description: '株式会社EMPLAYの採用情報です。私たちと一緒に「わくわく」を創りませんか？',
  },
}

export default function CareersPage() {
  return <CareersClient />
}
