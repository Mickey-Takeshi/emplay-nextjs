import Link from 'next/link'

interface BlogPaginationProps {
  basePath: string
  currentPage: number
  totalPages: number
}

type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end'

function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])
  const visiblePages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)

  const items: PaginationItem[] = []
  visiblePages.forEach((page, index) => {
    const previousPage = visiblePages[index - 1]
    if (previousPage && page - previousPage > 1) {
      items.push(index === 1 ? 'ellipsis-start' : 'ellipsis-end')
    }
    items.push(page)
  })

  return items
}

function getPageHref(basePath: string, page: number) {
  return page === 1 ? basePath : `${basePath}?page=${page}`
}

export default function BlogPagination({ basePath, currentPage, totalPages }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const items = getPaginationItems(currentPage, totalPages)

  return (
    <nav className="blog-pagination" aria-label="記事一覧のページ切り替え">
      {currentPage > 1 && (
        <Link
          href={getPageHref(basePath, currentPage - 1)}
          className="blog-pagination-link blog-pagination-direction"
          rel="prev"
        >
          <span aria-hidden="true">&larr;</span>
          前へ
        </Link>
      )}

      <div className="blog-pagination-pages">
        {items.map((item) => {
          if (typeof item !== 'number') {
            return <span key={item} className="blog-pagination-ellipsis" aria-hidden="true">...</span>
          }

          return (
            <Link
              key={item}
              href={getPageHref(basePath, item)}
              className={`blog-pagination-link ${item === currentPage ? 'active' : ''}`}
              aria-current={item === currentPage ? 'page' : undefined}
              aria-label={`${item}ページ目`}
            >
              {item}
            </Link>
          )
        })}
      </div>

      {currentPage < totalPages && (
        <Link
          href={getPageHref(basePath, currentPage + 1)}
          className="blog-pagination-link blog-pagination-direction"
          rel="next"
        >
          次へ
          <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </nav>
  )
}
