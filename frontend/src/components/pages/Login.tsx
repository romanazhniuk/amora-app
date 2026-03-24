/* eslint-disable max-len */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const { t } = useTranslation();

  return (
    <div
      className="relative min-h-screen w-full
     bg-white flex flex-col items-center
    justify-center font-sans overflow-hidden
    pt-5 lg:pt-10"
    >
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
      <div
        className="relative z-20 w-full max-w-120
      px-6 flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold text-gray-100 mb-2 text-center">
          {t('Login_welcome')}
        </h1>
        <p className="text-gray-60 text-sm mb-10 text-center leading-relaxed">
          {t('Login_description')}
        </p>

        <form className="w-full flex flex-col">
          <div className="flex flex-col mb-5">
            <label
              htmlFor="email"
              className="text-sm font-medium
             text-gray-100 mb-2 ml-1"
            >
              {t('Login_email')}
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full h-14 px-5 rounded-full border border-gray-20 bg-white text-sm outline-none focus:border-primary transition-all placeholder:text-gray-30"
            />
          </div>

          <div className="flex flex-col w-full max-w-md">
            <div className="flex justify-between items-center mb-2 px-1">
              <label
                htmlFor="user-password"
                className="text-sm font-medium text-gray-100"
              >
                {t('Login_password')}
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-primary-dark hover:underline transition-all"
              >
                {t('Login_password_2')}
              </button>
            </div>
            <div className="relative ">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-14 px-5 rounded-full border border-gray-20 bg-white text-sm outline-none focus:border-primary transition-all placeholder:text-gray-30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center "
              >
                {showPassword ? (
                  <Eye size={22} strokeWidth={1.5} />
                ) : (
                  <EyeOff size={22} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            onClick={() => setShowPassword(!showPassword)}
            className="w-full mt-8 h-14 bg-primary-60 text-primary-dark-70 font-bold rounded-full mb-8 hover:bg-primary-80 transition-all"
          >
            {t('Login_Log')}
          </button>
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute w-full h-0.5 bg-primary-70"></div>
            <span className="relative z-10 bg-white px-4 text-base text-primary-dark font-medium">
              {t('Login_Log_or')}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full h-14 flex items-center justify-center gap-3 border border-gray-10 rounded-full hover:bg-gray-10 transition-all text-sm font-medium"
            >
              <img
                src="./icons/IconGhrom.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {t('Login_gogle')}
            </button>
            <button
              type="button"
              className="w-full h-14 flex items-center justify-center gap-3 border border-gray-10 rounded-full hover:bg-gray-10  transition-all text-sm font-medium"
            >
              <img
                src="./icons/Iconfacboock.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              {t('Login_faceboock')}
            </button>
          </div>
        </form>

        <p className="mt-8 text-sm text-gray-80">
          {t('Login_havent')}{' '}
          <button className="font-bold text-gray-100 hover:underline ml-1">
            {t('Login_register')}
          </button>
        </p>

        <p className="mt-12 text-xs text-gray-60 text-center max-w-[320px] leading-relaxed">
          {t('Login_description_1')}
        </p>
      </div>
    </div>
  );
};
