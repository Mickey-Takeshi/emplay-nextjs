import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="パンくずリスト">
      <div className="container">
        <Link href="/">HOME</Link>
        {items.map((item, index) => (
          <span key={index}>
            <span className="breadcrumb-separator" aria-hidden="true">&gt;</span>
            {item.path ? (
              <Link href={item.path}>{item.label}</Link>
            ) : (
              <span className="breadcrumb-current" aria-current="page">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
