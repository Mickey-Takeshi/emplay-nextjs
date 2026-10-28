import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = new URL(process.env.CONTACT_TEST_URL || 'http://localhost:3107/contact')
assert.ok(['localhost', '127.0.0.1', 'emplay.jp'].includes(base.hostname))
assert.equal(base.pathname, '/contact')
const browser = await chromium.launch({ headless: true, channel: 'chrome' })
const results = []

// Every save and measurement response is mocked. This script
// must never create production inquiries, email notifications or Pixel events.
async function check(name, options = {}) {
  const context = await browser.newContext({ serviceWorkers: 'block' })
  const page = await context.newPage()
  let saves = 0
  const pings = []
  try {
    await context.route('**/*', async route => {
      const request = route.request()
      const url = new URL(request.url())
      if (url.hostname === 'aipdojhchzqdykbucznr.supabase.co' && url.pathname === '/functions/v1/send-contact-email') {
        if (request.method() !== 'POST') return route.abort()
        saves++
        await new Promise(resolve => setTimeout(resolve, 100))
        return route.fulfill({
          status: options.saveError ? 500 : 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: !(options.saveError || options.rejected) }),
        })
      }
      if (url.hostname === 'bzr.openai.com') {
        if (request.postData()) pings.push(JSON.parse(request.postData()))
        return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' } })
      }
      if (!['GET', 'HEAD'].includes(request.method())) return route.abort()
      if (url.origin === base.origin || url.hostname === 'bzrcdn.openai.com') return route.continue()
      return route.abort()
    })
    if (options.denied) {
      await context.addInitScript(() => localStorage.setItem('openai_measurement_consent', 'denied'))
    }
    await page.goto(base.href, { waitUntil: 'networkidle' })
    await page.evaluate(() => {
      window.__cvCalls = []
      const original = window.oaiq
      window.oaiq = (...args) => {
        window.__cvCalls.push(args)
        return original?.(...args)
      }
    })
    if (!options.invalid) {
      await page.locator('#name').fill('CV regression test')
      await page.locator('#email').fill('isolated-test@example.com')
      await page.locator('#message').fill('Isolated regression test. No production submission.')
    }
    if (options.honeypot) {
      await page.locator('#website').evaluate(input => {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, 'bot')
        input.dispatchEvent(new Event('input', { bubbles: true }))
      })
    }
    if (options.gtmError) {
      await page.evaluate(() => {
        const original = window.dataLayer.push.bind(window.dataLayer)
        window.dataLayer.push = (...items) => {
          if (items.some(item => item.event === 'form_submit')) throw new Error('Synthetic GTM error')
          return original(...items)
        }
      })
    }
    if (options.pixelError) await page.evaluate(() => { window.oaiq = () => { throw new Error('Synthetic Pixel error') } })
    if (options.noPixel) await page.evaluate(() => { window.oaiq = undefined })
    if (options.double) {
      await page.locator('form').evaluate(form => { form.requestSubmit(); form.requestSubmit() })
    } else {
      await page.locator('button[type=submit]').click()
    }
    if (!options.invalid) await page.locator('.submit-success, .form-error').waitFor()
    // The SDK batches events; observation is bounded and all traffic is intercepted.
    await page.waitForTimeout(1200)
    const success = await page.locator('.submit-success').count()
    const error = await page.locator('.form-error').count()
    const calls = await page.evaluate(() => window.__cvCalls.filter(args => args[0] === 'measure'))
    const expectSave = options.invalid || options.honeypot ? 0 : 1
    const expectSuccess = options.invalid || options.saveError || options.rejected ? 0 : 1
    const expectLead = expectSuccess && !options.honeypot && !options.pixelError && !options.noPixel ? 1 : 0
    assert.equal(saves, expectSave, `${name}: save count`)
    assert.equal(success, expectSuccess, `${name}: success UI`)
    assert.equal(error, options.saveError || options.rejected ? 1 : 0, `${name}: error UI`)
    assert.equal(calls.length, expectLead, `${name}: measure count`)
    for (const call of calls) assert.deepEqual(call, ['measure', 'lead_created', { type: 'customer_action' }])
    // SDK lifecycle and diagnostic events are not inquiry conversions.
    const leads = () => pings.flatMap(ping => ping.events || []).filter(event => event.type === 'lead_created')
    assert.equal(leads().length, options.denied ? 0 : expectLead, `${name}: emitted lead count`)
    assert.equal(JSON.stringify(pings).includes('isolated-test@example.com'), false, `${name}: no raw email`)
    for (const lead of leads()) assert.deepEqual(lead.data, { type: 'customer_action' })
    if (options.reload) {
      const before = leads().length
      await page.reload({ waitUntil: 'networkidle' })
      await page.waitForTimeout(1200)
      assert.equal(saves, 1, `${name}: reload must not save again`)
      assert.equal(leads().length, before, `${name}: reload must not send another CV`)
      assert.equal(await page.locator('form').count(), 1)
    }
    const result = { name, passed: true, saves, leadCalls: calls.length, leadEvents: leads().length }
    results.push(result)
    console.log(JSON.stringify(result))
  } finally {
    await context.close()
  }
}

try {
  await check('success and reload', { reload: true })
  await check('double submit', { double: true })
  await check('save failure', { saveError: true })
  await check('application rejection', { rejected: true })
  await check('invalid fields', { invalid: true })
  await check('honeypot', { honeypot: true })
  await check('GTM throws after save', { gtmError: true })
  await check('Pixel throws after save', { pixelError: true })
  await check('Pixel unavailable', { noPixel: true })
  await check('measurement denied', { denied: true })
  console.log(JSON.stringify({ passed: results.length, saveHandling: 'mocked', measurementHandling: 'mocked' }))
} finally {
  await browser.close()
}
