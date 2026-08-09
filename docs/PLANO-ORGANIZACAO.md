# Plano de Organização e Documentação — Mundo News

**Data:** 08/08/2026  
**Objetivo:** Estruturar o projeto para manutenção profissional, deploy confiável e evolução incremental.

---

## Fase 0 — Concluída nesta auditoria

- [x] Varredura Playwright do site em `http://127.0.0.1:5502/html5/index.html`
- [x] Avaliação de SEO, UX, UI, responsividade, tipografia e arquitetura
- [x] Mapeamento completo da estrutura de pastas
- [x] Mapeamento do ecossistema externo (`Projetos/`, serviços cloud)
- [x] Criação da pasta `docs/` com documentação profissional
- [x] Identificação de backlog priorizado (P0–P3)

---

## Fase 1 — Correções imediatas (1–3 dias)

### 1.1 Assets faltantes

| Ação | Arquivo | Detalhe | Status |
|------|---------|---------|--------|
| Criar imagem OG | `public/og-image.svg` | 1200×630, logo + slogan | ✅ Concluído |
| Resolver logo | `public/logo.svg` | Logo horizontal com texto | ✅ Concluído |
| Validar favicons | `public/*` | Testar em Facebook Debugger e Twitter Card Validator | Pendente (manual) |

### 1.2 Acessibilidade rápida

- [x] Corrigir 2 imagens sem `alt` (Logo header + footer)
- [x] Adicionar `mailto:` no e-mail do footer
- [x] Adicionar `aria-live="polite"` na top bar de cotações

### 1.3 Documentação

- [x] `docs/AUDITORIA-COMPLETA.md`
- [x] `docs/MAPEAMENTO-ESTRUTURA.md`
- [x] `docs/PLANO-ORGANIZACAO.md`
- [x] Atualizar `README.md` na raiz

### 1.4 README profissional

- [x] README reescrito com badges, scripts e links para docs

---

## Fase 2 — SEO e indexação (1 semana)

### 2.1 Metadados dinâmicos

- [x] Instalar `react-helmet-async`
- [x] Criar componente `PageMeta`
- [x] Implementar em HomePage, CategoryPage, ArticlePage, AboutPage, NotFoundPage
- [x] Título, description, OG, Twitter Card e canonical por rota

### 2.2 Roteamento para SEO

- [x] Migrar `HashRouter` → `BrowserRouter`
- [x] Adicionar `public/_redirects` (Netlify SPA fallback)
- [x] Alterar `base: '/'` no Vite para rotas aninhadas

### 2.3 Arquivos de descoberta

- [x] `public/robots.txt`
- [x] `public/sitemap.xml` gerado automaticamente no build

### 2.4 Dados estruturados

- [x] JSON-LD `Organization` + `WebSite` na home
- [x] JSON-LD `NewsArticle` + `BreadcrumbList` em artigos
- [x] JSON-LD `BreadcrumbList` em categorias e sobre

---

## Fase 3 — Qualidade e acessibilidade (2 semanas)

### 3.1 Substituir marquee

- [x] Ticker com CSS `@keyframes` (sem `<marquee>` HTML)
- [x] `role="region"` em vez de `role="marquee"`
- [x] Lista acessível (`sr-only`) para leitores de tela
- [x] Pausa em hover/focus
- [x] `prefers-reduced-motion: reduce`
- [x] Correção de contraste WCAG nos badges e footer

### 3.2 Testes automatizados

- [x] `playwright.config.ts`
- [x] `tests/home.spec.ts` — SEO, headings, links
- [x] `tests/article.spec.ts` — metadados, conteúdo
- [x] `tests/responsive.spec.ts` — 375, 768, 1440
- [x] `tests/a11y.spec.ts` — axe-core
- [x] **22 testes passando**

### 3.3 CI básico

- [x] `.github/workflows/ci.yml` — build + Playwright
- [x] Scripts `npm test`, `npm run test:ui`, `npm run test:report`

---

## Fase 4 — Reorganização estrutural ✅

### 4.1 Migração para `src/`

- [x] Criar `src/` e mover `react/` → `src/`
- [x] Mover `css3/` → `src/styles/`
- [x] Mover `javascript/` → `src/lib/`
- [x] Atualizar aliases em `tsconfig.json` e `vite.config.ts`
- [x] Manter `html5/index.html` como entry Vite; `index.html` na raiz para Live Server
- [x] Testar `npm run build` e `npm test`
- [x] Remover pastas legadas (`react/`, `css3/`, `javascript/`)
- [x] Atualizar documentação

### 4.2 Padronização de nomes

| Anterior | Atual |
|----------|-------|
| `css3/` | `src/styles/` |
| `javascript/` | `src/lib/` |
| `html5/` + raiz | `html5/index.html` (Vite) + `index.html` (Live Server) |
| `react/` | `src/` |

### 4.3 Separação de concerns

```
src/
├── features/
│   ├── news/           ← pages + components + data de notícias
│   ├── about/          ← página sobre + correspondentes
│   ├── weather/        ← sidebar clima
│   ├── markets/        ← top bar cotações
│   └── horoscope/      ← sidebar horóscopo
├── shared/
│   ├── components/     ← Header, Footer, Layout, PageMeta
│   ├── pages/          ← NotFoundPage
│   └── types/          ← NewsArticle, NewsCategory, etc.
├── lib/                ← brand, seo, router, APIs
└── styles/             ← style.css, components.css
```

---

## Fase 5 — Evolução do produto (backlog)

| Item | Esforço | Valor |
|------|---------|-------|
| CMS headless (Sanity, Contentful) | Alto | Alto |
| Busca full-text | Médio | Alto |
| Newsletter / RSS feed | Médio | Médio |
| Dark mode | Baixo | Médio |
| Comentários (Disqus, giscus) | Baixo | Baixo |
| Analytics (Plausible, GA4) | Baixo | Alto |
| Internacionalização EN/ES | Alto | Médio |

---

## Cronograma Sugerido

```
Semana 1   │ Fase 1 (assets, a11y, README)
Semana 2   │ Fase 2 (SEO, metadados, sitemap)
Semana 3–4 │ Fase 3 (testes, marquee, CI)
Mês 2      │ Fase 4 (reorganização src/) ✅ concluída
Contínuo   │ Fase 5 (features de produto)
```

---

## Critérios de Aceite

### Fase 1
- [x] og-image acessível em produção
- [x] 0 imagens sem alt na home
- [x] README atualizado e legível

### Fase 2
- [x] Cada artigo com `<title>` único
- [x] Lighthouse SEO ≥ 90 (validar manualmente em produção)
- [x] sitemap.xml válido

### Fase 3
- [x] 0 erros axe-core críticos
- [x] Testes Playwright passando no CI
- [x] Marquee removido

### Fase 4
- [x] Build e deploy funcionando após migração
- [x] Aliases atualizados (`@/*`, `@js/*`, `@css/*`)
- [x] Documentação refletindo nova estrutura

---

## Pesquisas Recomendadas

| Tema | Recurso | Motivo |
|------|---------|--------|
| SEO em SPA React | [Google: SPA SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) | HashRouter vs BrowserRouter |
| Metadados dinâmicos | react-helmet-async docs | Títulos por rota |
| Acessibilidade marquee | WCAG 2.2 — Moving Content | Substituir ticker |
| Netlify SPA | `_redirects` file | Fallback para BrowserRouter |
| Schema.org NewsArticle | schema.org/NewsArticle | JSON-LD |
| Core Web Vitals | web.dev/vitals | Performance |
| Playwright testing | playwright.dev | Automação de QA |

---

*Plano de organização — Mundo News — Atualizado 09/08/2026 (Fases 0–4 concluídas)*
