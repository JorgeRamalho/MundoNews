import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BRAND, BRAND_EMOJI } from '@js/brand';
import Logo from './Logo';
import NewsletterSignup from './NewsletterSignup';

const SECTION_LINKS = [
  { path: '/brasil', key: 'nav.brazil', emoji: '🇧🇷' },
  { path: '/mundo', key: 'nav.world', emoji: '🌎' },
  { path: '/opiniao', key: 'nav.opinion', emoji: '💬' },
  { path: '/esporte', key: 'nav.sports', emoji: '⚽' },
  { path: '/artigos', key: 'nav.articles', emoji: '📄' },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <NewsletterSignup />

        <div className="footer__grid">
          <div>
            <Logo variant="footer" showTagline={false} />
            <p className="footer__brand-text">
              {BRAND_EMOJI.news} {BRAND.description}
            </p>
          </div>

          <div>
            <h3 className="footer__heading">{BRAND_EMOJI.globe} {t('footer.sections')}</h3>
            {SECTION_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="footer__link">
                {link.emoji} {t(link.key)}
              </Link>
            ))}
          </div>

          <div>
            <h3 className="footer__heading">{BRAND_EMOJI.ethics} {t('footer.institutional')}</h3>
            <Link to="/sobre" className="footer__link">ℹ️ {t('footer.about')}</Link>
            <Link to="/sobre" className="footer__link">{BRAND_EMOJI.truth} {t('footer.ethics')}</Link>
            <Link to="/sobre" className="footer__link">{BRAND_EMOJI.team} {t('footer.team')}</Link>
          </div>

          <div>
            <h3 className="footer__heading">{BRAND_EMOJI.email} {t('footer.contact')}</h3>
            <a href={`mailto:${BRAND.email}`} className="footer__link">{BRAND.email}</a>
            <span className="footer__link">{BRAND_EMOJI.location} Curitiba — Paraná</span>
            <a href="/feed.xml" className="footer__link">{BRAND_EMOJI.news} {t('footer.rss')}</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} {BRAND_EMOJI.globe} {BRAND.name}. {t('footer.rights')}</span>
          <span>{BRAND_EMOJI.truth} {BRAND.taglineWithEmoji}</span>
        </div>
      </div>
    </footer>
  );
}
