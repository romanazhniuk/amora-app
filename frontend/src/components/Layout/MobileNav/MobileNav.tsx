/* eslint-disable max-len */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../LanguageSwitcher/LanguageSwitcher';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  onClose: () => void;
  isLight: boolean;
}

const navItems = [
  { id: 'about', label: 'nav_about', icon: '↗' },
  { id: 'login', label: 'nav_login', icon: '→', href: 'login' },
  { id: 'install', label: 'nav_install', icon: '☁️' },
  { id: 'register', label: 'nav_register', isButton: true, href: 'register' },
];

export const MobileNav: React.FC<MobileNavProps> = ({ onClose, isLight }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`fixed left-0 w-full h-[calc(100vh-80px)] z-50 flex flex-col px-6 py-10 overflow-y-auto  transition-all duration-300 ${
        isLight ? 'bg-white text-gray-100' : 'bg-primary text-gray-0'
      }`}
    >
      <nav className="flex flex-col space-y-6">
        {navItems.map(item => {
          const baseClass = item.isButton
            ? `block w-full py-4 mt-2 text-center text-xl font-semibold border-2  rounded-full  active:scale-95 transition-all ${isLight ? 'text-black border-black' : 'text-gray-0 border-gray-0'}`
            : `flex items-center justify-between text-2xl font-medium text-black active:opacity-50 transition-opacity ${isLight ? 'text-black' : 'text-gray-0'}`;

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
