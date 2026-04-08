import Logo from '/img/Logo.png';
import { MobileNav } from '../MobileNav';
import { LanguageSwitcher } from './../../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

type NavBarProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLight: boolean;
};

export const NavBar: React.FC<NavBarProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  isLight,
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
      className="pl-4 pr-4 md:pl-6
     md:pr-6 lg:pl-15
      lg:pr-15 xl:pl-40 xl:pr-40  relative flex items-center
      justify-between h-16 w-full pt-2 px-4 "
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12">
          <a href="/">
            <img src={Logo} alt="Logo"></img>
          </a>
        </div>
      </div>

      <div
        className={`text-2xl font-semibold w-auto absolute left-1/2 -translate-x-1/2 ${
          isLight ? 'text-gray-100' : 'text-gray-0'
        }`}
      >
        <a href="/">Emora App</a>
      </div>

      <div className="flex items-center gap-4 whitespace-nowrap">
        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher isLight={isLight} />
          <Link to="/login" className="contents">
            <button
              className={`
           px-6 py-3 duration-300
          rounded-full w-auto
      ${isLight ? 'text-primary bg-gray-0' : 'text-gray-0 bg-primary hover:bg-gray-10/30'}`}
            >
              {t('Sign in')}
            </button>
          </Link>
          <Link to="/register" className="contents">
            <button
              className=" text-gray-0 bg-primary-dark-90
           px-6 py-3 rounded-full duration-300
           hover:bg-primary-dark-90/60
           "
            >
              {t('Sign up')}
            </button>
          </Link>
        </div>

        {isMenuOpen && (
          <div
            className="fixed top-16 left-0 w-full h-screen
          lg:hidden z-40 bg-white"
          >
            <MobileNav onClose={() => setIsMenuOpen(false)} isLight={isLight} />
          </div>
        )}

        <button
          className="lg:hidden flex items-center justify-center p-2"
          onClick={toggleMenu}
          type="button"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} color="#3D348B" strokeWidth={2} />
          ) : (
            <Menu size={24} color="#3D348B" strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
};
