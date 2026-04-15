import React, { useEffect, useState } from 'react';
import { NavBar } from './components/Layout/NavBar/NavBar';
import styles from './App.module.scss';
import './i18n';
import { Footer } from './components/Layout/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    // Перевіряємо наявність токена при завантаженні та зміні маршруту
    const token = localStorage.getItem('accessToken');

    setIsAuthenticated(!!token);
  }, [location]);

  const isLight =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/profile' ||
    location.pathname === '/quiz' ||
    location.pathname === '/Profile' ||
    location.pathname === '/test';

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
              isAuthenticated={isAuthenticated}
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
