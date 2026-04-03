import React from 'react';
import { NavBar } from './components/Layout/NavBar/NavBar';
import styles from './App.module.scss';
import { Hero } from './components/Hero';
import './i18n';

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.mainContent}>
        <Hero />
      </main>
    </div>
  );
};
