import { useEffect, useState } from 'react';
import { BRAND_EMOJI } from '@js/brand';
import { getBrasiliaDateLabel, getBrasiliaTime } from '@js/infoBar';

export default function InfoStatusBar() {
  const [clock, setClock] = useState(() => getBrasiliaTime());
  const [dateLabel] = useState(() => getBrasiliaDateLabel());

  useEffect(() => {
    const tick = window.setInterval(() => {
      setClock(getBrasiliaTime());
    }, 1000);

    return () => window.clearInterval(tick);
  }, []);

  return (
    <section className="info-status-bar" aria-label="Horário de Brasília">
      <div className="container info-status-bar__inner">
        <div className="info-status-bar__items info-status-bar__items--clock-only">
          <span className="info-status-bar__item info-status-bar__item--clock">
            <span aria-hidden="true">{BRAND_EMOJI.time}</span>
            <span>
              <strong>Horário de Brasília</strong>
              <span className="info-status-bar__muted"> {dateLabel}</span>
              {' '}
              <strong className="info-status-bar__clock">{clock}</strong>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
