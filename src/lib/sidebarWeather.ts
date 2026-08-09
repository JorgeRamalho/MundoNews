/**
 * Previsão do tempo — widget da coluna lateral
 */

export interface SidebarCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface SidebarCityWeather extends SidebarCity {
  temp: number;
  forecast: string;
  icon: string;
}

export const SIDEBAR_WEATHER_CITIES: SidebarCity[] = [
  { name: 'Brasília', country: 'Brasil', lat: -15.78, lon: -47.93 },
  { name: 'Buenos Aires', country: 'Argentina', lat: -34.6, lon: -58.38 },
  { name: 'Londres', country: 'Reino Unido', lat: 51.51, lon: -0.13 },
  { name: 'Washington', country: 'EUA', lat: 38.91, lon: -77.04 },
  { name: 'Paris', country: 'França', lat: 48.86, lon: 2.35 },
  { name: 'Roma', country: 'Itália', lat: 41.9, lon: 12.5 },
  { name: 'Berlim', country: 'Alemanha', lat: 52.52, lon: 13.41 },
  { name: 'Madri', country: 'Espanha', lat: 40.42, lon: -3.7 },
  { name: 'Lisboa', country: 'Portugal', lat: 38.72, lon: -9.14 },
  { name: 'Tóquio', country: 'Japão', lat: 35.68, lon: 139.69 },
];

const WEATHER_BY_CODE: Record<number, { label: string; icon: string }> = {
  0: { label: 'Céu limpo', icon: '☀️' },
  1: { label: 'Quase limpo', icon: '🌤️' },
  2: { label: 'Parcialmente nublado', icon: '⛅' },
  3: { label: 'Nublado', icon: '☁️' },
  45: { label: 'Neblina', icon: '🌫️' },
  48: { label: 'Neblina', icon: '🌫️' },
  51: { label: 'Garoa', icon: '🌦️' },
  53: { label: 'Garoa', icon: '🌦️' },
  55: { label: 'Garoa forte', icon: '🌧️' },
  61: { label: 'Chuva fraca', icon: '🌧️' },
  63: { label: 'Chuva', icon: '🌧️' },
  65: { label: 'Chuva forte', icon: '🌧️' },
  80: { label: 'Pancadas', icon: '🌦️' },
  81: { label: 'Pancadas', icon: '🌦️' },
  82: { label: 'Pancadas fortes', icon: '⛈️' },
  95: { label: 'Trovoadas', icon: '⛈️' },
  96: { label: 'Trovoadas', icon: '⛈️' },
  99: { label: 'Trovoadas', icon: '⛈️' },
};

export function formatTemp(temp: number): string {
  return `${Math.round(temp)}°C`;
}

function weatherFromCode(code: number): { label: string; icon: string } {
  return WEATHER_BY_CODE[code] ?? { label: 'Variável', icon: '🌡️' };
}

interface OpenMeteoCurrent {
  temperature_2m: number;
  weather_code: number;
}

interface OpenMeteoLocation {
  current: OpenMeteoCurrent;
}

export async function fetchSidebarWeather(): Promise<SidebarCityWeather[]> {
  const latitudes = SIDEBAR_WEATHER_CITIES.map((c) => c.lat).join(',');
  const longitudes = SIDEBAR_WEATHER_CITIES.map((c) => c.lon).join(',');
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitudes}` +
    `&longitude=${longitudes}` +
    `&current=temperature_2m,weather_code`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Falha ao buscar previsão');

  const data: OpenMeteoLocation | OpenMeteoLocation[] = await res.json();
  const list = Array.isArray(data) ? data : [data];

  return SIDEBAR_WEATHER_CITIES.map((city, index) => {
    const current = list[index]?.current;
    const weather = weatherFromCode(current?.weather_code ?? 0);
    return {
      ...city,
      temp: current?.temperature_2m ?? 0,
      forecast: weather.label,
      icon: weather.icon,
    };
  });
}
