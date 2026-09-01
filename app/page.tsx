import type { Metadata } from 'next'
import { getNewsSummaries } from '@/lib/supabase'
import HomeClient from './HomeClient'
import './Home.css'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Home() {
  const news = await getNewsSummaries(3).catch(() => [])

  return (
    <main className="home">
      <HomeClient news={news} />
    </main>
  )
}
