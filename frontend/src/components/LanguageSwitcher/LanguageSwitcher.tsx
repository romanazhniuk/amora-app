import { useTranslation } from 'react-i18next';

type Lang = {
  isLight: boolean;
};

export const LanguageSwitcher: React.FC<Lang> = ({ isLight }) => {
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
      <img
        src="./icons/Language.svg"
        className={`w-6 h-6 ${isLight ? 'invert' : 'invert-0'}`}
        alt="lang icon"
      />

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
                  ? isLight
                    ? 'text-gray-80 font-medium'
                    : 'text-gray-0 font-medium'
                  : isLight
                    ? 'text-gray-40 font-medium'
                    : 'text-gray-20 font-medium'
              }`}
              type="button"
            >
              {lang.name}
            </button>
            {index < languages.length - 1 && (
              <span
                className={`mx-1 font-light ${isLight ? 'text-gray-80' : 'text-gray-0'}`}
              >
                /
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
