import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'ua', name: 'UA' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng.toLowerCase());
  };

  const currentLang = i18n.resolvedLanguage || i18n.language || 'EN';

  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <img src="./img/lg.png" className="w-6 h-6" alt="lang icon" />

      <div
        className="flex items-center
  text-[16px] leading-tight
  font-medium uppercase"
      >
        {languages.map((lang, index) => (
          <div key={lang.code} className="flex items-center">
            <button
              onClick={() => changeLanguage(lang.code)}
              className={`transition-colors duration-200 uppercase ${
                currentLang === lang.code
                  ? 'text-[#333] font-medium'
                  : 'text-[#ccc]'
              }`}
              type="button"
            >
              {lang.name}
            </button>
            {index < languages.length - 1 && (
              <span className="mx-1 text-[#333] font-light">/</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
