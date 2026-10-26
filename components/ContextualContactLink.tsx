'use client'

import { Suspense, type MouseEventHandler, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'
import {
  buildContextHref,
  inquiryEventParams,
  parseRouteInquiryContext,
} from '@/lib/inquiry-context'

interface ContextualContactLinkProps {
  children: ReactNode
  href?: string
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  eventName?: string
  eventParams?: Record<string, string | number | boolean | undefined>
  ariaLabel?: string
}

function ContextualLinkContent({
  children,
  href = '/contact',
  className,
  onClick,
  eventName,
  eventParams,
  ariaLabel,
}: ContextualContactLinkProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const context = parseRouteInquiryContext(pathname, {
    topic: searchParams.get('topic') ?? undefined,
    intent: searchParams.get('intent') ?? undefined,
    source: searchParams.get('source') ?? undefined,
  })
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (clickEvent) => {
    if (eventName) {
      trackEvent(eventName, {
        ...eventParams,
        ...inquiryEventParams(context),
      })
    }
    onClick?.(clickEvent)
  }

  return (
    <Link
      href={buildContextHref(href, context)}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  )
}

export default function ContextualContactLink(props: ContextualContactLinkProps) {
  const handleFallbackClick: MouseEventHandler<HTMLAnchorElement> = (clickEvent) => {
    if (props.eventName) {
      const searchParams = new URLSearchParams(window.location.search)
      const context = parseRouteInquiryContext(window.location.pathname, {
        topic: searchParams.get('topic') ?? undefined,
        intent: searchParams.get('intent') ?? undefined,
        source: searchParams.get('source') ?? undefined,
      })
      trackEvent(props.eventName, {
        ...props.eventParams,
        ...inquiryEventParams(context),
      })
    }
    props.onClick?.(clickEvent)
  }

  return (
    <Suspense
      fallback={(
        <Link
          href={props.href ?? '/contact'}
          className={props.className}
          onClick={handleFallbackClick}
          aria-label={props.ariaLabel}
        >
          {props.children}
        </Link>
      )}
    >
      <ContextualLinkContent {...props} />
    </Suspense>
  )
}
