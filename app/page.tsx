import type { Metadata } from 'next'
import { getNewsSummaries, getBlogPostSummaries } from '@/lib/supabase'
import HomeClient from './HomeClient'
import './Home.css'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Home() {
  const [news, latestPosts] = await Promise.all([
    getNewsSummaries(3).catch(() => []),
    getBlogPostSummaries(3).catch(() => []),
  ])

  return (
    <main className="home">
      <HomeClient news={news} latestPosts={latestPosts} />
    </main>
  )
}
