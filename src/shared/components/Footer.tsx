import { Link } from 'react-router-dom';
import { BRAND, BRAND_EMOJI, NAV_LINKS_BRANDED } from '@js/brand';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  const sections = NAV_LINKS_BRANDED.filter((l) => l.path !== '/' && l.path !== '/sobre');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Logo variant="footer" showTagline={false} />
            <p className="footer__brand-text">
              {BRAND_EMOJI.news} {BRAND.description}
            </p>
          </div>

          <div>
            <h3 className="footer__heading">{BRAND_EMOJI.globe} Seções</h3>
            {sections.map((link) => (
              <Link key={link.path} to={link.path} className="footer__link">
                {link.emoji} {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className="footer__heading">{BRAND_EMOJI.ethics} Institucional</h3>
            <Link to="/sobre" className="footer__link">ℹ️ Sobre nós</Link>
            <Link to="/sobre" className="footer__link">{BRAND_EMOJI.truth} Código de ética</Link>
            <Link to="/sobre" className="footer__link">{BRAND_EMOJI.team} Nossa equipe</Link>
          </div>

          <div>
            <h3 className="footer__heading">{BRAND_EMOJI.email} Contato</h3>
            <a href={`mailto:${BRAND.email}`} className="footer__link">{BRAND.email}</a>
            <span className="footer__link">{BRAND_EMOJI.location} Curitiba — Paraná</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} {BRAND_EMOJI.globe} {BRAND.name}. Todos os direitos reservados.</span>
          <span>{BRAND_EMOJI.truth} {BRAND.taglineWithEmoji}</span>
        </div>
      </div>
    </footer>
  );
}
