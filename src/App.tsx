import { Routes, Route } from 'react-router-dom';
import Layout from './shared/components/Layout';
import HomePage from './features/news/pages/HomePage';
import CategoryPage from './features/news/pages/CategoryPage';
import ArticlePage from './features/news/pages/ArticlePage';
import AboutPage from './features/about/pages/AboutPage';
import NotFoundPage from './shared/pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="brasil" element={<CategoryPage category="brasil" />} />
        <Route path="mundo" element={<CategoryPage category="mundo" />} />
        <Route path="opiniao" element={<CategoryPage category="opiniao" />} />
        <Route path="esporte" element={<CategoryPage category="esporte" />} />
        <Route path="artigos" element={<CategoryPage category="artigo" />} />
        <Route path="noticia/:slug" element={<ArticlePage />} />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
