export interface FaqEntry {
  q: string
  a: string
}

interface FaqJsonLdProps {
  faqs: FaqEntry[]
}

// FAQPage 構造化データ(リッチリザルト・AI検索の引用元として有効)
// 表示中のFAQと同じデータ配列を渡すことで本文との一致を保証する
export default function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
