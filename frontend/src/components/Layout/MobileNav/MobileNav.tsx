import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../LanguageSwitcher/LanguageSwitcher';
import styles from './MobileNav.module.scss';

export const MobileNav: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.mainContent}>
      <div className={styles.container}>
        <section className={styles.navSection}>
          <div className={styles.navRow}>
            <a href="#" className={styles.navLink}>
              <span>{t('More about us')}</span>
              <span className={styles.icon}>↗</span>
            </a>
          </div>
          <div className={styles.navRow}>
            <a href="#" className={styles.navLink}>
              <span>{t('Sign in')}</span>
              <span className={styles.icon}>→</span>
            </a>
          </div>
          <div className={styles.navRow}>
            <a href="#" className={styles.navLink}>
              <span>{t('Install the application')}</span>
              <span className={styles.icon}>☁️</span>
            </a>
          </div>
        </section>

        <section className={styles.actionSection}>
          <button className={styles.registerBtn}>{t('Sign up')}</button>
        </section>

        <div className={styles.glowing_line} />

        <section className={styles.languageSection}>
          <div className={styles.languageLabel}>{t('Language')}</div>
          <LanguageSwitcher />
        </section>
      </div>
    </main>
  );
};
