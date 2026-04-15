import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

type LanguageSwitcherProps = {
  isLight: boolean;
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  isLight,
}) => {
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
      <Globe
        strokeWidth={1.2}
        className={`w-6 h-6 ${isLight ? 'text-gray-90' : 'text-white'}`}
      />

      <div
        className="flex items-center
  text-[14px] leading-tight
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
                    ? 'text-gray-40 font-regular'
                    : 'text-gray-20 font-regular'
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
