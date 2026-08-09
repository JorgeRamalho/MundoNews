import { BRAND, BRAND_EMOJI } from '@js/brand';

export default function TruthBanner() {
  return (
    <section className="truth-banner">
      <div className="container">
        <h2 className="truth-banner__title">
          {BRAND_EMOJI.ethics} Compromisso com a Verdade
        </h2>
        <p className="truth-banner__text">
          Na {BRAND.name}, a verdade vem em primeiro lugar. {BRAND_EMOJI.search} Verificamos cada fato,
          contextualizamos cada informação e reportamos com independência editorial.
          {BRAND_EMOJI.correspondent} Porque informação de qualidade é direito de todos.
        </p>
      </div>
    </section>
  );
}
