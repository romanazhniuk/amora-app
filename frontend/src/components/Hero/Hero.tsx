import { useTranslation } from 'react-i18next';
import styles from './Hero.module.scss';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        {/* Ліва частина з контентом */}
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>{t('title')}</h1>
          <p className={styles.hero__description}>{t('hero_description')}</p>

          <div className={styles.hero__actions}>
            <button className={styles.hero__btn_primary}>
              {t('Start Test')} <span>→</span>
            </button>
            <button className={styles.hero__btn_secondary}>
              {t('More details')} <span>↗</span>
            </button>
          </div>

          <div className={styles.hero__note}>
            <span className={styles.hero__dot}>●</span> {t('hero__dot')}
          </div>
        </div>
        <div className={styles.hero__illustration}>
          <div className={styles.hero__orbit}>
            <img src="/public/img/Hero fon.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
