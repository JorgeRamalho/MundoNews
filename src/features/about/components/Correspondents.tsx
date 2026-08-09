import { correspondents } from '../../news/data/news';
import { BRAND, BRAND_EMOJI } from '@js/brand';

export default function Correspondents() {
  return (
    <section className="correspondents" aria-labelledby="team-heading">
      <h2 id="team-heading" className="section-title">
        {BRAND_EMOJI.team} {BRAND.teamTitle}
      </h2>
      <p className="correspondents__intro">
        {BRAND.teamDescription}
      </p>
      <div className="correspondents__grid">
        {correspondents.map((person) => (
          <div
            key={person.id}
            className={`correspondent-card${person.role === 'Editora-chefe' ? ' correspondent-card--editor' : ''}`}
          >
            <div className="correspondent-card__avatar" aria-hidden="true">
              {person.initials}
            </div>
            <div className="correspondent-card__name">{person.name}</div>
            <div className="correspondent-card__city">
              {person.city}, {person.country}
            </div>
            <div className="correspondent-card__role">{person.role}</div>
            {person.bio && (
              <p className="correspondent-card__bio">{person.bio}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
