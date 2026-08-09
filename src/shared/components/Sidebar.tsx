import { Link } from 'react-router-dom';
import { getLatestArticles } from '../../features/news/data/news';
import { timeAgo } from '@js/utils';
import { SIDEBAR_EDITORIAL_BLOCKS, MONITORED_SOURCES } from '@js/editorial';
import { BRAND_EMOJI } from '@js/brand';
import EditorialBlock from '../../features/news/components/EditorialBlock';
import SidebarWeather from '../../features/weather/components/SidebarWeather';
import SidebarSports from '../../features/news/components/SidebarSports';
import SidebarHoroscope from '../../features/horoscope/components/SidebarHoroscope';

export default function Sidebar() {
  const latest = getLatestArticles(8).filter((a) => a.category === 'brasil' || a.category === 'mundo');

  return (
    <aside className="sidebar">
      <div className="sidebar__sticky">
        <div className="sidebar-widget">
          <h3 className="sidebar-widget__title">
            {BRAND_EMOJI.news} Últimas notícias
          </h3>
          <ul className="sidebar-list">
            {latest.map((article) => (
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
        </div>

        {SIDEBAR_EDITORIAL_BLOCKS.map((block) => (
          <EditorialBlock key={block.id} block={block} />
        ))}

        <div className="sidebar-widget">
          <h3 className="sidebar-widget__title">
            {BRAND_EMOJI.correspondent} Rede de fontes
          </h3>
          <ul className="sources-list">
            {MONITORED_SOURCES.map((source) => (
              <li key={source.name} className="sources-list__item">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sources-list__name sources-list__link"
                >
                  {source.name}
                </a>
                <span className="sources-list__region">{source.region}</span>
              </li>
            ))}
          </ul>
        </div>

        <SidebarWeather />
        <SidebarSports />
        <SidebarHoroscope />
      </div>
    </aside>
  );
}
