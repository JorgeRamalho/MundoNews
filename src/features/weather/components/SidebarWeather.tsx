import { useEffect, useState } from 'react';
import {
  fetchSidebarWeather,
  formatTemp,
  type SidebarCityWeather,
} from '@js/sidebarWeather';

export default function SidebarWeather() {
  const [cities, setCities] = useState<SidebarCityWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await fetchSidebarWeather();
        if (active) setCities(data);
      } catch {
        if (active) setCities([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    const timer = window.setInterval(load, 20 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="sidebar-widget sidebar-weather">
      <h3 className="sidebar-widget__title">🌤️ Previsão do Tempo</h3>

      {loading && (
        <p className="sidebar-weather__status">Carregando previsão…</p>
      )}

      {!loading && cities.length === 0 && (
        <p className="sidebar-weather__status">Previsão indisponível no momento.</p>
      )}

      {!loading && cities.length > 0 && (
        <ul className="sidebar-weather__list">
          {cities.map((city) => (
            <li key={`${city.name}-${city.country}`} className="sidebar-weather__item">
              <span className="sidebar-weather__icon" aria-hidden="true">{city.icon}</span>
              <div className="sidebar-weather__meta">
                <strong className="sidebar-weather__city">{city.name}</strong>
                <span className="sidebar-weather__detail">
                  {city.country} · {city.forecast}
                </span>
              </div>
              <span className="sidebar-weather__temp">{formatTemp(city.temp)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
