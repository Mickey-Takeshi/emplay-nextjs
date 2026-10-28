// GA4/GTM 計測ヘルパー
// GTM(GTM-TG7GTN4B)の dataLayer にイベントを push する。
// GA4への接続はGTM側でトリガー設定する（コードデプロイ不要）。

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: EventParams[]
  }
}

export function trackEvent(event: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      // GTM keeps prior data-layer values across SPA navigation. Clear attribution
      // before every event so an organic event cannot inherit an earlier ad variant.
      inquiry_topic: undefined,
      landing_variant: undefined,
      acquisition_source: undefined,
      event,
      ...params,
    })
  } catch {
    // Analytics must not interrupt a saved inquiry or another measurement provider.
    console.warn('Analytics event could not be sent.')
  }
}
