import React, { useState } from 'react';
import { NavBar } from './components/Layout/NavBar/NavBar';
import styles from './App.module.scss';
import { Hero } from './components/Hero';
import './i18n';
import { TrustBlock } from './components/UI/TrustBlock/TrustBlock';
import { AboutSection } from './components/UI/AboutSection';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`${styles.app} ${isMenuOpen ? styles.menuActive : ''}`}>
      <header className={styles.header}>
        <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main className={styles.mainContent}>
        <Hero />
        <TrustBlock />
        <AboutSection />
      </main>
    </div>
  );
};
