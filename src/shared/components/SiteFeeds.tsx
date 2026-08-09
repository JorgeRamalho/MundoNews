import { Helmet } from 'react-helmet-async';
import { BRAND } from '@js/brand';

export default function SiteFeeds() {
  return (
    <Helmet>
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${BRAND.name} — RSS`}
        href={`${BRAND.url}/feed.xml`}
      />
      <meta name="color-scheme" content="light dark" />
    </Helmet>
  );
}
