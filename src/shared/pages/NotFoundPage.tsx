import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

export default function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Página não encontrada"
        description="A página que você procura não existe ou foi movida."
        noIndex
      />
    <main className="page__main">
      <div className="container not-found">
        <div className="not-found__code">404</div>
        <h1 className="not-found__title">Página não encontrada</h1>
        <p className="not-found__text">
          A página que você procura não existe ou foi movida.
        </p>
        <Link to="/" className="btn btn--primary">Voltar ao início</Link>
      </div>
    </main>
    </>
  );
}
