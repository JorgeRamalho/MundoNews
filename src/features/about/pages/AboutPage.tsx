import Correspondents from '../components/Correspondents';
import TruthBanner from '../components/TruthBanner';
import PageMeta from '../../../shared/components/PageMeta';
import { SITE_NAME } from '@js/constants';
import { breadcrumbJsonLd } from '@js/seo';

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title={`Sobre o ${SITE_NAME}`}
        description={`Conheça a missão, os valores e a equipe do ${SITE_NAME}. Jornalismo independente com compromisso com a verdade em primeiro lugar.`}
        path="/sobre"
        jsonLd={breadcrumbJsonLd([
          { name: 'Início', path: '/' },
          { name: 'Sobre', path: '/sobre' },
        ])}
      />
    <main className="page__main">
      <div className="container">
        <header className="category-header">
          <h1 className="category-header__title">Sobre o {SITE_NAME}</h1>
          <p className="category-header__description">
            Jornalismo independente com compromisso com a verdade em primeiro lugar.
          </p>
        </header>

        <section className="about-section">
          <h2>Nossa missão</h2>
          <p>
            O {SITE_NAME} nasceu com um propósito claro: trazer os fatos do Brasil
            e do mundo com rigor, independência e compromisso com a verdade. Em um
            cenário de informação abundante e nem sempre confiável, acreditamos que
            o jornalismo de qualidade é mais necessário do que nunca.
          </p>
          <p>
            Nossa equipe está posicionada em Curitiba e Brasília, com suporte em tecnologia da informação, atuando em
            busca da verdade, verificando fatos e contextualizando acontecimentos
            para que você, leitor, possa formar sua opinião com base em informação
            confiável.
          </p>
        </section>

        <section className="about-section">
          <h2>Nossos valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Verdade em primeiro lugar</h3>
              <p>Cada fato é verificado antes de ser publicado. Velocidade sem precisão não é jornalismo.</p>
            </div>
            <div className="value-card">
              <h3>Independência editorial</h3>
              <p>Não nos submetemos a interesses políticos, econômicos ou ideológicos de nenhuma natureza.</p>
            </div>
            <div className="value-card">
              <h3>Cobertura em tempo real</h3>
              <p>Notícias publicadas assim que os fatos são confirmados, com atualizações contínuas.</p>
            </div>
            <div className="value-card">
              <h3>Transparência</h3>
              <p>Identificamos nossas fontes, corrigimos erros publicamente e mantemos diálogo com leitores.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>O que publicamos</h2>
          <p>
            <strong>Notícias</strong> — cobertura factual dos acontecimentos no Brasil e no mundo.
            <br />
            <strong>Artigos</strong> — reportagens em profundidade e conteúdo editorial exclusivo.
            <br />
            <strong>Opinião</strong> — análises e reflexões claramente identificadas como editorial.
            <br />
            <strong>Informação</strong> — dados, contexto e explicações para compreender os fatos.
          </p>
        </section>

        <Correspondents />
      </div>

      <TruthBanner />
    </main>
    </>
  );
}
