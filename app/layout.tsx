import type { Metadata } from 'next'
import { Montserrat, Noto_Sans_JP, Lato } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://emplay.jp'),
  title: {
    default: '株式会社EMPLAY | DX推進・ウェブマーケティング・コンテンツ制作',
    template: '%s | 株式会社EMPLAY',
  },
  description: '株式会社EMPLAYは「社会にもっとわくわくを創り続ける」をミッションに、DXコンサルティング、ウェブマーケティング、コンテンツ制作を提供する東京のIT企業です。',
  keywords: 'EMPLAY,DX,デジタルトランスフォーメーション,ウェブマーケティング,コンテンツ制作,IT企業,東京',
  authors: [{ name: '株式会社EMPLAY' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://emplay.jp',
    siteName: '株式会社EMPLAY',
    title: '株式会社EMPLAY | DX推進・ウェブマーケティング・コンテンツ制作',
    description: '株式会社EMPLAYは「社会にもっとわくわくを創り続ける」をミッションに、DXコンサルティング、ウェブマーケティング、コンテンツ制作を提供する東京のIT企業です。',
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
    description: '株式会社EMPLAYは「社会にもっとわくわくを創り続ける」をミッションに、DXコンサルティング、ウェブマーケティング、コンテンツ制作を提供する東京のIT企業です。',
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
  url: 'https://emplay.jp',
  logo: 'https://emplay.jp/favicon.svg',
  description: '株式会社EMPLAYは「社会にもっとわくわくを創り続ける」をミッションに、DXコンサルティング、ウェブマーケティング、コンテンツ制作を提供する東京のIT企業です。',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '東京都',
    addressCountry: 'JP',
  },
  sameAs: [],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${montserrat.variable} ${lato.variable} ${notoSansJP.variable}`}>
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
        <div style={{ paddingTop: '70px' }}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
