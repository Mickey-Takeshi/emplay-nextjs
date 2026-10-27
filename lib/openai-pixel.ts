type OpenAIPixelCommand = (...args: unknown[]) => void

export const OPENAI_MEASUREMENT_CONSENT_KEY = 'openai_measurement_consent'

declare global {
  interface Window {
    oaiq?: OpenAIPixelCommand
  }
}

export function trackOpenAILead(): void {
  if (typeof window === 'undefined' || typeof window.oaiq !== 'function') return

  try {
    window.oaiq('measure', 'lead_created', {
      type: 'customer_action',
    })
  } catch {
    // Measurement failures must not turn a saved inquiry into a form error.
    console.warn('OpenAI Pixel lead event could not be sent.')
  }
}

export function getOpenAIMeasurementConsent(): 'allowed' | 'denied' {
  try {
    return localStorage.getItem(OPENAI_MEASUREMENT_CONSENT_KEY) === 'denied' ? 'denied' : 'allowed'
  } catch {
    return 'allowed'
  }
}

export function setOpenAIMeasurementConsent(allowed: boolean): void {
  try {
    localStorage.setItem(OPENAI_MEASUREMENT_CONSENT_KEY, allowed ? 'allowed' : 'denied')
  } catch {
    // The SDK command still applies to the current browser session.
  }

  try {
    window.oaiq?.('consent', allowed)
  } catch {
    console.warn('OpenAI Pixel consent preference could not be applied.')
  }
}
