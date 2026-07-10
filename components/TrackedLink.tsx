'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

type Props = {
  href: string
  className?: string
  children: React.ReactNode
  event?: string
  eventParams?: Record<string, string | number | boolean | undefined>
  external?: boolean
  ariaLabel?: string
}

// クリック時にGA4/GTMイベントを発火するリンク。CTAの効果計測に使う。
export default function TrackedLink({ href, className, children, event = 'cta_click', eventParams, external, ariaLabel }: Props) {
  const handleClick = () => trackEvent(event, eventParams)

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={handleClick} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
