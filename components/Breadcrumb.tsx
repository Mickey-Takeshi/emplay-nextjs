import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

const BASE_URL = 'https://emplay.jp'

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // BreadcrumbList 構造化データ（表示中のパンくずと自動的に一致させる）
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${BASE_URL}/` },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.path ? { item: `${BASE_URL}${item.path}` } : {}),
      })),
    ],
  }

  return (
    <nav className="breadcrumb" aria-label="パンくずリスト">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ol className="container breadcrumb-list">
        <li className="breadcrumb-item"><Link href="/">HOME</Link></li>
        {items.map((item, index) => (
          <li className="breadcrumb-item" key={`${item.label}-${index}`}>
            <span className="breadcrumb-separator" aria-hidden="true">&gt;</span>
            {item.path ? (
              <Link href={item.path}>{item.label}</Link>
            ) : (
              <span className="breadcrumb-current" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
