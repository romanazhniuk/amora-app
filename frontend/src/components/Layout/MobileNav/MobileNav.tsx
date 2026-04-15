/* eslint-disable max-len */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../LanguageSwitcher/LanguageSwitcher';
import { Link } from 'react-router-dom';
import { CloudDownload, LogOut, ArrowRight } from 'lucide-react';

interface MobileNavProps {
  onClose: () => void;
  isLight: boolean;
  isAuthenticated: boolean;
}

const navItems = [
  { id: 'about', label: 'nav_about', icon: '↗' },
  { id: 'login', label: 'nav_login', icon: <ArrowRight />, href: 'login' },
  { id: 'install', label: 'nav_install', icon: <CloudDownload /> },
  { id: 'register', label: 'nav_register', isButton: true, href: 'register' },
];

const authItems = [
  { id: 'about', label: 'nav_about', icon: '↗' },
  { id: 'test', label: 'nav_test', href: 'test' },
  { id: 'profile', label: 'nav_profile', href: 'profile' },
  { id: 'install', label: 'nav_install', icon: <CloudDownload /> },
  {
    id: 'logout',
    label: 'nav_logout',
    icon: <LogOut />,
    isButton: true,
    isLogout: true,
  },
];

export const MobileNav: React.FC<MobileNavProps> = ({
  onClose,
  isLight,
  isAuthenticated,
}) => {
  const { t } = useTranslation();

  const currentItems = isAuthenticated ? authItems : navItems;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    onClose();
    window.location.href = '/login';
  };

  return (
    <div
      className={`fixed left-0 w-full h-[calc(100vh-80px)] z-50 flex flex-col px-6 py-10 overflow-y-auto  transition-all duration-300 ${
        isLight ? 'bg-white text-gray-100' : 'bg-primary text-gray-0'
      }`}
    >
      <nav className="flex flex-col space-y-6">
        {currentItems.map(item => {
          const baseClass = item.isButton
            ? `block w-full py-4 mt-2 text-center text-xl font-semibold border-2  rounded-full  active:scale-95 transition-all ${isLight ? 'text-black border-black' : 'text-gray-0 border-gray-0'}`
            : `flex items-center gap-5 text-2xl font-medium text-black active:opacity-50 transition-opacity ${isLight ? 'text-black' : 'text-gray-0'}`;

          if (item.isLogout) {
            return (
              <button
                key={item.id}
                onClick={handleLogout}
                className={`${baseClass} flex items-center justify-center gap-3`}
              >
                {item.icon && <span>{item.icon}</span>}
                {t(item.label)}
              </button>
            );
          }

          if (item.href) {
            return (
              <Link
                key={item.id}
                to={`/${item.href}`}
                onClick={onClose}
                className={baseClass}
              >
                {t(item.label)}
                {item.icon && <span>{item.icon}</span>}
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              to="/"
              state={{ scrollTo: item.id }}
              onClick={onClose}
              className={baseClass}
            >
              {t(item.label)}
              {item.icon && (
                <span
                  className={item.id === 'install' ? 'text-2xl' : 'text-xl'}
                >
                  {item.icon}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-12 flex justify-between">
        <div>{t('Language')}</div>
        <LanguageSwitcher isLight={isLight} />
      </div>
    </div>
  );
};
