import React, { useState } from 'react';
import { NavBar } from './components/Layout/NavBar/NavBar';
import styles from './App.module.scss';
import './i18n';
import { Footer } from './components/Layout/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const isLight =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <section>
      <div>
        <div className={`${styles.app} ${isMenuOpen ? styles.menuActive : ''}`}>
          <header
            className={`
     ${isLight ? 'bg-white ' : 'bg-primary text-white'}
`}
          >
            <NavBar
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              isLight={isLight}
            />
          </header>

          <main className={styles.mainContent}>
            <Outlet />
          </main>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </section>
  );
};
