import { useTranslation } from 'react-i18next';
import { StepProps } from '../../types/auth';

export const StepOne = ({ formData, errors, handleChange }: StepProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="relative z-20 w-full max-w-120
      px-6 flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold text-gray-100 mb-2 text-center">
        {t('Register_welcome')}
      </h1>
      <p className="text-gray-60 text-sm mb-10 text-center leading-relaxed">
        {t('Register_description')}
      </p>
      <div className="w-full flex flex-col mb-2">
        <label
          htmlFor="user-fullName"
          className="text-sm font-medium
             text-gray-100 mb-2 ml-1"
        >
          {t('Register_fullname')}
        </label>
        <input
          required
          type="text"
          name="fullName"
          placeholder={t('Register_fullname')}
          onChange={handleChange}
          value={formData.fullName}
          className={`w-full h-11.5 px-5 rounded-full border bg-white text-sm outline-none transition-all ${
            errors.email
              ? 'border-error focus:border-red-600'
              : 'border-gray-20 focus:border-primary'
          }`}
        />
        {errors.fullName && (
          <span className="text-red-500 text-xs mt-1 ml-4 italic">
            {errors.fullName}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col mb-2">
        <label
          htmlFor="user-email"
          className="text-sm font-medium
         text-gray-100 mb-2 ml-1"
        >
          {t('Register_email')}
        </label>
        <input
          required
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={handleChange}
          value={formData.email}
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
      <div className="w-full flex flex-col mb-2">
        <label
          htmlFor="email"
          className="text-sm font-medium
             text-gray-100 mb-2 ml-1"
        >
          {t('Register_password')}
        </label>
        <input
          required
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={formData.password}
          className={`w-full h-11.5 px-5 rounded-full border bg-white text-sm outline-none transition-all ${
            errors.password
              ? 'border-error focus:border-red-600'
              : 'border-gray-20 focus:border-primary'
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-xs mt-1 ml-4 italic">
            {errors.password}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col mb-5">
        <label
          htmlFor="email"
          className="text-sm font-medium
             text-gray-100 mb-2 ml-1"
        >
          {t('Register_confirmPassword')}
        </label>
        <input
          required
          type="password"
          name="confirmPassword"
          placeholder="Підтвердіть пароль"
          onChange={handleChange}
          value={formData.confirmPassword}
          className={`w-full h-11.5 px-5 rounded-full border bg-white text-sm outline-none transition-all ${
            errors.confirmPassword
              ? 'border-error focus:border-red-600'
              : 'border-gray-20 focus:border-primary'
          }`}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs mt-1 ml-4 italic">
            {errors.confirmPassword}
          </span>
        )}
      </div>
    </div>
  );
};
