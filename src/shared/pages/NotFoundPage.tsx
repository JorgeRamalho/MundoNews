import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta
        title={t('notFound.title')}
        description={t('notFound.description')}
        noIndex
      />
      <main className="page__main">
        <div className="container not-found">
          <div className="not-found__code">404</div>
          <h1 className="not-found__title">{t('notFound.title')}</h1>
          <p className="not-found__text">{t('notFound.description')}</p>
          <Link to="/" className="btn btn--primary">{t('notFound.backHome')}</Link>
        </div>
      </main>
    </>
  );
}
