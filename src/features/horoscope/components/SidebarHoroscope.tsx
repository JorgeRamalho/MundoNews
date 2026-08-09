import { useMemo, useState } from 'react';
import {
  formatHoroscopeDate,
  getDailyHoroscopes,
  type SignHoroscope,
} from '@js/sidebarHoroscope';
import { BRAND_EMOJI } from '@js/brand';

export default function SidebarHoroscope() {
  const signs = useMemo(() => getDailyHoroscopes(), []);
  const [selectedId, setSelectedId] = useState(signs[0]?.id ?? 'aries');

  const selected: SignHoroscope | undefined = signs.find((s) => s.id === selectedId) ?? signs[0];

  if (!selected) return null;

  return (
    <div className="sidebar-widget sidebar-horoscope">
      <h3 className="sidebar-widget__title">
        {BRAND_EMOJI.horoscope} Horóscopo
      </h3>

      <p className="sidebar-horoscope__date">{formatHoroscopeDate()}</p>

      <label className="sidebar-horoscope__label" htmlFor="sidebar-horoscope-sign">
        Seu signo
      </label>
      <select
        id="sidebar-horoscope-sign"
        className="sidebar-horoscope__select"
        value={selected.id}
        onChange={(event) => setSelectedId(event.target.value)}
      >
        {signs.map((sign) => (
          <option key={sign.id} value={sign.id}>
            {sign.symbol} {sign.name}
          </option>
        ))}
      </select>

      <div className="sidebar-horoscope__card">
        <div className="sidebar-horoscope__header">
          <span className="sidebar-horoscope__symbol" aria-hidden="true">
            {selected.symbol}
          </span>
          <div className="sidebar-horoscope__meta">
            <strong className="sidebar-horoscope__name">{selected.name}</strong>
            <span className="sidebar-horoscope__dates">{selected.dates}</span>
          </div>
        </div>
        <p className="sidebar-horoscope__mood">
          Humor do dia: <em>{selected.mood}</em>
        </p>
        <p className="sidebar-horoscope__forecast">{selected.forecast}</p>
      </div>

      <ul className="sidebar-horoscope__list" aria-label="Sinais do zodíaco">
        {signs.map((sign) => (
          <li key={sign.id}>
            <button
              type="button"
              className={
                sign.id === selected.id
                  ? 'sidebar-horoscope__chip sidebar-horoscope__chip--active'
                  : 'sidebar-horoscope__chip'
              }
              onClick={() => setSelectedId(sign.id)}
              aria-pressed={sign.id === selected.id}
            >
              <span aria-hidden="true">{sign.symbol}</span>
              <span>{sign.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
