import { Link } from 'react-router-dom';
import { getSportsArticles } from '../data/news';
import { timeAgo } from '@js/utils';
import { BRAND_EMOJI } from '@js/brand';

export default function SidebarSports() {
  const sports = getSportsArticles(4);
  const [featured, ...rest] = sports;

  if (!featured) return null;

  return (
    <div className="sidebar-widget sidebar-sports">
      <h3 className="sidebar-widget__title">
        {BRAND_EMOJI.sports} Esporte — Copa 2026
      </h3>

      <Link to={`/noticia/${featured.slug}`} className="sidebar-sports__featured">
        <img
          src={featured.imageUrl}
          alt={featured.imageAlt}
          className="sidebar-sports__image"
          loading="lazy"
        />
        <span className="sidebar-sports__kicker">Reportagem especial</span>
        <strong className="sidebar-sports__headline">{featured.title}</strong>
        <span className="sidebar-sports__excerpt">{featured.excerpt}</span>
        <time className="sidebar-sports__time" dateTime={featured.publishedAt}>
          {timeAgo(featured.publishedAt)}
        </time>
      </Link>

      {featured.gallery && featured.gallery.length > 0 && (
        <div className="sidebar-sports__thumbs" aria-label="Galeria da seleção e do Mundial">
          {featured.gallery.slice(0, 3).map((image) => (
            <img
              key={image.url}
              src={image.url}
              alt={image.alt}
              className="sidebar-sports__thumb"
              loading="lazy"
            />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <ul className="sidebar-list sidebar-sports__list">
          {rest.map((article) => (
            <li key={article.id} className="sidebar-list__item">
              <Link to={`/noticia/${article.slug}`} className="sidebar-list__link">
                {article.title}
              </Link>
              <div className="sidebar-list__time">
                <time dateTime={article.publishedAt}>{timeAgo(article.publishedAt)}</time>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link to="/esporte" className="sidebar-sports__more">
        Ver coluna de esportes →
      </Link>
    </div>
  );
}
