interface ServiceJsonLdProps {
  name: string
  description: string
  url: string
  serviceType: string
}

export default function ServiceJsonLd({ name, description, url, serviceType }: ServiceJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    serviceType,
    provider: { '@id': 'https://emplay.jp/#organization' },
    areaServed: {
      '@type': 'Country',
      name: '日本',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://emplay.jp/contact',
      availableLanguage: 'ja',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
