import { Helmet } from 'react-helmet-async';

const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export default function Analytics() {
  if (!plausibleDomain && !gaMeasurementId) return null;

  return (
    <Helmet>
      {plausibleDomain && (
        <script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      )}
      {gaMeasurementId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
          <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}</script>
        </>
      )}
    </Helmet>
  );
}
