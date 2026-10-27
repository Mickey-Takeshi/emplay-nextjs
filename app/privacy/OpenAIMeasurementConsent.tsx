'use client'

import { useEffect, useState } from 'react'
import { getOpenAIMeasurementConsent, setOpenAIMeasurementConsent } from '@/lib/openai-pixel'

type ConsentState = 'loading' | 'allowed' | 'denied'

export default function OpenAIMeasurementConsent() {
  const [consent, setConsent] = useState<ConsentState>('loading')

  useEffect(() => {
    setConsent(getOpenAIMeasurementConsent())
  }, [])

  const updateConsent = (allowed: boolean) => {
    setOpenAIMeasurementConsent(allowed)
    setConsent(allowed ? 'allowed' : 'denied')
  }

  return (
    <div className="privacy-consent-controls">
      <p className="privacy-consent-status" role="status" aria-live="polite">
        現在の設定：
        {consent === 'loading' ? '確認中' : consent === 'denied' ? '広告効果測定を停止中' : '広告効果測定を許可中'}
      </p>
      {consent !== 'denied' ? (
        <button type="button" className="btn btn-outline privacy-consent-button" onClick={() => updateConsent(false)}>
          広告効果測定を停止する
        </button>
      ) : (
        <button type="button" className="btn btn-outline privacy-consent-button" onClick={() => updateConsent(true)}>
          広告効果測定を再び許可する
        </button>
      )}
    </div>
  )
}
