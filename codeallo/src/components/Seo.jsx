import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../lib/siteConfig'

export default function Seo({ title, description, path = '', jsonLd = null, type = 'website' }) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — Technology Education & Digital Solutions`
  const url = `${siteConfig.url}${path}`
  const desc = description || siteConfig.description

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteConfig.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
