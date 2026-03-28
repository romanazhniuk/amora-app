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

interface StepTwoData {
  birthDate: string;
  gender: string;
}

interface StepTwoProps {
  // Використовуємо Partial, якщо formData може містити дані з інших кроків
  formData: StepTwoData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Типізація для функції setFormData від useState
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

export const StepTwo = ({
  formData,
  handleChange,
  setFormData,
}: StepTwoProps) => {
  const { t } = useTranslation();

  const genderOptions = [
    { id: 'female', label: t('genders.female') },
    { id: 'male', label: t('genders.male') },
    { id: 'other', label: t('genders.other') },
  ];

  return (
    <div className="step-container">
      <div className=" animate-in fade-in duration-500">
        <div className="flex flex-col mb-8">
          <label
            htmlFor="birthDate"
            className="text-sm font-medium text-gray-100
           mb-2 ml-1"
          >
            Дата народження*
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
        </div>
        <div className="mb-8">
          <label
            className="block text-sm font-semibold
           text-gray-700 mb-4 ml-1"
          >
            {t('Register_gender_label')}*{' '}
          </label>
          <div className="flex gap-3">
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
        </div>
      </div>
    </div>
  );
};
