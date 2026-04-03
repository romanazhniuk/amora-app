import styles from './LanguageSwitcher.module.scss';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: 'en' | 'ua') => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'ua', name: 'UA' },
  ];
  const currentLang = i18n.resolvedLanguage || i18n.language || 'en';
  const activeIndex = languages.findIndex(l => l.code === currentLang);

  return (
    <div className={styles.switcher}>
      <div
        className={styles.activePill}
        style={{
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {languages.map(lang => (
        <button
          key={lang.code}
          className={cn(styles.button, {
            [styles.active]: i18n.resolvedLanguage === lang.code,
          })}
          onClick={() => changeLanguage(lang.code as 'en' | 'ua')}
          type="button"
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};
