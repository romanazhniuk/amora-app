import styles from './NavBar.module.scss';
import Logo from '/public/img/Logo.png';
import burgerIcon from '/public/img/burger.png';
import burgerIconClos from '/public/img/BurgerClos.png';
import { MobileNav } from '../MobileNav';
import { LanguageSwitcher } from './../../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

type NavBarProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export const NavBar: React.FC<NavBarProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.left_section}>
        <div className={styles.navbar__logo}>
          <img src={Logo} alt="Logo"></img>
        </div>
      </div>

      <div className={styles.app_name}>Emora App</div>

      <div className={styles.right_section}>
        <div className={styles.navbar__actions}>
          <button className={styles.btn_login}>{t('Sign in')}</button>
          <button className={styles.btn_signup}>{t('Sign up')}</button>
          <LanguageSwitcher />
        </div>

        {isMenuOpen && (
          <div className={styles.header__mobile_menu}>
            <MobileNav />
          </div>
        )}

        <button className={styles.header__burger} onClick={toggleMenu}>
          <img
            src={isMenuOpen ? burgerIconClos : burgerIcon}
            alt={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            className={styles.header__burger_icon}
          />
        </button>
      </div>
    </div>
  );
};
