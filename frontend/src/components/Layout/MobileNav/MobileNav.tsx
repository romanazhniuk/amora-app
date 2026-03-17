/* eslint-disable max-len */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../LanguageSwitcher/LanguageSwitcher';

interface MobileNavProps {
  onClose: () => void;
}

const navItems = [
  { id: 'about', label: 'nav_about', icon: '↗' },
  { id: 'login', label: 'nav_login', icon: '→' },
  { id: 'install', label: 'nav_install', icon: '☁️' },
  { id: 'register', label: 'nav_register', isButton: true },
];

export const MobileNav: React.FC<MobileNavProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const handleLinkClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    const element = document.getElementById(targetId);

    if (element) {
      onClose();
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div
      className="fixed top-[80px] left-0 w-full h-[calc(100vh-80px)]
     bg-white z-50 flex flex-col px-6 py-10
     overflow-y-auto shadow-2xl border-t border-gray-100"
    >
      <nav className="flex flex-col space-y-6">
        {navItems.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={e => handleLinkClick(e, item.id)}
            className={
              item.isButton
                ? 'block w-full py-4 mt-2 text-center text-xl font-semibold border-2 border-black rounded-full text-black active:scale-95 transition-all'
                : 'flex items-center justify-between text-2xl font-medium text-black active:opacity-50 transition-opacity'
            }
          >
            {t(item.label)}
            {item.icon && (
              <span className={item.id === 'install' ? 'text-2xl' : 'text-xl'}>
                {item.icon}
              </span>
            )}
          </a>
        ))}
      </nav>

      <div className="mt-12 flex justify-between">
        <div>{t('Language')}</div>
        <LanguageSwitcher />
      </div>
    </div>
  );
};
