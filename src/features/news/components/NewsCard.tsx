import { Link } from 'react-router-dom';
import type { NewsArticle } from '../../../shared/types';
import { timeAgo, getCategoryLabel, getCategoryBadgeClass } from '@js/utils';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  return (
    <article className={`news-card${featured ? ' news-card--featured' : ''}`}>
      <Link to={`/noticia/${article.slug}`}>
        <img
          src={article.imageUrl}
          alt={article.imageAlt}
          className="news-card__image"
          loading="lazy"
        />
        <div className="news-card__body">
          <div className="news-card__meta">
            <span className={getCategoryBadgeClass(article.category)}>
              {getCategoryLabel(article.category)}
            </span>
            {article.isBreaking && (
              <span className="badge badge--breaking">Urgente</span>
            )}
            <time dateTime={article.publishedAt}>{timeAgo(article.publishedAt)}</time>
          </div>
          <h3 className="news-card__title">{article.title}</h3>
          <p className="news-card__excerpt">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
