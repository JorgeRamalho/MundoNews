/**
 * Cotações de mercado — Ibovespa, dólar comercial e dólar turismo
 */

export interface MarketQuote {
  label: string;
  value: string;
  changePct: number | null;
}

export interface MarketQuotes {
  ibovespa: MarketQuote;
  usdCommercial: MarketQuote;
  usdTourism: MarketQuote;
}

interface AwesomeQuote {
  bid: string;
  ask: string;
  pctChange: string;
}

const FALLBACK: MarketQuotes = {
  ibovespa: {
    label: 'Ibovespa',
    value: '173.825',
    changePct: -1.24,
  },
  usdCommercial: {
    label: 'Dólar com.',
    value: 'R$ 5,09',
    changePct: -1.14,
  },
  usdTourism: {
    label: 'Dólar tur.',
    value: 'R$ 5,28',
    changePct: -1.14,
  },
};

function formatBrl(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatIndex(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function parsePct(value: string | number | undefined): number | null {
  if (value === undefined || value === '') return null;
  const n = typeof value === 'number' ? value : Number(value.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

async function fetchCurrencyQuotes(): Promise<Pick<MarketQuotes, 'usdCommercial' | 'usdTourism'> | null> {
  const res = await fetch(
    'https://economia.awesomeapi.com.br/json/last/USD-BRL,USD-BRLT',
  );
  if (!res.ok) return null;

  const data = (await res.json()) as {
    USDBRL?: AwesomeQuote;
    USDBRLT?: AwesomeQuote;
  };

  if (!data.USDBRL || !data.USDBRLT) return null;

  const commercial = Number(data.USDBRL.ask || data.USDBRL.bid);
  const tourism = Number(data.USDBRLT.ask || data.USDBRLT.bid);

  return {
    usdCommercial: {
      label: 'Dólar com.',
      value: formatBrl(commercial),
      changePct: parsePct(data.USDBRL.pctChange),
    },
    usdTourism: {
      label: 'Dólar tur.',
      value: formatBrl(tourism),
      changePct: parsePct(data.USDBRLT.pctChange),
    },
  };
}

function parseIbovespaPayload(data: unknown): MarketQuote | null {
  const meta = (data as { chart?: { result?: Array<{ meta?: Record<string, number> }> } })
    ?.chart?.result?.[0]?.meta;
  const price = Number(meta?.regularMarketPrice);
  const previous = Number(meta?.chartPreviousClose ?? meta?.previousClose);

  if (!Number.isFinite(price)) return null;

  let changePct: number | null = null;
  if (Number.isFinite(previous) && previous !== 0) {
    changePct = ((price - previous) / previous) * 100;
  }

  return {
    label: 'Ibovespa',
    value: formatIndex(price),
    changePct,
  };
}

async function fetchIbovespa(): Promise<MarketQuote | null> {
  const yahooUrl =
    'https://query1.finance.yahoo.com/v8/finance/chart/%5EBVSP?interval=1d&range=5d';

  try {
    const res = await fetch(yahooUrl);
    if (res.ok) {
      const quote = parseIbovespaPayload(await res.json());
      if (quote) return quote;
    }
  } catch {
    /* CORS ou rede — tenta proxy público */
  }

  try {
    const proxyRes = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`,
    );
    if (!proxyRes.ok) return null;
    return parseIbovespaPayload(await proxyRes.json());
  } catch {
    return null;
  }
}

export async function fetchMarketQuotes(): Promise<MarketQuotes> {
  const [currencies, ibovespa] = await Promise.all([
    fetchCurrencyQuotes().catch(() => null),
    fetchIbovespa().catch(() => null),
  ]);

  return {
    ibovespa: ibovespa ?? FALLBACK.ibovespa,
    usdCommercial: currencies?.usdCommercial ?? FALLBACK.usdCommercial,
    usdTourism: currencies?.usdTourism ?? FALLBACK.usdTourism,
  };
}

export function formatChangePct(changePct: number | null): string {
  if (changePct === null) return '—';
  const sign = changePct > 0 ? '+' : '';
  return `${sign}${changePct.toFixed(2).replace('.', ',')}%`;
}
