import { getNews, getBlogPosts } from '@/lib/supabase'
import HomeClient from './HomeClient'
import './Home.css'

export default async function Home() {
  const [news, latestPosts] = await Promise.all([
    getNews(3).catch(() => []),
    getBlogPosts(3).catch(() => []),
  ])

  return (
    <main className="home">
      <HomeClient news={news} latestPosts={latestPosts} />
    </main>
  )
}
