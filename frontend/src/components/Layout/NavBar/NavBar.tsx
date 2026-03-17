import Logo from '/img/Logo.png';
import { MobileNav } from '../MobileNav';
import { LanguageSwitcher } from './../../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

type NavBarProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavBar: React.FC<NavBarProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div
      className="relative flex items-center
      justify-between h-16 w-full pt-2 px-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12">
          <img src={Logo} alt="Logo"></img>
        </div>
      </div>

      <div
        className="text-black text-2xl font-semibold
      w-auto absolute left-1/2
       -translate-x-1/2"
      >
        Emora App
      </div>

      <div className="flex items-center gap-4 whitespace-nowrap">
        <div className="hidden lg:flex items-center gap-2">
          <button
            className="text-gray-400 bg-white
          border px-6 py-3
          rounded-full w-auto"
          >
            {t('Sign in')}
          </button>
          <button
            className="text-gray-400 bg-white
          border px-6 py-3 rounded-full"
          >
            {t('Sign up')}
          </button>
          <LanguageSwitcher />
        </div>

        {isMenuOpen && (
          <div
            className="fixed top-16 left-0 w-full h-screen
          lg:hidden z-40 bg-white"
          >
            <MobileNav onClose={() => setIsMenuOpen(false)} />
          </div>
        )}

        <button
          className="lg:hidden flex items-center justify-center p-2"
          onClick={toggleMenu}
          type="button"
          aria-label="Toggle menu"
        >
          <img
            src={isMenuOpen ? './img/BurgerClos.svg' : './img/Burger.png'}
            alt="Menu"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
};
