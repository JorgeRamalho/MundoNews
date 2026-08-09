import { Link } from 'react-router-dom';
import { BRAND, BRAND_ASSETS } from '@js/brand';

interface LogoProps {
  variant?: 'header' | 'footer';
  showTagline?: boolean;
}

export default function Logo({ variant = 'header', showTagline = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={`logo logo--${variant}`}
      aria-label={`${BRAND.name} — ${BRAND.tagline}`}
    >
      <img
        src={BRAND_ASSETS.logoIcon}
        alt={`Logotipo ${BRAND.name}`}
        className="logo__icon"
        width={40}
        height={40}
      />
      <div className="logo__text">
        <span className="logo__name">
          <span className="logo__emoji" aria-hidden="true">🌎</span>
          {BRAND.name}
        </span>
        {showTagline && (
          <span className="logo__tagline">
            <span className="logo__emoji logo__emoji--small" aria-hidden="true">📰</span>
            {BRAND.tagline}
          </span>
        )}
      </div>
    </Link>
  );
}
