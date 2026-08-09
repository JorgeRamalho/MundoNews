import { useEffect, useState } from 'react';
import {
  fetchMarketQuotes,
  formatChangePct,
  type MarketQuote,
  type MarketQuotes,
} from '@js/markets';

function QuoteItem({ quote, icon }: { quote: MarketQuote; icon: string }) {
  const trend =
    quote.changePct === null
      ? 'flat'
      : quote.changePct > 0
        ? 'up'
        : quote.changePct < 0
          ? 'down'
          : 'flat';

  return (
    <span className={`top-bar__quote top-bar__quote--${trend}`}>
      <span className="top-bar__emoji" aria-hidden="true">{icon}</span>
      <span className="top-bar__quote-label">{quote.label}</span>
      <strong className="top-bar__quote-value">{quote.value}</strong>
      <span className="top-bar__quote-change">{formatChangePct(quote.changePct)}</span>
    </span>
  );
}

export default function TopBar() {
  const [quotes, setQuotes] = useState<MarketQuotes | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const next = await fetchMarketQuotes();
      if (active) setQuotes(next);
    };

    load();
    const timer = window.setInterval(load, 5 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="top-bar">
      <div className="container top-bar__inner">
        <div
          className="top-bar__markets"
          aria-label="Cotações de mercado"
          aria-live="polite"
          aria-atomic="true"
        >
          {quotes ? (
            <>
              <QuoteItem quote={quotes.ibovespa} icon="📈" />
              <QuoteItem quote={quotes.usdCommercial} icon="💵" />
              <QuoteItem quote={quotes.usdTourism} icon="✈️" />
            </>
          ) : (
            <span className="top-bar__markets-loading">Carregando cotações…</span>
          )}
        </div>
      </div>
    </div>
  );
}
