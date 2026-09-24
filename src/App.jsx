import Header from './components/Header';
import Heroes from './components/Hero';
import GuidedTour from './components/GuidedTour';
import CompareTable from './components/CompareTable';
import WaysToSave from './components/WaysToSave';
import Accessories from './components/Accessories';
import WhatMakesIphone from './components/WhatMakesIphone';
import Services from './components/Services';
import ResearchApp from './components/ResearchApp';
import Footer from './components/Footer';
import Toast from './components/Toast';
import BuyPage from './pages/BuyPage';
import StorePage from './pages/StorePage';
import BagPage from './pages/BagPage';
import InfoPage from './pages/InfoPage';
import { Route, Routes, useParams } from 'react-router-dom';
import { ScrollManager, ShopProvider } from './store';

function HomePage() {
  return (
    <>
      <Heroes />
      <GuidedTour />
      <CompareTable />
      <WaysToSave />
      <Accessories />
      <WhatMakesIphone />
      <Services />
      <ResearchApp />
    </>
  );
}

function BuyRoute() {
  const { id } = useParams();
  return <BuyPage id={id} />;
}

function App() {
  return (
    <ShopProvider>
      <div className="w-full min-h-screen overflow-x-clip">
        <Header />
        <ScrollManager />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/buy/:id" element={<BuyRoute />} />
            <Route path="/bag" element={<BagPage />} />
            {['mac', 'ipad', 'watch', 'tv-home', 'entertainment', 'support'].map((slug) => (
              <Route key={slug} path={`/${slug}`} element={<InfoPage slug={slug} />} />
            ))}
            <Route path="*" element={<InfoPage slug="not-found" />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
      </div>
    </ShopProvider>
  );
}

export default App;
