import type { Metadata } from 'next'
import CompanyClient from './CompanyClient'

export const metadata: Metadata = {
  title: '会社概要',
  description: '株式会社EMPLAYの会社概要です。「社会にもっとわくわくを創り続ける」をミッションに、DXコンサルティング、ウェブマーケティング、コンテンツ制作を提供しています。',
  alternates: { canonical: '/company' },
  openGraph: {
    title: '会社概要 | 株式会社EMPLAY',
    description: '株式会社EMPLAYの会社概要です。「社会にもっとわくわくを創り続ける」をミッションに、DXコンサルティング、ウェブマーケティング、コンテンツ制作を提供しています。',
    url: '/company',
  },
}

export default function CompanyPage() {
  return <CompanyClient />
}
