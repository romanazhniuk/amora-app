/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';

interface FormValues {
  fullName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: string;
  birthDate?: string;
  interests?: string[];
}

interface StepTwoProps {
  formData: FormValues; // Використовуйте основний інтерфейс тут
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
  errors: Record<string, string>;
}

export const StepTwo = ({
  formData,
  handleChange,
  setFormData,
  errors,
}: StepTwoProps) => {
  const { t } = useTranslation();

  const genderOptions = [
    { id: 'female', label: t('genders.female') },
    { id: 'male', label: t('genders.male') },
    { id: 'other', label: t('genders.other') },
  ];

  return (
    <div
      className="relative z-20 w-full max-w-120
      px-6 flex flex-col items-center pt-5"
    >
      <h1 className="text-3xl font-bold text-gray-100 mb-2 text-center">
        {t('Register_welcome')}
      </h1>
      <p className="text-gray-60 text-sm mb-10 text-center leading-relaxed">
        {t('Register_description')}
      </p>
      <div className="w-full animate-in fade-in duration-500">
        <div className="flex flex-col mb-2">
          <label
            htmlFor="birthDate"
            className="text-sm font-medium text-gray-100
           mb-2 ml-1"
          >
            {t('Register_Date')}
          </label>
          <input
            required
            type="date"
            name="birthDate"
            onChange={handleChange}
            value={formData.birthDate}
            className="w-full h-12 px-5 rounded-full border
             border-gray-20 bg-white text-sm outline-none
              focus:border-primary transition-all text-gray-500 uppercase"
          />
          {errors.birthDate && (
            <span className="text-red-500 text-xs mt-1 ml-4 italic">
              {errors.birthDate}
            </span>
          )}
        </div>
        <div className="mb-2 ">
          <label
            className="text-sm font-medium text-gray-100
            ml-1 "
          >
            {t('Test_gender')}{' '}
          </label>
          <div className="flex gap-3 mt-2">
            {genderOptions.map(item => (
              <button
                key={item.id}
                type="button"
                // ОНОВЛЕННЯ СТАНУ: при кліку записуємо ID в formData
                onClick={() => setFormData({ ...formData, gender: item.id })}
                className={`flex-1 py-3 px-6 rounded-full border text-sm font-medium transition-all
            ${
              formData.gender === item.id
                ? 'bg-primary-dark-90 text-white border-primary-dark-90'
                : 'bg-white text-primary-dark-90 border-gray-20 hover:primary-dark-90'
            }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {errors.gender && (
            <span className="text-red-500 text-xs mt-1 ml-4 italic">
              {errors.gender}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
