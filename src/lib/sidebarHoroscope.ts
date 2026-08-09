/**
 * Horóscopo diário — widget da coluna lateral
 */

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dates: string;
  element: string;
}

export interface SignHoroscope extends ZodiacSign {
  forecast: string;
  mood: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'Áries', symbol: '♈', dates: '21/03 – 19/04', element: 'Fogo' },
  { id: 'touro', name: 'Touro', symbol: '♉', dates: '20/04 – 20/05', element: 'Terra' },
  { id: 'gemeos', name: 'Gêmeos', symbol: '♊', dates: '21/05 – 20/06', element: 'Ar' },
  { id: 'cancer', name: 'Câncer', symbol: '♋', dates: '21/06 – 22/07', element: 'Água' },
  { id: 'leao', name: 'Leão', symbol: '♌', dates: '23/07 – 22/08', element: 'Fogo' },
  { id: 'virgem', name: 'Virgem', symbol: '♍', dates: '23/08 – 22/09', element: 'Terra' },
  { id: 'libra', name: 'Libra', symbol: '♎', dates: '23/09 – 22/10', element: 'Ar' },
  { id: 'escorpiao', name: 'Escorpião', symbol: '♏', dates: '23/10 – 21/11', element: 'Água' },
  { id: 'sagitario', name: 'Sagitário', symbol: '♐', dates: '22/11 – 21/12', element: 'Fogo' },
  { id: 'capricornio', name: 'Capricórnio', symbol: '♑', dates: '22/12 – 19/01', element: 'Terra' },
  { id: 'aquario', name: 'Aquário', symbol: '♒', dates: '20/01 – 18/02', element: 'Ar' },
  { id: 'peixes', name: 'Peixes', symbol: '♓', dates: '19/02 – 20/03', element: 'Água' },
];

const FORECASTS = [
  'Dia favorável para decisões práticas. Evite adiar o que já está maduro.',
  'Conversas honestas abrem portas. Ouça mais do que fala nas próximas horas.',
  'Bom momento para organizar finanças e revisar prioridades da semana.',
  'A intuição está afiada: confie nela, mas confirme os fatos antes de agir.',
  'Energia alta para projetos novos. Comece pequeno e mantenha constância.',
  'Relações pedem paciência. Um gesto simples pode destravar um impasse.',
  'Foque no essencial. Menos dispersão, mais resultado no fim do dia.',
  'Oportunidade de aprendizado: observe quem já trilhou o caminho que você quer.',
  'Cuide do corpo e da rotina. Pequenos ajustes melhoram o humor geral.',
  'Criatividade em alta. Anote ideias — uma delas pode render frutos em breve.',
  'Evite discussões inúteis. Canalize a tensão em ações concretas.',
  'Dia bom para reconectar com alguém importante. Um contato faz diferença.',
  'Clareza mental favorece planejamento. Defina um objetivo e um próximo passo.',
  'Seja flexível com imprevistos: o desvio pode ser o melhor caminho hoje.',
  'Generosidade bem medida atrai reciprocidade. Ofereça ajuda sem se sobrecarregar.',
];

const MOODS = [
  'Confiante',
  'Reflexivo',
  'Determinado',
  'Sereno',
  'Otimista',
  'Cauteloso',
  'Inspirado',
  'Focado',
  'Diplomático',
  'Corajoso',
  'Paciente',
  'Intuitivo',
];

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function pickIndex(seed: number, length: number): number {
  return ((seed % length) + length) % length;
}

export function formatHoroscopeDate(date = new Date()): string {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function getDailyHoroscopes(date = new Date()): SignHoroscope[] {
  const day = dayOfYear(date);

  return ZODIAC_SIGNS.map((sign, index) => {
    const seed = day * 17 + index * 31;
    return {
      ...sign,
      forecast: FORECASTS[pickIndex(seed, FORECASTS.length)],
      mood: MOODS[pickIndex(seed + 7, MOODS.length)],
    };
  });
}
