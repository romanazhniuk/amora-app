import { useTranslation } from 'react-i18next';
import { RegisterForm } from '../Register/RegisterForm';

export const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <div
      className="relative  w-full
     bg-white flex flex-col items-center
     font-sans overflow-hidden
    pt-5 lg:pt-10"
    >
      <div
        className="relative z-20 w-full
      px-6 flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold text-gray-100 mb-2 text-center">
          {t('Register_welcome')}
        </h1>
        <p className="text-gray-60 text-sm mb-10 text-center leading-relaxed">
          {t('Register_description')}
        </p>
        <div className="absolute left-0 bottom-0 z-10 hidden lg:block">
          <img
            src="./icons/Logingit.svg"
            alt="Self Love Illustration"
            className="max-h-125 w-auto"
          />
        </div>
        <div className="absolute left-15 bottom-10 z-10 hidden lg:block">
          <img
            src="./icons/loginstars.svg"
            alt="Stars"
            className="max-h-125 w-auto"
          />
        </div>
        <div
          className="absolute right-10 bottom-0
       z-10 hidden lg:block opacity-50"
        >
          <img
            src="./icons/Loginfl.svg"
            alt="Decoration Flowers"
            className=" w-auto  max-w-100"
          />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};
