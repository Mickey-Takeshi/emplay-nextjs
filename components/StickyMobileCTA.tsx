'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import './StickyMobileCTA.css'

// モバイルで画面下部に固定表示する相談CTA。記事・サービスLPで使う（フォームページでは使わない）。
export default function StickyMobileCTA({ location = 'unknown' }: { location?: string }) {
  return (
    <div className="sticky-mobile-cta" role="complementary" aria-label="お問い合わせ">
      <div className="sticky-mobile-cta-text">
        <span className="sticky-mobile-cta-lead">まずは無料でご相談</span>
        <span className="sticky-mobile-cta-sub">初回相談無料・1営業日以内に返信</span>
      </div>
      <Link
        href="/contact"
        className="sticky-mobile-cta-btn"
        onClick={() => trackEvent('cta_click', { cta_location: location, cta_type: 'sticky_mobile' })}
      >
        無料相談
      </Link>
    </div>
  )
}
