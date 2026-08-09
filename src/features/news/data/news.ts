import type { NewsArticle, Correspondent } from '../../../shared/types';

/**
 * Fotos em public/noticias/ (Vite copia para a raiz do dist no build).
 * - Vercel / Vite: /noticias/...
 * - Live Server em html5/: ../public/noticias/...
 */
const newsPhoto = (file: string) => {
  if (typeof window !== 'undefined') {
    const { pathname, port } = window.location;
    if (pathname.includes('/html5')) {
      return `../public/noticias/${file}`;
    }
    if (port === '5502') {
      return `dist/noticias/${file}`;
    }
  }
  return `/noticias/${file}`;
};

export const correspondents: Correspondent[] = [
  {
    id: '0',
    name: 'Mirian Ramalho',
    city: 'Curitiba',
    country: 'Brasil',
    role: 'Editora-chefe',
    initials: 'MR',
    bio: '35 anos como jornalista e editora-chefe, sede em Curitiba, atuando em busca do furo jornalístico da informação e acima de tudo a verdade com a imparcialidade no Brasil e no mundo.',
  },
  { id: '1', name: 'Lis Ramalho Barbosa', city: 'Brasília', country: 'Brasil', role: 'Jornalista e colunista', initials: 'LR' },
  { id: '2', name: 'Jorge Ramalho Barbosa', city: 'Curitiba', country: 'Brasil', role: 'Tecnologia da Informação', initials: 'JR' },
];

/**
 * Notícias de última hora — atualizado em 17/07/2026.
 * Fontes: BBC, Agência Brasil, USTR, AP, Reuters, CNN Brasil, Al Jazeera, Folha.
 * Redação imparcial com verificação cruzada de fatos.
 */
export const articles: NewsArticle[] = [
  {
    id: '17',
    slug: 'copa-2026-fifa-acusacoes-manipulacao-argentina',
    title:
      'Copa 2026: acusações de manipulação da Fifa colocam Argentina, Messi e a credibilidade do Mundial sob escrutínio',
    excerpt:
      'Após virada sobre o Egito, técnico e federação acusam favorecimento. Dados de arbitragem, chaveamento e expansão comercial alimentam a crise — sem prova pública de conluio.',
    content: `A Copa do Mundo 2026 atravessa sua fase decisiva sob uma nuvem que a Fifa preferiria evitar: a suspeita, espalhada em coletivas, redes sociais e análises estatísticas, de que o próprio desenho do torneio — e decisões de campo — estariam sendo moldados para preservar o espetáculo comercial em torno da Argentina e de Lionel Messi.

A Mundo News investigou o que é acusação, o que é padrão documentado e o que ainda não tem prova. Separar esses planos é obrigação jornalística. Tratar “manipulação da Fifa” como fato consumado, sem evidência forense ou documento oficial, seria repetir narrativa — não informar.

O estopim público veio das oitavas de final. A Argentina, atual campeã, venceu o Egito por 3 a 2 após estar perdendo por 2 a 0. O técnico egípcio Hossam Hassan disse, em entrevista coletiva, que a partida foi “claramente manipulada” e sugeriu interesse da entidade em manter Messi e a seleção albiceleste vivos no Mundial. A federação do Egito pediu à Fifa o afastamento da equipe de arbitragem do francês François Letexier, citando “graves erros” e “dois pesos e duas medidas”. Mohamed Salah também reclamou do conjunto de decisões no jogo decisivo.

Entre os lances contestados estão um gol egípcio anulado após revisão do VAR, pênaltis não marcados a favor do Egito e a condução geral da partida até o gol da virada nos acréscimos. Controvérsia de arbitragem em mata-mata de Copa não é novidade. O salto qualitativo da crise é outro: a acusação deixou de mirar só o árbitro e passou a apontar a Fifa como interessada no resultado.

Não há, até o fechamento desta reportagem, prova pública — e-mail, áudio, documento interno ou investigação independente — de que a partida tenha sido “combinada” pela entidade. Há, sim, um pacote de decisões e regras que, somadas, geram a percepção de favorecimento e exigem resposta transparente da Fifa.

O primeiro eixo é o chaveamento. No sorteio de dezembro, a Fifa distribuiu as quatro seleções mais bem colocadas no ranking — França, Argentina, Espanha e Inglaterra — em chaves diferentes, de modo que, terminando em primeiro nos grupos, só poderiam se enfrentar a partir das semifinais. A Argentina enfrentou Cabo Verde e Egito nas primeiras fases eliminatórias e, nas quartas, a Suíça — caminho visto por analistas e pela imprensa internacional (BBC, Folha) como relativamente mais confortável que o de outras cabeças de chave. A mudança foi justificada como proteção ao equilíbrio do mata-mata; o efeito prático foi reduzir o risco precoce para os favoritos de marketing.

O segundo eixo é numérico. Coberturas da BBC e da Folha apontaram que a Argentina voltou a liderar o ranking de pênaltis a favor no torneio e apresentou proporção baixa de cartões amarelos por falta cometida — contraste forte com seleções como a Inglaterra. Análises independentes de dados do Mundial também destacaram um padrão anômalo de intervenções do VAR favoráveis à albiceleste em relação às adversárias. Padrão estatístico não é sentença de culpa. Mas, sob o critério da honestidade editorial, também não pode ser descartado como “choro de eliminado” sem exame.

O terceiro eixo é estrutural e comercial. A Copa 2026 — EUA, Canadá e México, 48 seleções e 104 jogos — é o maior experimento da história do Mundial. Críticos (AP, The Conversation, BBC Sport) apontam diluição da competitividade na fase de grupos, menos “jeopardy” para as potências e prioridade à receita: mais jogos, mais janelas de transmissão, mais inventário publicitário. Queixas sobre preço de ingressos, logística entre 16 cidades e impacto ambiental reforçam a tese de que a Fifa redesenhou o produto menos pelo equilíbrio esportivo e mais pelo volume de negócio. Nesse sentido, “manipulação” pode significar duas coisas diferentes: (1) fraude de resultado, ainda não comprovada; (2) engenharia do torneio para maximizar audiência e valor de marca — documentada nas próprias decisões de formato e calendário.

Há ainda o precedente simbólico envolvendo Messi e o presidente Gianni Infantino. Em 2025, a escolha do Inter Miami — clube de Messi — para o Mundial de Clubes nos EUA, em detrimento de critérios que muitos consideravam mais naturais para a vaga do país-sede, alimentou a narrativa de que a vitrine Messi pesa nas decisões da casa. Infantino defende a expansão do futebol global; adversários enxergam conflito entre integridade competitiva e culto à estrela.

Do lado argentino, a defesa do título tem sido mais sofrida do que o favoritismo sugeria: viradas apertadas, pênaltis desperdiçados pelo próprio Messi e um elenco que mistura veteranos da conquista de 2022 com nomes da nova geração. A seleção segue como potência técnica — Enzo Fernández, Álvarez, Mac Allister, Martínez na zaga — e Messi, artilheiro histórico das Copas, permanece o centro gravitacional do relato. Isso explica por que qualquer decisão a favor da Argentina vira combustível viral: o tamanho da marca multiplica a suspeita.

A Fifa e a direção de arbitragem rejeitam, em linha histórica, acusações de conluio e afirmam independência técnica das equipes de arbitragem e do VAR. Enquanto não houver investigação externa com acesso a comunicações e critérios de escalação, o máximo que o jornalismo responsável pode afirmar é isto: a Copa 2026 vive uma crise de confiança; as acusações de manipulação partem de protagonistas do torneio; os dados de arbitragem e o desenho comercial merecem auditoria pública; e a prova de fraude organizada ainda não foi apresentada.

Para o leitor, o critério da Mundo News permanece o da marca: a verdade em primeiro lugar. Acusação se publica com fonte. Dado se publica com contexto. Conclusão de “golpe da Fifa” só se publica com evidência.`,
    category: 'esporte',
    author: 'Lis Ramalho Barbosa',
    authorRole: 'Jornalista e colunista — Brasília',
    publishedAt: '2026-07-17T18:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    imageAlt: 'Estádio lotado em noite de jogo decisivo da Copa do Mundo',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1000&q=80',
        alt: 'Torcida celebra com bandeiras azuis e brancas no estádio',
        caption: 'A Argentina segue como um dos centros de audiência do Mundial 2026.',
      },
      {
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1000&q=80',
        alt: 'Jogador de futebol em disputa de bola em campo gramado',
        caption: 'Decisões de campo e do VAR viraram o epicentro das acusações após Argentina x Egito.',
      },
      {
        url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1000&q=80',
        alt: 'Bola de futebol oficial em gramado iluminado',
        caption: 'Lionel Messi e a geração campeã de 2022 seguem no centro do relato comercial da Fifa.',
      },
      {
        url: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1000&q=80',
        alt: 'Torcida em arquibancada com faixas e clima de final de Copa',
        caption: 'O formato de 48 seleções ampliou o espetáculo — e as dúvidas sobre o equilíbrio competitivo.',
      },
    ],
    isBreaking: true,
    tags: ['Copa do Mundo', 'Fifa', 'Argentina', 'Messi', 'futebol', 'arbitragem'],
  },
  {
    id: '18',
    slug: 'argentina-messi-caminho-copa-2026-chaveamento',
    title: 'Argentina e Messi: o caminho até as fases finais e o debate sobre o chaveamento da Fifa',
    excerpt:
      'Cabeça de chave protegida no sorteio, adversários fora do top 10 e a sombra do marketing em torno do camisa 10. O que o chaveamento muda — e o que não prova.',
    content: `Na Copa do Mundo 2026, a Argentina entrou como uma das quatro potências isoladas no sorteio: França, Argentina, Espanha e Inglaterra foram colocadas em lados que só se cruzariam nas semifinais caso vencessem seus grupos.

Na prática, a albiceleste eliminou Cabo Verde e Egito — ambos fora do grupo das dez melhores do ranking — antes de encarar a Suíça nas quartas. Analistas e reportagens da imprensa internacional destacaram que o caminho, comparado ao de Espanha e França, pareceu menos áspero nas primeiras chaves do mata-mata.

Lionel Messi segue como âncora tática e comercial. Parte da crise de reputação da Fifa nasce exatamente daí: quanto maior o valor de manter a estrela no torneio, maior a pressão por transparência em cada pênalti, cartão e revisão de VAR.

A seleção argentina não é só Messi. Nomes como Enzo Fernández, Julián Álvarez, Alexis Mac Allister e a linha defensiva comandada por Lisandro Martínez sustentam o projeto de Scaloni. O desempenho irregular em alguns jogos, porém, reforçou a tese de que o favoritismo de marketing não se traduz automaticamente em domínio em campo.

O chaveamento, por si só, não prova fraude. Prova que a Fifa redesenhou o sorteio para evitar choques precoces entre gigantes — escolha política e comercial com efeito esportivo mensurável. É esse efeito que a opinião pública agora julga.`,
    category: 'esporte',
    author: 'Lis Ramalho Barbosa',
    authorRole: 'Jornalista e colunista — Brasília',
    publishedAt: '2026-07-17T16:30:00',
    imageUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=1000&q=80',
    imageAlt: 'Jogadores celebram gol em partida internacional de futebol',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&q=80',
        alt: 'Arquibancada colorida em estádio de futebol',
        caption: 'O valor de audiência da Argentina pressiona a Fifa a prestar contas sobre o formato do mata-mata.',
      },
    ],
    tags: ['Argentina', 'Messi', 'Copa do Mundo', 'Fifa'],
  },
  {
    id: '19',
    slug: 'copa-2026-formato-48-times-receita-integridade',
    title: 'Mundial de 48 seleções: quando a receita da Fifa tensiona a integridade do jogo',
    excerpt:
      'Mais jogos, menos risco para favoritos e críticas de jogadores e analistas. A expansão de 2026 redesenhou o produto — e a confiança do torcedor.',
    content: `Com 48 seleções e 104 partidas, a Copa do Mundo 2026 é o maior rearranjo do produto Fifa em décadas. A entidade vende inclusão global: mais confederações, mais estreias, mais “histórias”. Críticos respondem com outra palavra: diluição.

Na fase de grupos, o avanço de terceiros colocados e o desenho de 12 chaves reduziram o medo clássico do “grupo da morte” para as potências. Reportagens da BBC Sport e da Associated Press descreveram rodadas com pouco risco real para cabeças de chave e uma sensação de “qualificação embutida” até o mata-mata de 32 — espelho do antigo formato completo.

Há também o custo humano e logístico: calendário inchado, deslocamentos entre EUA, Canadá e México, e alertas de sindicatos e atletas sobre fadiga. No plano ambiental, estudos citados na imprensa apontam o torneio como um dos mais intensivos em carbono da história do Mundial.

Nada disso prova que um jogo específico foi “comprado”. Provam que a Fifa manipula — no sentido literal de redesenhar — as regras do espetáculo com prioridade comercial. Quando, no mata-mata, explodem acusações de favorecimento à Argentina, o terreno já estava fértil: a confiança no árbitro do jogo depende da confiança na casa que escreveu o regulamento.`,
    category: 'esporte',
    author: 'Jorge Ramalho Barbosa',
    authorRole: 'Tecnologia da Informação — Curitiba',
    publishedAt: '2026-07-17T14:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1000&q=80',
    imageAlt: 'Campo de futebol visto das arquibancadas antes do apito inicial',
    tags: ['Copa do Mundo', 'Fifa', 'formato', 'futebol'],
  },
  {
    id: '1',
    slug: 'eua-tarifas-25-brasil-reciprocidade-marco-lastimavel',
    title: 'EUA confirmam tarifas de 25% sobre produtos brasileiros; Brasil anuncia reciprocidade',
    excerpt:
      'Medida do USTR entra em vigor em 22 de julho. Planalto classifica o dia 15 como “marco lastimável” e diz que acionará a Lei de Reciprocidade e a OMC.',
    content: `O Escritório do Representante Comercial dos Estados Unidos (USTR) anunciou nesta quarta-feira, 15 de julho de 2026, o fim da investigação sobre práticas comerciais brasileiras e a aplicação de tarifas de 25% sobre uma série de produtos exportados aos EUA.

A decisão, chancelada pelo presidente Donald Trump, entra em vigor em 22 de julho. Segundo o representante Jamieson Greer, a ação busca enfrentar o que Washington considera práticas comerciais desleais. A lista inclui etanol, máquinas agrícolas, roupas, calçados e material elétrico. Café, suco de laranja, carne bovina, petróleo e aeronaves ficaram fora da sobretaxa adicional.

Em nota, o governo brasileiro repudiou a medida e afirmou que o dia 15 de julho “passará para a história das relações entre Brasil e EUA como um marco lastimável”. Brasília anunciou que iniciará os trâmites da Lei de Reciprocidade, aprovada pelo Congresso, e levará o caso à Organização Mundial do Comércio (OMC).

A investigação, baseada na Seção 301 da Lei de Comércio de 1974, citou temas como o Pix, acesso ao mercado de etanol, propriedade intelectual, combate à corrupção e desmatamento. O governo brasileiro rejeita a legitimidade das alegações e destaca que os EUA acumularam superávit comercial com o Brasil nos últimos 15 anos.

A Federação das Indústrias do Estado de São Paulo (Fiesp) e a Confederação Nacional da Indústria (CNI) também criticaram a taxação. A Mundo News registra posições oficiais de Washington e Brasília sem tom partidário e atualiza a cobertura conforme novos documentos forem publicados.`,
    category: 'brasil',
    author: 'Lis Ramalho Barbosa',
    authorRole: 'Jornalista e colunista — Brasília',
    publishedAt: '2026-07-16T07:30:00',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80',
    imageAlt: 'Comércio internacional e contêineres em porto',
    isFeatured: true,
    isBreaking: true,
    tags: ['tarifas', 'EUA', 'comércio', 'reciprocidade'],
  },
  {
    id: '2',
    slug: 'governo-rejeita-criticas-30-contatos-eua-tarifas',
    title: 'Governo rejeita críticas e diz que fez mais de 30 contatos com os EUA para negociar tarifas',
    excerpt:
      'Segundo a diplomacia brasileira, contatos ocorreram em diferentes níveis desde o anúncio do tarifaço; com Jamieson Greer e Marco Rubio, foram 11 tentativas de negociação, todas por iniciativa do Brasil.',
    content: `A decisão dos Estados Unidos de impor uma nova taxa sobre produtos brasileiros gerou uma disputa em torno da responsabilidade pelo novo "tarifaço".

Enquanto a oposição diz que houve falhas na negociação e culpa o presidente Luiz Inácio Lula da Silva (PT), integrantes do governo defendem que a determinação tem caráter "ideológico" e "político".

O Escritório do Representante de Comércio dos Estados Unidos (USTR, na sigla em inglês) confirmou a proposta de um novo "tarifaço" com uma extensa lista de isenções. Itens como petróleo, café e carne bovina ficarão fora da nova tarifa de 25%. A medida entra em vigor em 22 de julho.

Segundo um levantamento da diplomacia brasileira, foram realizados mais de 30 contatos desde o anúncio do tarifaço original. As conversas ocorreram por telefone, videoconferência e reuniões presenciais, em níveis presidencial, ministerial e técnico.

Além disso, representantes do governo conversaram com o secretário de Estado dos Estados Unidos, Marco Rubio, e com o representante de Comércio americano, Jamieson Greer, em pelo menos 11 ocasiões.

O governo afirma que, em todos os casos, a iniciativa para abrir o diálogo partiu do lado brasileiro, em uma tentativa de negociar uma saída para o impasse comercial.

A informação é apresentada como resposta às críticas de que o Brasil teria deixado de buscar uma negociação com o governo dos Estados Unidos antes da adoção das medidas tarifárias.

A percepção é que o cenário se mostrava favorável às negociações após o encontro entre Lula e Trump na Malásia e ainda melhor após o encontro entre os dois em Washington. Porém, nas últimas semanas, esse cenário mudou depois da visita do senador e pré-candidato à Presidência Flávio Bolsonaro (PL) aos EUA.

Governo chamou decisão de 'lastimável'

Em nota divulgada após o anúncio, o governo classificou a decisão como um "marco lastimável" na relação entre os dois países, e "repudia a decisão" anunciada nessa quarta-feira. O presidente Lula também afirmou que vai acionar a lei da reciprocidade.

"Não há justificativa para medidas unilaterais contra o nosso país. Segundo estatísticas do próprio governo norte-americano, os EUA acumularam nos últimos 15 anos US$ 424,5 bilhões em superávit de bens e serviços com o Brasil."

A Mundo News registra as declarações oficiais e o contexto da disputa comercial com imparcialidade, sem qualificar o mérito político das acusações cruzadas.`,
    category: 'brasil',
    author: 'Lis Ramalho Barbosa',
    authorRole: 'Jornalista e colunista — Brasília',
    publishedAt: '2026-07-16T08:20:00',
    imageUrl: newsPhoto('governo-contatos-eua-tarifas.png'),
    imageAlt:
      'Autoridades em encontro diplomático Brasil–EUA, com bandeiras dos dois países ao fundo',
    isBreaking: true,
    tags: ['tarifas', 'diplomacia', 'EUA', 'governo'],
  },
  {
    id: '3',
    slug: 'industria-brasileira-repudia-taxacao-eua',
    title: 'Indústria brasileira repudia taxação dos EUA e alerta para perda de competitividade',
    excerpt:
      'Fiesp, Fiemg e CNI criticam sobretaxa de 25%. Entidades dizem que medida unilateral reduz competitividade do Brasil frente a outros exportadores.',
    content: `Entidades industriais brasileiras reagiram com dureza ao anúncio dos Estados Unidos de sobretaxar em 25% produtos brasileiros a partir de 22 de julho, conforme Agência Brasil.

A Fiesp afirmou lamentar “com profunda preocupação” a medida e destacou que a decisão, por se limitar de forma unilateral ao Brasil, reduz a competitividade do país perante concorrentes globais. A Fiemg também manifestou preocupação com o aumento tarifário.

O presidente da CNI, Ricardo Alban, afirmou que os efeitos das tarifas já eram sentidos: segundo a confederação, 20 dos 27 estados reduziram exportações ao mercado norte-americano no primeiro trimestre. “Diante do anúncio de hoje, o cenário tende a piorar”, disse.

O governo federal reiterou que acionará instrumentos de reciprocidade e proteção setorial previstos no Plano Brasil Soberano. A Mundo News acompanha o impacto econômico com base em dados oficiais e pronunciamentos verificáveis.`,
    category: 'brasil',
    author: 'Mirian Ramalho',
    authorRole: 'Editora-chefe — Curitiba',
    publishedAt: '2026-07-16T07:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80',
    imageAlt: 'Linha de produção industrial',
    isBreaking: true,
    tags: ['indústria', 'exportação', 'tarifas'],
  },
  {
    id: '4',
    slug: 'incendios-canada-fumaca-toronto-eua',
    title: 'Mais de 800 incêndios no Canadá: fumaça deixa Toronto com ar perigoso e alerta nos EUA',
    excerpt:
      'Qualidade do ar em Toronto chega a níveis “muito alto risco”. Névoa atinge Médio Oeste, Grandes Lagos e Nordeste americano às vésperas da final da Copa.',
    content: `Mais de 800 incêndios florestais estão ativos no Canadá nesta quinta-feira, 16 de julho de 2026, com concentrações críticas em Ontário, Manitoba e Saskatchewan, segundo BBC, Reuters e Environment Canada.

A fumaça empurrada dos focos no noroeste de Ontário degradou a qualidade do ar em Toronto a níveis classificados como “muito alto risco” (índice 10+). Monitoramentos da IQAir chegaram a colocar Toronto e Detroit entre as piores cidades do mundo em qualidade do ar.

Nos Estados Unidos, alertas abrangem o Médio Oeste superior, a região dos Grandes Lagos e o Nordeste. Nova York registrou ar “não saudável”, e autoridades pediram redução de atividades físicas ao ar livre. A névoa ocorre dias antes da final da Copa do Mundo 2026, marcada para o dia 19 em Nova Jersey.

Especialistas esperam melhora gradual com mudança dos ventos no fim de semana. A Mundo News reforça orientações oficiais de saúde pública e evita alarmismo sem base em dados meteorológicos.`,
    category: 'mundo',
    author: 'Carlos Mendes',
    authorRole: 'Correspondente — Nova York',
    publishedAt: '2026-07-16T06:45:00',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    imageAlt: 'Paisagem coberta por fumaça e névoa',
    isBreaking: true,
    tags: ['Canadá', 'incêndios', 'clima', 'saúde'],
  },
  {
    id: '5',
    slug: 'pix-alvo-investigacao-ustr-tarifas',
    title: 'Pix entra no centro da disputa comercial: EUA acusam Brasil de favorecer sistema nacional',
    excerpt:
      'Relatório do USTR aponta conflito de interesses do Banco Central no Pix. Lula já disse que o sistema “é do Brasil” e não será negociado.',
    content: `O sistema de pagamentos instantâneos Pix tornou-se um dos eixos da investigação comercial norte-americana que resultou nas tarifas de 25%, segundo documentos do USTR e reportagens da BBC News Brasil.

Washington alega que políticas brasileiras favorecem o “campeão nacional” Pix em detrimento de empresas americanas de meios de pagamento. O relatório também questiona o papel do Banco Central como regulador e operador do sistema.

Do lado brasileiro, o argumento é de que o Pix é infraestrutura pública digital e patrimônio nacional. Em abril, o presidente Lula afirmou: “O Pix é do Brasil e ninguém vai fazer a gente mudar o Pix.” Em nota desta semana, o governo classificou as alegações como descabidas.

Especialistas em comércio internacional alertam que o tema mistura soberania tecnológica e disputa tarifária. A Mundo News apresenta as acusações e as respostas oficiais lado a lado, sem qualificar o mérito político da controvérsia.`,
    category: 'brasil',
    author: 'Lis Ramalho Barbosa',
    authorRole: 'Jornalista e colunista — Brasília',
    publishedAt: '2026-07-16T06:15:00',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    imageAlt: 'Pagamento digital por celular',
    tags: ['Pix', 'EUA', 'Banco Central', 'tecnologia'],
  },
  {
    id: '6',
    slug: 'rs-alerta-temporais-rios-atmosfericos',
    title: 'Defesa Civil do RS emite alerta para temporais ligados a “rios atmosféricos”',
    excerpt:
      'Previsão aponta chuva intensa e risco de temporais no Sul. Meteorologistas explicam o papel dos corredores de umidade na atmosfera.',
    content: `A Defesa Civil do Rio Grande do Sul emitiu alerta para temporais nesta semana de julho de 2026, com previsão de chuvas intensas associadas à passagem de umidade concentrada na atmosfera — fenômeno conhecido como “rio atmosférico”, conforme cobertura da BBC News Brasil.

Rios atmosféricos são longos corredores de vapor d’água que, ao encontrar frentes frias ou relevo, podem gerar acumulados elevados de chuva em curto período. Em episódios anteriores, o fenômeno já contribuiu para enchentes e deslizamentos no Sul do país.

Autoridades pedem atenção a boletins municipais, risco de alagamentos e ventos fortes. A Mundo News recomenda acompanhamento dos canais oficiais da Defesa Civil e evita reproduzir informações não confirmadas sobre danos até que haja balanços oficiais.`,
    category: 'brasil',
    author: 'Mirian Ramalho',
    authorRole: 'Editora-chefe — Curitiba',
    publishedAt: '2026-07-15T22:30:00',
    imageUrl: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80',
    imageAlt: 'Tempestade com raios e céu escuro durante alerta de temporais',
    tags: ['clima', 'Rio Grande do Sul', 'Defesa Civil'],
  },
  {
    id: '7',
    slug: 'copa-2026-final-domingo-qualidade-ar-nova-jersey',
    title: 'Copa do Mundo 2026: final no domingo em Nova Jersey sob alerta de fumaça',
    excerpt:
      'Decisão do Mundial está marcada para 19 de julho. Autoridades de Nova York pedem cautela com a qualidade do ar por causa dos incêndios no Canadá.',
    content: `A final da Copa do Mundo 2026 está marcada para domingo, 19 de julho, em Nova Jersey, no MetLife Stadium, no mesmo complexo que sediou a estreia do Brasil no torneio. A informação consta do calendário oficial da FIFA e de coberturas da imprensa esportiva internacional.

A proximidade da decisão coincide com alerta de qualidade do ar no Nordeste americano, causado pela fumaça de incêndios florestais no Canadá. Autoridades de Nova York pediram redução de atividades intensas ao ar livre nesta quarta e quinta-feira.

Organizadores e autoridades locais acompanham as condições atmosféricas. Não há, até o momento, indicação oficial de adiamento da final. A Mundo News atualiza a cobertura esportiva com base em fontes oficiais da FIFA e órgãos de saúde pública.`,
    category: 'mundo',
    author: 'Lis Ramalho Barbosa',
    authorRole: 'Jornalista e colunista — Brasília',
    publishedAt: '2026-07-15T20:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&q=80',
    imageAlt: 'Bola de futebol em campo de gramado',
    tags: ['Copa do Mundo', 'futebol', 'EUA'],
  },
  {
    id: '8',
    slug: 'petroleo-sobe-bloqueio-ormuz-mercados',
    title: 'Petróleo sobe com bloqueio no Estreito de Ormuz e queda no tráfego de navios',
    excerpt:
      'Cruzamentos no estreito caem bem abaixo da média pré-conflito. Analistas ligam volatilidade dos preços à disputa naval entre EUA e Irã.',
    content: `O mercado internacional de petróleo reagiu à reimposição do bloqueio naval americano a portos iranianos e à queda no tráfego pelo Estreito de Ormuz, rota por onde passa parcela crítica do petróleo mundial, segundo BBC e dados de inteligência marítima.

Em 15 de julho, monitoramentos apontaram apenas 11 petroleiros e cargueiros cruzando o estreito, número muito inferior à média pré-conflito, estimada em cerca de 138 embarcações por dia. O Centcom afirmou ter redirecionado navios e desabilitado o petroleiro Belma após avisos ignorados.

Investidores acompanham o risco de prolongamento do conflito e o efeito sobre fretes e seguros. A Mundo News separa cotações e fatos verificados de especulação sobre preços futuros.`,
    category: 'mundo',
    author: 'Carlos Mendes',
    authorRole: 'Correspondente — Nova York',
    publishedAt: '2026-07-15T18:40:00',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    imageAlt: 'Gráficos de mercado e commodities',
    tags: ['petróleo', 'mercados', 'Ormuz'],
  },
  {
    id: '9',
    slug: 'opiniao-tarifas-fatos-alem-do-ruido-eleitoral',
    title: 'Opinião: No tarifaço, o leitor precisa de fatos — não só de narrativa eleitoral',
    excerpt:
      'A disputa comercial com os EUA mistura diplomacia, economia e campanha. O jornalismo responsável separa o que está documentado do que é acusação política.',
    content: `A imposição de tarifas de 25% pelos Estados Unidos sobre produtos brasileiros já virou combustível de campanha no Brasil. De um lado, o governo acusa adversários de terem colaborado com Washington; de outro, a oposição atribui o desfecho à condução diplomática do Planalto.

Para o leitor, o essencial é distinguir três camadas: (1) o que o USTR publicou e quando a medida vale; (2) o que o governo brasileiro anunciou como resposta institucional; (3) o que são interpretações partidárias.

Fontes como BBC, Agência Brasil e o próprio comunicado do USTR permitem reconstruir a linha do tempo sem transformar cada manchete em arma eleitoral. Imparcialidade não é fingir que não há conflito: é mostrar documentos, datas, exceções tarifárias e posições oficiais com clareza.

Na Mundo News, nossa regra permanece: verificar antes de publicar, contextualizar impacto econômico e não confundir opinião com reportagem.`,
    category: 'opiniao',
    author: 'Mirian Ramalho',
    authorRole: 'Editora-chefe',
    publishedAt: '2026-07-16T05:30:00',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    imageAlt: 'Redação e monitoramento de notícias',
    tags: ['jornalismo', 'tarifas', 'imparcialidade'],
  },
  {
    id: '10',
    slug: 'artigo-como-ler-cobertura-ormuz-e-tarifas',
    title: 'Artigo: Como acompanhar, com método, as crises de Ormuz e do tarifaço',
    excerpt:
      'Dois eixos dominam a agenda global desta semana. Um guia prático para cruzar fontes sem cair em desinformação.',
    content: `Em 16 de julho de 2026, duas agendas se sobrepõem: a escalada militar em torno do Estreito de Ormuz e a retaliação tarifária dos EUA contra o Brasil. Em crises simultâneas, o risco de informação incompleta cresce.

Método recomendado pela redação da Mundo News:

1. Priorize agências e veículos com correção pública (Reuters, AP, BBC, Agência Brasil).
2. Separe comunicado oficial de análise de comentarista.
3. Confira datas de vigência — no tarifaço, 22 de julho é o marco operacional.
4. Em conflitos armados, desconfie de números de baixas sem atribuição a fonte nomeada.
5. Observe o que ficou de fora da medida: no caso brasileiro, isenções a café, carne e suco de laranja importam tanto quanto a alíquota de 25%.

Cobertura responsável é ritmo sustentado de verificação, não corrida por clique.`,
    category: 'artigo',
    author: 'Elena Volkov',
    authorRole: 'Correspondente — Londres',
    publishedAt: '2026-07-15T16:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
    imageAlt: 'Jornais e portais de notícias',
    tags: ['mídia', 'verificação', 'geopolítica'],
  },
  {
    id: '11',
    slug: 'governo-brasil-plano-soberano-danos-tarifas',
    title: 'Governo diz que usará Plano Brasil Soberano para proteger setores atingidos',
    excerpt:
      'Nota oficial promete preservar empregos e diversificar mercados. Itamaraty e equipe econômica avaliam retaliação calibrada.',
    content: `Além de anunciar o acionamento da Lei de Reciprocidade e da OMC, o governo brasileiro afirmou que manterá, pelo Plano Brasil Soberano, medidas de proteção aos setores afetados pelas tarifas americanas de 25%.

Segundo a nota da Secom, o objetivo é preservar empregos e capacidade produtiva, ao mesmo tempo em que o país busca diversificar parcerias comerciais — citando acordos do Mercosul com União Europeia, EFTA e Singapura.

O ministro da Fazenda, Dario Durigan, já havia sinalizado na terça-feira (14) que a reciprocidade voltaria à mesa caso o tarifaço fosse confirmado. Diplomatas e o MDIC também admitiam desfecho desfavorável nas negociações de última hora.

A Mundo News acompanhará decretos, listas de produtos e eventuais medidas compensatórias assim que forem publicados em Diário Oficial ou documentos oficiais.`,
    category: 'brasil',
    author: 'Lis Ramalho Barbosa',
    authorRole: 'Jornalista e colunista — Brasília',
    publishedAt: '2026-07-15T21:20:00',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    imageAlt: 'Brasília e atividade de governo',
    tags: ['governo', 'economia', 'comércio exterior'],
  },
  {
    id: '12',
    slug: 'opiniao-fumaca-transfronteirica-clima-saude',
    title: 'Opinião: Fumaça sem fronteira exige política climática com urgência sanitária',
    excerpt:
      'Incêndios no Canadá afetam milhões nos EUA. A crise do ar é lembrete de que clima e saúde pública já são agenda de segurança.',
    content: `Quando a fumaça de incêndios canadenses transforma Toronto e cidades americanas em zonas de ar “perigoso”, o debate climático deixa o campo abstrato e entra no cotidiano: escolas, esportes ao ar livre e até a logística de um Mundial de futebol.

Não se trata de culpar um único verão. Trata-se de reconhecer que eventos extremos recorrentes exigem preparação sanitária, alertas claros e cooperação internacional. Autoridades que pedem “fique em casa” cumprem papel imediato; governos que só reagirem depois da crise falham no médio prazo.

O jornalismo, por sua vez, deve evitar tanto o negacionismo quanto o espetáculo do desastre. Dados de Environment Canada, NOAA e IQAir são o chão factual. O resto é contextualização responsável.`,
    category: 'opiniao',
    author: 'Elena Volkov',
    authorRole: 'Correspondente — Londres',
    publishedAt: '2026-07-16T05:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
    imageAlt: 'Debate público e sociedade',
    tags: ['clima', 'saúde', 'opinião'],
  },
  {
    id: '13',
    slug: 'artigo-rede-correspondentes-crise-dupla',
    title: 'Artigo: Como a Mundo News cobre ao mesmo tempo Brasília e o Golfo',
    excerpt:
      'Uma crise comercial e uma crise militar exigem mesas editoriais distintas — e o mesmo padrão de verificação.',
    content: `Cobrir simultaneamente o tarifaço EUA-Brasil e a escalada no Estreito de Ormuz exige disciplina editorial. Na Mundo News, a editoria de Brasília liderada por Lis Ramalho Barbosa cruza notas oficiais, documentos do USTR e reações industriais. A cobertura internacional, com apoio de correspondentes e agências, prioriza Centcom, autoridades do Golfo e reportagens de AP/BBC/Reuters.

A edição central em Curitiba, sob Mirian Ramalho, decide o que sobe para destaque, o que vai para breaking e o que espera confirmação. Tecnologia e publicação ficam a cargo de Jorge Ramalho Barbosa, para que o portal permaneça estável em picos de audiência.

O método não muda com a urgência: atribuir fonte, datar fatos, corrigir com transparência.`,
    category: 'artigo',
    author: 'Mirian Ramalho',
    authorRole: 'Editora-chefe',
    publishedAt: '2026-07-15T14:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    imageAlt: 'Mapa mundial e rede de correspondentes',
    tags: ['correspondentes', 'redação', 'método'],
  },
  {
    id: '14',
    slug: 'trump-ameaca-novos-ataques-ira-negociacoes',
    title: 'Trump pressiona Irã a retomar negociações sob ameaça de novos ataques',
    excerpt:
      'Presidente americano exige que Teerã “se comporte” e volte às conversas. Irã mantém retaliação e chama Ormuz de linha vermelha.',
    content: `O presidente dos Estados Unidos, Donald Trump, voltou a pressionar o Irã a retomar negociações, alertando para novas ações militares caso Teerã não “se comporte”, conforme relatos da BBC e da imprensa americana nesta semana.

A declaração ocorre enquanto Washington amplia a campanha de ataques e reativa o bloqueio naval. O Irã, por sua vez, afirma ter atingido bases e instalações ligadas aos EUA na região e rejeita concessões sobre o Estreito de Ormuz.

Diplomatas e analistas descrevem um impasse: cada lado acusa o outro de violar o entendimento de junho. A Mundo News registra as declarações atribuídas a fontes nomeadas e evita projetar desfechos militares sem evidência.`,
    category: 'mundo',
    author: 'Ahmed Hassan',
    authorRole: 'Correspondente — Cairo',
    publishedAt: '2026-07-15T17:10:00',
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    imageAlt: 'Diplomacia e tensão internacional',
    tags: ['Trump', 'Irã', 'diplomacia'],
  },
  {
    id: '15',
    slug: 'brasil-segundo-mais-tarifado-eua-analise',
    title: 'Com nova tarifa, Brasil pode virar 2º país mais tarifado pelos EUA, diz estudo',
    excerpt:
      'Global Trade Alert estima que alíquota média efetiva brasileira subiria para cerca de 14,9%, atrás apenas da China.',
    content: `Cálculos do projeto Global Trade Alert (GTA), citados pela BBC News Brasil, indicam que, com as novas tarifas de 25%, o Brasil pode se tornar o segundo país com maiores tarifas efetivas impostas pelos Estados Unidos, atrás da China.

Hoje o Brasil aparece em posição intermediária no ranking de tarifas efetivas; com a medida, a média efetiva estimada subiria para cerca de 14,9%. O GTA também aponta o Brasil como um dos países com maior aumento tarifário no segundo mandato de Trump.

Os números consideram tarifas efetivas — não apenas alíquotas nominais — e ajudam a dimensionar o choque comercial além do debate político doméstico. A Mundo News trata as projeções como estimativas de centro de pesquisa, não como decisão oficial do USTR.`,
    category: 'brasil',
    author: 'Mirian Ramalho',
    authorRole: 'Editora-chefe — Curitiba',
    publishedAt: '2026-07-15T19:50:00',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    imageAlt: 'Análise econômica e comércio global',
    tags: ['tarifas', 'China', 'comércio'],
  },
];

function sortByDate(items: NewsArticle[]): NewsArticle[] {
  return [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: NewsArticle['category']): NewsArticle[] {
  return articles.filter((a) => a.category === category);
}

export function getBreakingNews(): NewsArticle[] {
  return articles.filter((a) => a.isBreaking);
}

export function getFeaturedArticle(): NewsArticle | undefined {
  return articles.find((a) => a.isFeatured);
}

export function getLatestArticles(limit = 10): NewsArticle[] {
  return sortByDate(articles).slice(0, limit);
}

export function getSportsArticles(limit = 6): NewsArticle[] {
  return sortByDate(articles.filter((a) => a.category === 'esporte')).slice(0, limit);
}

export function searchArticles(query: string, limit = 50): NewsArticle[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const terms = normalized.split(/\s+/).filter(Boolean);

  return sortByDate(
    articles.filter((article) => {
      const haystack = [
        article.title,
        article.excerpt,
        article.author,
        article.authorRole,
        ...article.tags,
      ]
        .join(' ')
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    }),
  ).slice(0, limit);
}
