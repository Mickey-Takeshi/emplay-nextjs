import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://emplay.jp'),
  title: {
    default: '株式会社EMPLAY | DX推進・ウェブマーケティング・コンテンツ制作',
    template: '%s | 株式会社EMPLAY',
  },
  description: '株式会社EMPLAYは中小企業のWeb集客からDX推進までワンストップで支援。HP制作・広告運用・CRM導入・AI研修を、戦略設計から実行まで一貫して伴走します。',
  authors: [{ name: '株式会社EMPLAY' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://emplay.jp',
    siteName: '株式会社EMPLAY',
    title: '株式会社EMPLAY | DX推進・ウェブマーケティング・コンテンツ制作',
    description: '株式会社EMPLAYは中小企業のWeb集客からDX推進までワンストップで支援。HP制作・広告運用・CRM導入・AI研修を、戦略設計から実行まで一貫して伴走します。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '株式会社EMPLAY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社EMPLAY | DX推進・ウェブマーケティング・コンテンツ制作',
    description: '株式会社EMPLAYは中小企業のWeb集客からDX推進までワンストップで支援。HP制作・広告運用・CRM導入・AI研修を、戦略設計から実行まで一貫して伴走します。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

// 組織の構造化データ
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '株式会社EMPLAY',
  alternateName: 'EMPLAY Inc.',
  url: 'https://emplay.jp',
  logo: 'https://emplay.jp/logo.png',
  image: 'https://emplay.jp/og-image.jpg',
  description: '株式会社EMPLAYは中小企業のWeb集客からDX推進までワンストップで支援。HP制作・広告運用・CRM導入・AI研修を、戦略設計から実行まで一貫して伴走します。',
  foundingDate: '2023-12',
  address: {
    '@type': 'PostalAddress',
    postalCode: '150-0001',
    addressRegion: '東京都',
    addressLocality: '渋谷区',
    streetAddress: '神宮前6丁目23番4号 桑野ビル2階',
    addressCountry: 'JP',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://emplay.jp/contact',
    availableLanguage: ['Japanese'],
  },
  knowsAbout: ['HP制作', 'Web広告運用', 'クリエイティブ制作', 'CRM導入支援', '生成AI研修', 'DXコンサルティング'],
  sameAs: [],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TG7GTN4B');`,
          }}
        />
        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TG7GTN4B"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ScrollToTop />
        <Header />
        <div style={{ paddingTop: '72px' }}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
