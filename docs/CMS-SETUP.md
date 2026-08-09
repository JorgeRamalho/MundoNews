# CMS Headless — Mundo News

O projeto suporta **Sanity** e **Contentful** como CMS headless. Sem configuração, usa o conteúdo estático em `src/features/news/data/news.ts`.

## Como funciona

1. No build (`npm run build`), o plugin `content-pipeline` tenta buscar artigos do CMS configurado.
2. Os artigos são gravados em `src/features/news/data/cms-articles.generated.ts`.
3. Se o CMS retornar artigos, eles substituem o conteúdo estático.
4. Sitemap e RSS são gerados com os artigos finais.

## Sanity

### 1. Criar projeto

1. Acesse [sanity.io](https://www.sanity.io/) e crie um projeto.
2. Anote o **Project ID** e **Dataset** (geralmente `production`).

### 2. Schema do artigo

Crie um document type `article` com os campos:

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `title` | string | sim |
| `slug` | slug | sim |
| `excerpt` | text | sim |
| `content` | text | sim |
| `category` | string | sim (`brasil`, `mundo`, `opiniao`, `esporte`, `artigo`) |
| `author` | string | sim |
| `authorRole` | string | sim |
| `publishedAt` | datetime | sim |
| `image` | image | sim |
| `imageAlt` | string | sim |
| `tags` | array of string | não |
| `isBreaking` | boolean | não |
| `isFeatured` | boolean | não |
| `gallery` | array (image + alt + caption) | não |

### 3. Variáveis de ambiente

```env
VITE_CMS_PROVIDER=sanity
VITE_SANITY_PROJECT_ID=abc123
VITE_SANITY_DATASET=production
SANITY_API_TOKEN=opcional-se-dataset-privado
```

## Contentful

### 1. Criar space e content type

1. Acesse [contentful.com](https://www.contentful.com/).
2. Crie um content type `article` com os mesmos campos listados acima.

### 2. Variáveis de ambiente

```env
VITE_CMS_PROVIDER=contentful
VITE_CONTENTFUL_SPACE_ID=seu-space-id
VITE_CONTENTFUL_ACCESS_TOKEN=seu-delivery-api-token
VITE_CONTENTFUL_ENVIRONMENT=master
```

## Netlify

Adicione as variáveis em **Site settings → Environment variables** e faça um novo deploy.

## Desenvolvimento local

```bash
cp .env.example .env
# Edite .env com suas credenciais
npm run build
```

O arquivo `cms-articles.generated.ts` será atualizado automaticamente.
