import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

function loadModule(name, globals = {}) {
  const code = ts.transpileModule(
    readFileSync(new URL(`../lib/${name}.ts`, import.meta.url), 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
  ).outputText
  const warnings = []
  const context = vm.createContext({
    exports: {},
    console: { warn: (...args) => warnings.push(args) },
    ...globals,
  })
  vm.runInContext(code, context)
  return { ...context.exports, warnings }
}

test('analytics is safe without a browser', () => {
  assert.doesNotThrow(() => loadModule('analytics').trackEvent('form_submit'))
})

test('analytics initializes the data layer and clears prior attribution', () => {
  const window = {}
  loadModule('analytics', { window }).trackEvent('form_submit', { form: 'contact' })
  assert.equal(window.dataLayer.length, 1)
  const event = window.dataLayer[0]
  assert.equal(event.event, 'form_submit')
  assert.equal(event.form, 'contact')
  for (const key of ['inquiry_topic', 'landing_variant', 'acquisition_source']) {
    assert.equal(Object.hasOwn(event, key), true)
    assert.equal(event[key], undefined)
  }
})

test('analytics preserves the current inquiry attribution', () => {
  const window = { dataLayer: [] }
  loadModule('analytics', { window }).trackEvent('form_submit', {
    acquisition_source: 'chatgpt-ads', inquiry_topic: 'hp-renewal', landing_variant: 'partner',
  })
  assert.equal(window.dataLayer[0].acquisition_source, 'chatgpt-ads')
  assert.equal(window.dataLayer[0].inquiry_topic, 'hp-renewal')
  assert.equal(window.dataLayer[0].landing_variant, 'partner')
})

for (const event of ['form_view', 'form_start', 'form_submit', 'form_error', 'form_abandon']) {
  test(`${event}: a throwing GTM hook cannot interrupt the form or Pixel`, () => {
    const calls = []
    const window = {
      dataLayer: { push() { throw new Error('Synthetic GTM error') } },
      oaiq: (...args) => calls.push(args),
    }
    const analytics = loadModule('analytics', { window })
    const pixel = loadModule('openai-pixel', { window })
    assert.doesNotThrow(() => {
      analytics.trackEvent(event, { form: 'contact' })
      pixel.trackOpenAILead()
    })
    assert.equal(analytics.warnings.length, 1)
    assert.equal(calls.length, 1)
    assert.equal(calls[0][1], 'lead_created')
  })
}

test('analytics handles an inaccessible data layer', () => {
  const window = Object.defineProperty({}, 'dataLayer', { get() { throw new Error('Blocked') } })
  const analytics = loadModule('analytics', { window })
  assert.doesNotThrow(() => analytics.trackEvent('form_submit'))
  assert.equal(analytics.warnings.length, 1)
})

test('lead event uses the configured standard event and contains no form fields', () => {
  const calls = []
  const pixel = loadModule('openai-pixel', { window: { oaiq: (...args) => calls.push(args) } })
  pixel.trackOpenAILead()
  assert.equal(JSON.stringify(calls), JSON.stringify([
    ['measure', 'lead_created', { type: 'customer_action' }],
  ]))
})

test('unavailable or throwing Pixel cannot change form success', () => {
  assert.doesNotThrow(() => loadModule('openai-pixel').trackOpenAILead())
  assert.doesNotThrow(() => loadModule('openai-pixel', { window: {} }).trackOpenAILead())
  const pixel = loadModule('openai-pixel', { window: { oaiq() { throw new Error('Blocked') } } })
  assert.doesNotThrow(() => pixel.trackOpenAILead())
  assert.equal(pixel.warnings.length, 1)
})

test('consent denial is persisted and forwarded to the SDK', () => {
  const values = new Map()
  const calls = []
  const pixel = loadModule('openai-pixel', {
    window: { oaiq: (...args) => calls.push(args) },
    localStorage: { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) },
  })
  pixel.setOpenAIMeasurementConsent(false)
  assert.equal(pixel.getOpenAIMeasurementConsent(), 'denied')
  assert.equal(JSON.stringify(calls), JSON.stringify([['consent', false]]))
  pixel.setOpenAIMeasurementConsent(true)
  assert.equal(pixel.getOpenAIMeasurementConsent(), 'allowed')
})
