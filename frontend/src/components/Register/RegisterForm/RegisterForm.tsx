import { useTranslation } from 'react-i18next';

export const RegisterForm = () => {
  const { t } = useTranslation();

  return <div>{t('Register_page')}</div>;
};
