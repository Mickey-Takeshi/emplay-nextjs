import type { Metadata } from 'next'
import ServiceHpClient from './ServiceHpClient'

export const metadata: Metadata = {
  title: 'ホームページ制作サービス｜SEO・AI検索対策(AIO/LLMO)対応',
  description: 'ホームページ制作会社をお探しの中小企業の方へ。SEO＋AI検索対策(AIO/LLMO)対応で、作って終わりにしないホームページ制作。費用の目安、制作の流れ、月10本の記事代行と効果測定で問い合わせ獲得まで伴走します。新規制作・リニューアルはEMPLAYへ。',
  alternates: { canonical: 'https://emplay.jp/service/hp' },
  openGraph: {
    title: 'ホームページ制作サービス｜SEO・AI検索対策(AIO/LLMO)対応 | 株式会社EMPLAY',
    description: 'ホームページ制作会社をお探しの中小企業の方へ。SEO＋AI検索対策(AIO/LLMO)対応で、作って終わりにしないホームページ制作。費用の目安・制作の流れ・記事代行・効果測定で問い合わせ獲得まで伴走します。',
  },
}

export default function ServiceHpPage() {
  return <ServiceHpClient />
}
