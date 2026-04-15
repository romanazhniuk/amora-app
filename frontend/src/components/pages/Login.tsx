/* eslint-disable max-len */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from './../../api/axios';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = t('Error_required_email');
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('Error_invalid_email');
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = t('Error_required_password');
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = t('Error_password_too_short');
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await api.post('/auth/login', {
          username: formData.email,
          password: formData.password,
        });

        const { access, refresh } = response.data;

        if (access) {
          localStorage.setItem('accessToken', access);
          localStorage.setItem('refreshToken', refresh);
          navigate('/profile');
        }
      } catch (error: any) {
        const serverMessage = error.response?.data?.message || 'Login failed';

        setErrors(prev => ({ ...prev, email: serverMessage }));
      }
    }
  };

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
        <p className="text-gray-60 text-sm mb-8 text-center leading-relaxed">
          {t('Login_description')}
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full flex flex-col"
        >
          <div className="flex flex-col mb-2">
            <label
              htmlFor="email"
              className="text-sm font-medium
             text-gray-100 mb-2 ml-1"
            >
              {t('Login_email')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              autoComplete="email"
              className={`w-full h-11.5 px-5 rounded-full border bg-white text-sm outline-none transition-all ${
                errors.email
                  ? 'border-error focus:border-red-600'
                  : 'border-gray-20 focus:border-primary'
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 ml-4 italic">
                {errors.email}
              </span>
            )}
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
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder={t('Register_password_')}
                autoComplete="current-password"
                className={`w-full h-11.5 px-5 rounded-full border bg-white text-sm outline-none transition-all ${
                  errors.password
                    ? 'border-error focus:border-red-600'
                    : 'border-gray-20 focus:border-primary'
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 ml-4 italic absolute -bottom-5 left-0">
                  {errors.password}
                </span>
              )}
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
            className="w-full mt-6 h-11.5 bg-primary-dark-90 text-white font-medium rounded-full mb-4 hover:bg-primary-dark-80 transition-all"
          >
            {t('Login_Log')}
          </button>
        </form>

        <div className="w-full relative flex items-center justify-center mb-4">
          <div className="absolute w-full h-0.5 bg-primary-70"></div>
          <span className="relative z-10 bg-white px-4 text-sm text-primary-dark font-regular">
            {t('Login_Log_or')}
          </span>
        </div>
        <div className="flex flex-row gap-4 justify-center w-full">
          <button
            type="button"
            className="w-14 h-14 flex items-center justify-center border border-gray-10 rounded-full hover:bg-gray-10 transition-all shadow-sm shrink-0"
          >
            <img src="./icons/IconGhrom.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="w-14 h-14 flex items-center justify-center border border-gray-10 rounded-full hover:bg-gray-10 transition-all shadow-sm shrink-0"
          >
            <img
              src="./icons/Iconfacboock.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-80">
        {t('Login_havent')}{' '}
        <button
          onClick={() => navigate('/register')}
          className="font-bold text-gray-100 hover:underline ml-1"
        >
          {t('Login_register')}
        </button>
      </p>

      <p className="mt-6 text-xs text-gray-60 text-center max-w-[320px] leading-relaxed">
        {t('Login_description_1')}
      </p>
    </div>
  );
};
