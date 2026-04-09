import { useTranslation } from 'react-i18next';

interface StepOneData {
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

interface StepProps {
  formData: StepOneData;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StepOne = ({ formData, errors, handleChange }: StepProps) => {
  const { t } = useTranslation();

  return (
    <div className="">
      <div className="">
        <div className="flex flex-col mb-5">
          <label
            htmlFor="email"
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
            className="w-full h-12 px-5 rounded-full border border-gray-20
                   bg-white text-sm outline-none
                    focus:border-primary transition-all
                     placeholder:text-gray-30"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-100 mb-2 ml-1">
            {t('Register_email')}
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={handleChange}
            value={formData.email}
            className="w-full h-12 px-5 rounded-full border
                   border-gray-20 bg-white text-sm outline-none
                    focus:border-primary transition-all
                     placeholder:text-gray-30 text-gray-900"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col mb-5">
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
            className="w-full h-12 px-5 rounded-full border
                   border-gray-20 bg-white text-sm
                   outline-none focus:border-primary transition-all
                    placeholder:text-gray-30"
          />
        </div>
        <div className="flex flex-col mb-5">
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
            className="w-full h-12 px-5 rounded-full border
                   border-gray-20 bg-white text-sm outline-none
                    focus:border-primary transition-all
                     placeholder:text-gray-30"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>
      </div>
    </div>
  );
};
