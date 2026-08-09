# Mundo News

> **A verdade em primeiro lugar** — Portal de notícias do Brasil e do mundo em tempo real.

[![Demo](https://img.shields.io/badge/demo-Netlify-00C7B7?style=flat-square)](https://mundonwes.netlify.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

## Demo

| Ambiente | URL |
|----------|-----|
| Produção | https://mundonwes.netlify.app/ |
| Desenvolvimento | `npm run dev` → http://localhost:5173 |
| Preview (SPA + SEO) | `npm run build` + `npm run preview` → http://localhost:4173 |
| Live Server | `npm run build` → clique com botão direito em `index.html` (raiz) → **Open with Live Server** |

## Stack

- **Frontend:** React 18, TypeScript 5.6, React Router 6
- **Build:** Vite 5
- **Estilo:** CSS3 com design tokens (variáveis CSS)
- **Tipografia:** Merriweather (títulos) + Source Sans 3 (corpo)
- **APIs:** AwesomeAPI (câmbio), Yahoo Finance (Ibovespa), Open-Meteo (clima)

## Funcionalidades

- Portal de notícias com destaque, grid e sidebar
- Seções: Brasil, Mundo, Opinião, Esporte, Artigos
- Ticker de notícias urgentes
- Cotações de mercado em tempo real
- Previsão do tempo em capitais globais
- Horóscopo interativo
- Bloco editorial de credibilidade jornalística
- Layout responsivo (mobile, tablet, desktop)
- PWA manifest e ícones

## Como executar

```bash
# Clonar o repositório
git clone https://github.com/JorgeRamalho/Mundonews.git
cd Mundonews

# Instalar dependências
npm install

# Desenvolvimento (Vite HMR)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Build com watch (para Live Server na porta 5502)
npm run liveserver
```

## Estrutura do projeto

```
Projeto-BlogMundoNews/
├── src/
│   ├── features/       # Módulos por domínio (news, about, weather, markets, horoscope)
│   ├── shared/         # Layout, Header, Footer, PageMeta, tipos
│   ├── lib/            # brand, seo, router, APIs (câmbio, clima)
│   └── styles/         # CSS global e de componentes
├── html5/              # Entry HTML + bootstrap Vite
├── public/             # Assets estáticos (ícones, imagens, sitemap)
├── tests/              # Testes E2E Playwright
├── dist/               # Build gerado (gitignored)
└── docs/               # Documentação e auditoria
```

Documentação detalhada: [docs/MAPEAMENTO-ESTRUTURA.md](docs/MAPEAMENTO-ESTRUTURA.md)

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [Auditoria Completa](docs/AUDITORIA-COMPLETA.md) | SEO, UX, UI, responsividade, tipografia |
| [Mapeamento de Estrutura](docs/MAPEAMENTO-ESTRUTURA.md) | Árvore de pastas e dependências |
| [Plano de Organização](docs/PLANO-ORGANIZACAO.md) | Roadmap de melhorias priorizadas |

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento Vite |
| `npm run build` | Compila TypeScript + gera `dist/` |
| `npm run preview` | Preview local do build |
| `npm run liveserver` | Build com watch para Live Server |
| `npm test` | Testes E2E com Playwright |
| `npm run test:ui` | Playwright UI mode |
| `npm run tunnel` | Túnel Cloudflare para compartilhar dev |

## Identidade visual

| Token | Valor |
|-------|-------|
| Primária | `#c41e3a` |
| Secundária | `#1a1a2e` |
| Destaque | `#e8b923` |
| Fundo | `#f8f7f4` |
| Serif | Merriweather |
| Sans | Source Sans 3 |

## Repositório

- **GitHub:** https://github.com/JorgeRamalho/Mundonews

## Autor

**Jorge Ramalho Barbosa**

- LinkedIn: [jorge-r-barbosa](https://www.linkedin.com/in/jorge-r-barbosa-aabb0417b/)
- GitHub: [@JorgeRamalho](https://github.com/JorgeRamalho)
- Contato: (41) 99143-4153

---

© 2026 Mundo News — Todos os direitos reservados.
