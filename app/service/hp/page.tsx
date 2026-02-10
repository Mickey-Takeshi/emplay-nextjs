import type { Metadata } from 'next'
import ServiceHpClient from './ServiceHpClient'

export const metadata: Metadata = {
  title: 'HP制作サービス | 株式会社EMPLAY',
  description: 'SEO+AIO対応のHP制作サービス。「作って終わり」ではなく成果が出るまで伴走。継続的なコンテンツ作成と効果測定で、検索上位表示から問い合わせ獲得まで支援します。',
  openGraph: {
    title: 'HP制作サービス | 株式会社EMPLAY',
    description: 'SEO+AIO対応のHP制作サービス。「作って終わり」ではなく成果が出るまで伴走。継続的なコンテンツ作成と効果測定で、検索上位表示から問い合わせ獲得まで支援します。',
  },
}

export default function ServiceHpPage() {
  return <ServiceHpClient />
}
