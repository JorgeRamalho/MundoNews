/**
 * Conteúdos editoriais da coluna lateral
 */

import { BRAND_EMOJI } from './brand';

export interface EditorialBlock {
  id: string;
  title: string;
  emoji: string;
  content: string;
  link?: { path: string; label: string };
}

export const EDITORIAL_BLOCKS: EditorialBlock[] = [
  {
    id: 'compromisso',
    title: 'Compromisso com a verdade',
    emoji: BRAND_EMOJI.truth,
    content:
      'Cada matéria publicada passa por verificação rigorosa de fatos. Nossos correspondentes nas principais capitais do mundo atuam em busca da verdade, sem filtros ideológicos.',
  },
  {
    id: 'imparcialidade',
    title: 'Imparcialidade na prática',
    emoji: BRAND_EMOJI.ethics,
    content:
      'Imparcialidade não é tratar todos os lados como equivalentes quando os fatos dizem o contrário. É apresentar o contexto completo, citar fontes e separar notícia de opinião.',
    link: { path: '/noticia/opiniao-tarifas-fatos-alem-do-ruido-eleitoral', label: 'Leia o editorial completo' },
  },
  {
    id: 'verificacao',
    title: 'Resumo dos fatos',
    emoji: BRAND_EMOJI.search,
    content:
      'Antes de publicar, cruzamos informações entre agências internacionais (Reuters, AP), veículos nacionais (G1, Valor, Folha) e correspondentes locais. Dados oficiais têm prioridade sobre declarações isoladas.',
  },
  {
    id: 'fontes',
    title: 'Fontes fidedignas',
    emoji: BRAND_EMOJI.globe,
    content:
      'Brasil: G1, CNN Brasil, Valor Econômico, Folha. Mundo: Al Jazeera, France 24, BBC, Reuters. Cada fonte é avaliada pelo histórico de precisão e transparência editorial.',
  },
  {
    id: 'correcoes',
    title: 'Correções e transparência',
    emoji: BRAND_EMOJI.news,
    content:
      'Erramos, corrigimos em público. Qualquer leitor pode reportar imprecisões pelo e-mail redacao@mundonews.com.br. Correções são destacadas no topo da matéria afetada.',
    link: { path: '/sobre', label: 'Código de ética' },
  },
  {
    id: 'desinformacao',
    title: 'Alerta ao leitor',
    emoji: '🛡️',
    content:
      'Desconfie de manchetes sensacionalistas e conteúdos sem fonte identificável. Em temas complexos — clima, energia, conflitos — busque sempre mais de um veículo antes de formar opinião.',
    link: { path: '/noticia/opiniao-fumaca-transfronteirica-clima-saude', label: 'Saiba como se proteger' },
  },
  {
    id: 'opiniao',
    title: 'Opinião do dia',
    emoji: BRAND_EMOJI.opinion,
    content:
      'No tarifaço com os EUA, o leitor precisa de fatos documentados — não só de narrativa eleitoral. Verificar fontes é responsabilidade cívica.',
    link: { path: '/noticia/opiniao-tarifas-fatos-alem-do-ruido-eleitoral', label: 'Ler coluna de opinião' },
  },
];

/** Blocos exibidos na home, abaixo de Últimas notícias */
export const HOME_EDITORIAL_BLOCK_IDS = [
  'compromisso',
  'imparcialidade',
  'fontes',
  'opiniao',
  'correcoes',
  'verificacao',
] as const;

export const HOME_EDITORIAL_BLOCKS = HOME_EDITORIAL_BLOCK_IDS.map(
  (id) => EDITORIAL_BLOCKS.find((block) => block.id === id)!
);

/** Blocos que permanecem na coluna lateral */
export const SIDEBAR_EDITORIAL_BLOCKS = EDITORIAL_BLOCKS.filter(
  (block) => !HOME_EDITORIAL_BLOCK_IDS.includes(block.id as (typeof HOME_EDITORIAL_BLOCK_IDS)[number])
);

export interface MonitoredSource {
  name: string;
  region: 'Brasil' | 'Mundo';
  url: string;
}

export const MONITORED_SOURCES: MonitoredSource[] = [
  { name: 'G1', region: 'Brasil', url: 'https://g1.globo.com' },
  { name: 'CNN Brasil', region: 'Brasil', url: 'https://www.cnnbrasil.com.br' },
  { name: 'Valor Econômico', region: 'Brasil', url: 'https://valor.globo.com' },
  { name: 'Folha de S.Paulo', region: 'Brasil', url: 'https://www.folha.uol.com.br' },
  { name: 'Reuters', region: 'Mundo', url: 'https://www.reuters.com' },
  { name: 'BBC', region: 'Mundo', url: 'https://www.bbc.com/news' },
  { name: 'Al Jazeera', region: 'Mundo', url: 'https://www.aljazeera.com' },
  { name: 'France 24', region: 'Mundo', url: 'https://www.france24.com/pt' },
];
