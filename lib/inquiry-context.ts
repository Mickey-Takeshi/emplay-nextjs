export type InquiryTopic = 'hp-renewal' | 'wordpress-renewal'

export type LandingVariant =
  | 'partner'
  | 'legacy'
  | 'conversion'
  | 'security'
  | 'maintenance'

export type AcquisitionSource = 'chatgpt-ads'

export type QueryValue = string | string[] | undefined

export interface InquiryContext {
  inquiryTopic?: InquiryTopic
  landingVariant?: LandingVariant
  acquisitionSource?: AcquisitionSource
}

const VALID_INTENTS: Record<InquiryTopic, readonly LandingVariant[]> = {
  'hp-renewal': ['partner', 'legacy', 'conversion'],
  'wordpress-renewal': ['security', 'maintenance'],
}

const firstValue = (value: QueryValue): string | undefined =>
  Array.isArray(value) ? value[0] : value

const isTopic = (value: string | undefined): value is InquiryTopic =>
  value === 'hp-renewal' || value === 'wordpress-renewal'

const isVariantForTopic = (
  topic: InquiryTopic,
  value: string | undefined
): value is LandingVariant => Boolean(value && VALID_INTENTS[topic].includes(value as LandingVariant))

export function parseLandingContext(
  topic: InquiryTopic,
  intentValue: QueryValue,
  sourceValue: QueryValue
): InquiryContext {
  const intent = firstValue(intentValue)
  const source = firstValue(sourceValue)

  return {
    inquiryTopic: topic,
    ...(isVariantForTopic(topic, intent) ? { landingVariant: intent } : {}),
    ...(source === 'chatgpt-ads' ? { acquisitionSource: source } : {}),
  }
}

export function parseContactContext(searchParams: {
  topic?: QueryValue
  intent?: QueryValue
  source?: QueryValue
}): InquiryContext {
  const topic = firstValue(searchParams.topic)
  if (!isTopic(topic)) return {}

  return parseLandingContext(topic, searchParams.intent, searchParams.source)
}

export function parseRouteInquiryContext(
  pathname: string,
  searchParams: {
    topic?: QueryValue
    intent?: QueryValue
    source?: QueryValue
  }
): InquiryContext {
  if (pathname === '/service/hp/renewal') {
    return parseLandingContext('hp-renewal', searchParams.intent, searchParams.source)
  }

  if (pathname === '/service/hp/wordpress-renewal') {
    return parseLandingContext('wordpress-renewal', searchParams.intent, searchParams.source)
  }

  return parseContactContext(searchParams)
}

export function buildContextHref(
  href: string,
  context: InquiryContext,
  hash?: string
): string {
  const hashIndex = href.indexOf('#')
  const hrefWithoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href
  const inlineHash = hashIndex >= 0 ? href.slice(hashIndex + 1) : undefined
  const queryIndex = hrefWithoutHash.indexOf('?')
  const pathname = queryIndex >= 0 ? hrefWithoutHash.slice(0, queryIndex) : hrefWithoutHash
  const query = new URLSearchParams(queryIndex >= 0 ? hrefWithoutHash.slice(queryIndex + 1) : '')

  if (context.inquiryTopic && !query.has('topic')) query.set('topic', context.inquiryTopic)
  if (context.landingVariant && !query.has('intent')) query.set('intent', context.landingVariant)
  if (context.acquisitionSource && !query.has('source')) query.set('source', context.acquisitionSource)

  const suffix = query.size > 0 ? `?${query.toString()}` : ''
  const resolvedHash = hash ?? inlineHash
  return `${pathname}${suffix}${resolvedHash ? `#${resolvedHash}` : ''}`
}

export function inquiryEventParams(context: InquiryContext): Record<string, string | undefined> {
  return {
    inquiry_topic: context.inquiryTopic,
    landing_variant: context.landingVariant,
    acquisition_source: context.acquisitionSource,
  }
}
