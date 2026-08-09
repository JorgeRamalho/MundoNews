import { Outlet } from 'react-router-dom';
import TopBar from '../../features/markets/components/TopBar';
import BreakingTicker from '../../features/news/components/BreakingTicker';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import ScrollToTop from './ScrollToTop';
import Analytics from './Analytics';
import SiteFeeds from './SiteFeeds';
import { ThemeProvider } from '../context/ThemeProvider';

export default function Layout() {
  return (
    <ThemeProvider>
      <div className="page">
        <SiteFeeds />
        <Analytics />
        <ScrollToTop />
        <TopBar />
        <BreakingTicker />
        <Header />
        <Outlet />
        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}
