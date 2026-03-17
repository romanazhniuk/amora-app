import React, { useState } from 'react';
import { NavBar } from './components/Layout/NavBar/NavBar';
import styles from './App.module.scss';
import { Hero } from './components/Hero';
import './i18n';
import { TrustBlock } from './components/UI/TrustBlock/TrustBlock';
import { AboutSection } from './components/UI/AboutSection';
import { TipsSection } from './components/UI/TipsSection';
import { AppPromo } from './components/UI/AppPromo/AppPromo';
import { TeamSection } from './components/UI/TeamSection/TeamSection';
import { Footer } from './components/Layout/Footer/Footer';
export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section>
      <div
        className="pl-4 pr-4 md:pl-6
     md:pr-6 lg:pl-15
      lg:pr-15 xl:pl-40 xl:pr-40"
      >
        <div className={`${styles.app} ${isMenuOpen ? styles.menuActive : ''}`}>
          <header className={styles.header}>
            <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </header>

          <main className={styles.mainContent}>
            <Hero />
            <TrustBlock />
            <AboutSection />
            <AppPromo />
            <TipsSection />
            <TeamSection />
          </main>
        </div>
      </div>

      <footer
        className="bg-[#F2F2F2] pl-4 pr-4 md:pl-6
     md:pr-6 lg:pl-15
      lg:pr-15 xl:pl-40 xl:pr-40"
      >
        <Footer />
      </footer>
    </section>
  );
};
