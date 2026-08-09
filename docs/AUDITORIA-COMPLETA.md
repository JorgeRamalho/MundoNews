# Auditoria Completa — Mundo News

**Data:** 08/08/2026  
**Ambiente testado:** Live Server `http://127.0.0.1:5502/html5/index.html`  
**Ferramenta:** Playwright (varredura automatizada + avaliação manual)  
**Versão do projeto:** 1.0.0

---

## 1. Resumo Executivo

O **Mundo News** é um portal de notícias em português (Brasil) construído com **React 18 + TypeScript + Vite**, com identidade editorial forte (“A verdade em primeiro lugar”). O produto está funcional, com boa hierarquia de conteúdo, tipografia profissional e componentes bem segmentados.

| Área | Nota | Status |
|------|------|--------|
| SEO | 5/10 | Crítico — hash routing, metadados estáticos, OG image ausente |
| Usabilidade | 8/10 | Bom — navegação clara, semântica HTML adequada |
| Responsividade | 8/10 | Bom — breakpoints múltiplos, menu mobile funcional |
| Layout & UI | 8.5/10 | Muito bom — padrão portal de notícias reconhecível |
| Identidade Visual | 9/10 | Excelente — paleta, tipografia e emojis consistentes |
| Acessibilidade | 7/10 | Razoável — marquee e emojis em títulos prejudicam leitores de tela |
| Performance | 7/10 | Razoável — fontes externas, APIs de terceiros com CORS |
| Arquitetura de Código | 7.5/10 | Bom — separação react/css/js, aliases configurados |
| Documentação | 3/10 | Crítico — README desatualizado e mal formatado |

**Prioridade imediata:** ~~corrigir SEO~~ **Concluído (Fases 1–4, 09/08/2026).** Próximo passo: Fase 5 (backlog de produto).

### Status pós-implementação (09/08/2026)

| Área | Nota anterior | Nota atual | Melhorias aplicadas |
|------|---------------|------------|---------------------|
| SEO | 5/10 | 8.5/10 | BrowserRouter, PageMeta, sitemap, JSON-LD, robots.txt |
| Acessibilidade | 7/10 | 8.5/10 | Ticker acessível, contraste WCAG, axe-core 0 críticos |
| Arquitetura | 7.5/10 | 9/10 | Migração `src/` com features (news, about, weather…) |
| Documentação | 3/10 | 9/10 | README, docs/, mapeamento, plano, CI |
| Qualidade | — | 9/10 | 22 testes Playwright + GitHub Actions CI |

---

## 2. Varredura Playwright — Resultados

### 2.1 Página inicial (desktop 1440×900)

- **Título:** `🌎 Mundo News — 📰 A verdade em primeiro lugar`
- **Idioma:** `pt-BR` ✓
- **H1 único:** ✓ (`Os fatos do Brasil e do mundo, em tempo real`)
- **Imagens:** 15 total, **2 sem atributo `alt`**
- **Links sem texto:** 0 ✓
- **Canonical:** ausente ✗
- **JSON-LD:** ausente ✗
- **Console:** 2 erros (CORS Yahoo Finance — Ibovespa)

### 2.2 Página de artigo (`#/noticia/eua-tarifas-25-brasil-...`)

- Estrutura semântica correta: `<main>` → `<article>` → `<h1>`
- Metadados do autor e data presentes
- Tags de categoria visíveis (Brasil, Urgente)
- **Título da aba não muda** — permanece o título genérico da home ✗
- Navegação “Voltar às notícias” presente ✓

### 2.3 Mobile (375×812)

- Menu hambúrguer visível (nav colapsada) ✓
- Layout empilhado corretamente
- Top bar de cotações adapta para coluna ✓
- Sidebar desce abaixo do conteúdo principal ✓

### 2.4 Erros de console detectados

```
[ERROR] CORS: fetch Yahoo Finance (^BVSP) bloqueado em http://127.0.0.1:5502
```

**Mitigação existente:** `markets.ts` usa proxy `api.allorigins.win` como fallback — cotações carregam após retry (confirmado: Ibovespa 172.513, Dólar R$ 5,08).

---

## 3. SEO — Análise Detalhada

### 3.1 Pontos positivos

- `lang="pt-BR"` no `<html>`
- Meta `description` presente e descritiva
- Open Graph e Twitter Card configurados
- `theme-color`, `manifest` e ícones PWA
- Estrutura de headings hierárquica (H1 → H2 → H3)
- Textos alternativos na maioria das imagens
- URLs amigáveis por slug (`/noticia/eua-tarifas-25-brasil-...`)

### 3.2 Problemas críticos

| Problema | Impacto | Evidência |
|----------|---------|-----------|
| **HashRouter (`#/`)** | Alto | URLs não indexáveis individualmente por crawlers |
| **Título estático em todas as rotas** | Alto | Artigos não aparecem com título próprio no Google |
| **`og-image.svg` inexistente** | Alto | Compartilhamento social sem preview |
| **Caminho relativo em OG image** | Médio | `../public/og-image.svg` não resolve em produção |
| **Sem `<link rel="canonical">`** | Médio | Risco de conteúdo duplicado |
| **Sem JSON-LD** | Médio | Perde rich snippets (NewsArticle, Organization) |
| **Emojis no `<title>` e OG** | Baixo | Truncamento em SERP e redes sociais |
| **`meta keywords`** | Baixo | Ignorado pelos buscadores desde 2009 |
| **Sem `robots.txt` / `sitemap.xml`** | Médio | Crawlers sem mapa do site |

### 3.3 Recomendações SEO

1. Migrar de `HashRouter` para `BrowserRouter` + configuração de fallback no servidor (Netlify `_redirects` ou `vercel.json`)
2. Implementar `react-helmet-async` ou equivalente para metadados dinâmicos por rota
3. Criar `public/og-image.png` (1200×630) e `public/robots.txt`, `public/sitemap.xml`
4. Adicionar JSON-LD `NewsArticle` em páginas de matéria e `Organization` na home
5. Remover emojis de `<title>` e meta OG (manter apenas no conteúdo visual)

---

## 4. Usabilidade & UX

### 4.1 Pontos fortes

- **Navegação principal** com 7 seções claras (Início, Brasil, Mundo, Opinião, Esporte, Artigos, Sobre)
- **Ticker de urgências** com links diretos às matérias
- **Destaque editorial** acima da dobra
- **Sidebar rica:** últimas notícias, alerta ao leitor, fontes, clima, esporte, horóscopo
- **Bloco editorial** reforça credibilidade jornalística
- **Seção de equipe** humaniza a marca
- **Botão voltar ao topo** e scroll automático em mudança de rota
- **Estados de erro** (404) com mensagem clara

### 4.2 Pontos de melhoria

| Item | Severidade | Sugestão |
|------|------------|----------|
| Marquee animado (`<marquee>`) | Alta (a11y) | Substituir por CSS animation com `prefers-reduced-motion` |
| Excesso de emojis em links de nav | Média | Manter emojis só no visual, não no texto acessível |
| Sem busca | Média | Adicionar campo de busca no header |
| Sem breadcrumbs em artigos | Baixa | `Início > Brasil > Título da matéria` |
| Horóscopo sem persistência | Baixa | Salvar signo selecionado em `localStorage` |
| Footer: e-mail sem `mailto:` | Baixa | `<a href="mailto:redacao@mundonews.com.br">` |

### 4.3 Jornada do usuário

```
Entrada → Hero + Destaque → Grid de notícias → Artigo completo
                ↓
         Sidebar (clima, esporte, fontes)
                ↓
         Editorial / Equipe → Footer / Contato
```

Fluxo coerente para portal de notícias. Tempo até primeira notícia: imediato (destaque acima da dobra).

---

## 5. Responsividade

### Breakpoints identificados no CSS

| Breakpoint | Uso |
|------------|-----|
| `max-width: 480px` | Tipografia e espaçamentos mínimos |
| `max-width: 560px` | Grids compactos |
| `max-width: 720px` | Top bar em coluna |
| `max-width: 768px` | Header mobile, grids 1 coluna |
| `max-width: 900px` | Sidebar abaixo do main |
| `max-width: 1023px` | Ajustes de layout intermediário |
| `min-width: 1024px` | Grid home 2 colunas (main + sidebar) |

### Testes Playwright

| Viewport | Resultado |
|----------|-----------|
| 1440×900 (desktop) | Layout 2 colunas, nav horizontal ✓ |
| 375×812 (mobile) | Menu hambúrguer, conteúdo empilhado ✓ |

**Recomendação:** adicionar teste em 768×1024 (tablet) e validar touch targets ≥ 44px no menu mobile.

---

## 6. Layout & UI Design

### 6.1 Estrutura visual (top → bottom)

1. **Top Bar** — cotações de mercado (fundo escuro `#1a1a2e`)
2. **Breaking Ticker** — faixa vermelha com notícias urgentes
3. **Header** — logo + navegação
4. **Hero** — slogan editorial com CTA
5. **Info Status Bar** — relógio de Brasília
6. **Main Grid** — destaque + últimas notícias + editorial
7. **Sidebar** — widgets informativos
8. **Truth Banner** — reforço de missão
9. **Equipe** — cards de correspondentes
10. **Footer** — seções, institucional, contato

### 6.2 Sistema de design

```css
--color-primary:     #c41e3a  /* Vermelho editorial */
--color-secondary:   #1a1a2e  /* Azul escuro */
--color-accent:      #e8b923  /* Dourado */
--color-bg:          #f8f7f4  /* Off-white */
--font-serif:        Merriweather
--font-sans:         Source Sans 3
--max-width:         1280px
```

### 6.3 Componentes UI

| Componente | Arquivo | Função |
|------------|---------|--------|
| TopBar | `TopBar.tsx` | Cotações financeiras |
| BreakingTicker | `BreakingTicker.tsx` | Faixa de urgências |
| Header | `Header.tsx` | Logo + nav + menu mobile |
| NewsCard | `NewsCard.tsx` | Card de notícia (normal e destaque) |
| Sidebar | `Sidebar.tsx` | Agregador de widgets |
| EditorialBlock | `EditorialBlock.tsx` | Blocos de credibilidade |
| TruthBanner | `TruthBanner.tsx` | Banner de missão |
| Correspondents | `Correspondents.tsx` | Equipe editorial |

### 6.4 Badges de categoria

Cores semânticas por seção: Brasil (verde), Mundo (azul), Opinião (roxo), Artigo (verde escuro), Esporte (verde petróleo), Urgente (vermelho pulsante).

---

## 7. Identidade Visual & Tipografia

### 7.1 Marca

- **Nome:** Mundo News
- **Slogan:** A verdade em primeiro lugar
- **Proposta:** Jornalismo independente, verificação de fatos, correspondentes globais
- **Tom:** Sério, ético, com emojis como elemento de personalidade (uso moderado recomendado)

### 7.2 Tipografia

| Uso | Fonte | Peso |
|-----|-------|------|
| Títulos (H1–H6) | Merriweather (serif) | 400, 700, 900 |
| Corpo e UI | Source Sans 3 (sans) | 400, 600, 700 |
| Base | 16px | line-height 1.6 |

**Avaliação:** combinação clássica de portal jornalístico (serif para credibilidade + sans para legibilidade). Carregamento via Google Fonts — considerar `font-display: swap` e subset `latin` para performance.

### 7.3 Assets de marca

| Arquivo | Status |
|---------|--------|
| `public/favicon.svg` | ✓ Existe |
| `public/logo-icon.svg` | ✓ Existe |
| `public/apple-touch-icon.svg` | ✓ Existe |
| `public/logo.svg` | ✗ Referenciado em `brand.ts`, **ausente** |
| `public/og-image.svg` | ✗ Referenciado em `index.html`, **ausente** |

---

## 8. Arquitetura & Estratégia de Desenvolvimento

### 8.1 Stack

```
HTML5 → React 18 → TypeScript 5.6 → Vite 5.4 → React Router 6
```

### 8.2 Modos de execução

| Modo | Comando | Entry | Router |
|------|---------|-------|--------|
| Desenvolvimento | `npm run dev` | `html5/main.tsx` → `src/main.tsx` | BrowserRouter |
| Preview / Produção | `npm run build` + `npm run preview` | `dist/` | BrowserRouter |
| Live Server | `npm run build` + Live Server | `index.html` (raiz) | HashRouter (auto) |

Plugin `liveServerRootIndex()` gera `index.html` na raiz; `liveServerEntry()` ajusta paths no dev.

### 8.3 Aliases TypeScript

```
@/*     → src/*
@js/*   → src/lib/*
@css/*  → src/styles/*
```

### 8.4 Fluxo de dados

- Notícias em `src/features/news/data/news.ts` (array estático TypeScript)
- Sem backend/API — adequado para MVP/portfólio
- APIs externas: AwesomeAPI (câmbio), Yahoo Finance (Ibovespa), Open-Meteo (clima)

### 8.5 Deploy

- **Produção:** https://mundonwes.netlify.app/
- **Repositório:** https://github.com/JorgeRamalho/Mundonews
- **CI:** `.github/workflows/ci.yml` — build + Playwright em cada push/PR
- `base: '/'` no Vite — rotas aninhadas e Netlify `_redirects`

---

## 9. Estrutura de Texto & Conteúdo

### 9.1 Formato editorial

- Títulos diretos, estilo manchete jornalística
- Lead (excerpt) em negrito no corpo do artigo
- Parágrafos longos e bem fundamentados (padrão reportagem)
- Tags por matéria
- Atribuição de autor com cargo e cidade
- Datas em formato brasileiro (`16 de jul. de 2026, 07:30`)

### 9.2 Categorias

`brasil` | `mundo` | `opiniao` | `esporte` | `artigo`

### 9.3 Fontes citadas

G1, CNN Brasil, Valor, Folha, Reuters, BBC, Al Jazeera, France 24 — reforça credibilidade editorial.

---

## 10. Inventário de Problemas (Backlog Priorizado)

### P0 — Crítico ✅ Concluído

- [x] Criar `public/og-image.svg` (1200×630)
- [x] Criar `public/logo.svg`
- [x] Metadados dinâmicos por página (título, description, OG)
- [x] Corrigir imagens sem `alt`

### P1 — Alto ✅ Concluído

- [x] Migrar `HashRouter` → `BrowserRouter` (híbrido no Live Server)
- [x] Adicionar `robots.txt` e `sitemap.xml`
- [x] JSON-LD estruturado
- [x] Substituir marquee por ticker acessível
- [x] Atualizar README.md

### P2 — Médio (parcial)

- [ ] Campo de busca
- [x] Breadcrumbs em artigos (JSON-LD BreadcrumbList)
- [x] Testes E2E com Playwright no CI
- [ ] Otimizar fontes (self-host ou subset)
- [x] Reorganizar pastas para convenção `src/`

### P3 — Baixo (backlog)

- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] CMS headless para notícias
- [ ] PWA offline com service worker

---

## 11. Screenshots da Auditoria

Capturas geradas durante a varredura Playwright:

- `audit-desktop-1440.png` — viewport desktop completo
- `audit-mobile-375.png` — viewport mobile completo

---

*Documento gerado como parte da auditoria profissional do projeto Mundo News.*
