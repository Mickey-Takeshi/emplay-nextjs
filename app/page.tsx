import Link from 'next/link'
import { getNews } from '@/lib/supabase'
import HomeClient from './HomeClient'
import './Home.css'

export default async function Home() {
  const news = await getNews(3)

  return (
    <main className="home">
      <HomeClient news={news} />
    </main>
  )
}
