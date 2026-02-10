import type { Metadata } from 'next'
import ServiceTrainingClient from './ServiceTrainingClient'

export const metadata: Metadata = {
  title: '助成金を活用した研修サービス | 株式会社EMPLAY',
  description: '最大75%助成で実質月2.5万円/人〜。研修だけで終わらせない、売上向上まで伴走する研修×事業支援一体型サービス。AI/DX活用、採用マーケティング、Webマーケティング、SNS攻略の4プログラム。',
  openGraph: {
    title: '助成金を活用した研修サービス | 株式会社EMPLAY',
    description: '最大75%助成で実質月2.5万円/人〜。研修だけで終わらせない、売上向上まで伴走する研修×事業支援一体型サービス。AI/DX活用、採用マーケティング、Webマーケティング、SNS攻略の4プログラム。',
  },
}

export default function ServiceTrainingPage() {
  return <ServiceTrainingClient />
}
