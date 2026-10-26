'use client'

import type { MouseEventHandler, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { buildContextHref, parseRouteInquiryContext } from '@/lib/inquiry-context'

interface ContextualContactLinkProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default function ContextualContactLink({
  children,
  className,
  onClick,
}: ContextualContactLinkProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const context = parseRouteInquiryContext(pathname, {
    topic: searchParams.get('topic') ?? undefined,
    intent: searchParams.get('intent') ?? undefined,
    source: searchParams.get('source') ?? undefined,
  })

  return (
    <Link href={buildContextHref('/contact', context)} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
