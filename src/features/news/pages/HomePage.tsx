import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Sidebar from '../../../shared/components/Sidebar';
import EditorialBlock from '../components/EditorialBlock';
import PageMeta from '../../../shared/components/PageMeta';
import { HOME_EDITORIAL_BLOCKS } from '@js/editorial';
import Correspondents from '../../about/components/Correspondents';
import TruthBanner from '../../about/components/TruthBanner';
import InfoStatusBar from '../../../shared/components/InfoStatusBar';
import {
  getFeaturedArticle,
  getLatestArticles,
} from '../data/news';
import { BRAND, BRAND_EMOJI } from '@js/brand';
import { organizationJsonLd, websiteJsonLd } from '@js/seo';

export default function HomePage() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(9).filter((a) => !a.isFeatured).slice(0, 8);

  return (
    <>
      <PageMeta
        title={`${BRAND.name} — ${BRAND.tagline}`}
        description={BRAND.description}
        path="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />
      <section className="hero">
        <div className="container hero__content">
          <p className="hero__eyebrow">{BRAND_EMOJI.news} Jornalismo independente</p>
          <h1 className="hero__title">
            {BRAND.sloganWithEmoji}
          </h1>
          <div className="hero__cta">
            <Link to="/sobre" className="btn btn--primary">
              {BRAND_EMOJI.star} Conheça nossa missão
            </Link>
          </div>
        </div>
      </section>

      <InfoStatusBar />

      <main className="page__main">
        <div className="container page-grid page-grid--home">
          <div>
            {featured && (
              <section style={{ marginBottom: '2.5rem' }}>
                <h2 className="section-title">{BRAND_EMOJI.star} Destaque</h2>
                <NewsCard article={featured} featured />
              </section>
            )}

            <section style={{ marginBottom: '2.5rem' }}>
              <h2 className="section-title">{BRAND_EMOJI.news} Últimas notícias</h2>
              <div className="news-grid news-grid--2">
                {latest.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            <section className="editorial-section">
              <h2 className="section-title">{BRAND_EMOJI.ethics} Editorial do Site</h2>
              <div className="editorial-grid">
                {HOME_EDITORIAL_BLOCKS.map((block) => (
                  <EditorialBlock key={block.id} block={block} variant="home" />
                ))}
              </div>
            </section>
          </div>

          <Sidebar />
        </div>

        <TruthBanner />

        <div className="container">
          <Correspondents />
        </div>
      </main>
    </>
  );
}
