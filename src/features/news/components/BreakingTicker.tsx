import { Link } from 'react-router-dom';
import { getBreakingNews } from '../data/news';
import { BRAND_EMOJI } from '@js/brand';

export default function BreakingTicker() {
  const breaking = getBreakingNews();
  if (breaking.length === 0) return null;

  const items = [...breaking, ...breaking];

  return (
    <div className="breaking-ticker" role="region" aria-label="Notícias urgentes">
      <div className="container breaking-ticker__inner">
        <span className="breaking-ticker__label">
          <span aria-hidden="true">{BRAND_EMOJI.breaking}</span> Urgente
        </span>
        <div className="breaking-ticker__track" tabIndex={0}>
          <div className="breaking-ticker__content" aria-hidden="true">
            {items.map((article, index) => (
              <Link
                key={`${article.id}-${index}`}
                to={`/noticia/${article.slug}`}
                className="breaking-ticker__item"
                tabIndex={-1}
              >
                <span aria-hidden="true">{BRAND_EMOJI.star}</span> {article.title}
              </Link>
            ))}
          </div>
          <ul className="breaking-ticker__accessible sr-only">
            {breaking.map((article) => (
              <li key={article.id}>
                <Link to={`/noticia/${article.slug}`}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
