import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import AIChefPage from './pages/AIChefPage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import { PageRoute } from './types';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="antialiased font-sans text-warm-textDark">
        <Routes>
          <Route path={PageRoute.LANDING} element={<LandingPage />} />
          <Route path={PageRoute.EXPLORE} element={<ExplorePage />} />
          <Route path={PageRoute.AI_CHEF} element={<AIChefPage />} />
          <Route path={PageRoute.HELP} element={<HelpPage />} />
          <Route path={PageRoute.ABOUT} element={<AboutPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;