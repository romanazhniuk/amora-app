/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';

interface FormData {
  city?: string;
  hobbies: string[]; // Масив рядків з ID хобі
}

interface StepThreeProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleHobby: (hobbyId: string) => void;
  errors: Record<string, string>;
}

export const StepThree = ({
  formData,
  handleChange,
  toggleHobby,
  errors,
}: StepThreeProps) => {
  const { t } = useTranslation();
  const Hobbies = [
    { id: 'video_games', label: t('Hobbies.video_games') },
    { id: 'reading', label: t('Hobbies.reading') },
    { id: 'travel', label: t('Hobbies.travel') },
    { id: 'walking', label: t('Hobbies.walking') },
    { id: 'sport', label: t('Hobbies.sport') },
    { id: 'dancing', label: t('Hobbies.dancing') },
    { id: 'youtube', label: t('Hobbies.youtube') },
    { id: 'movies', label: t('Hobbies.movies') },
    { id: 'drawing', label: t('Hobbies.drawing') },
    { id: 'meditation', label: t('Hobbies.meditation') },
  ];

  return (
    <div
      className=" relative z-20 w-full max-w-120
      px-6 flex flex-col items-center"
    >
      <h1 className="text-3xl font-bold text-gray-100 mb-2 text-center">
        {t('Register_welcome')}
      </h1>
      <p className="text-gray-60 text-sm mb-10 text-center leading-relaxed">
        {t('Register_description')}
      </p>
      <div className="w-full flex flex-col mb-8">
        <label className="text-sm font-medium text-gray-100 mb-2 ml-1">
          {t('Register_your_city')}{' '}
        </label>
        <input
          type="text"
          name="city"
          placeholder={t('Register_cities')}
          onChange={handleChange}
          value={formData.city || ''}
          className="w-full h-12 px-5 rounded-full border
           border-gray-20 bg-white text-sm outline-none
            focus:border-primary transition-all"
        />
      </div>
      <div className="mb-8 w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
          {t('Register_hobbies')}{' '}
        </label>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3">
          {Hobbies.map(hobby => (
            <button
              key={hobby.id}
              type="button"
              onClick={() => toggleHobby(hobby.id)}
              className={`py-3 px-4 rounded-full border text-xs font-medium transition-all
                ${
                  formData.hobbies?.includes(hobby.id)
                    ? 'bg-primary-dark-90 text-white border-primary-dark-90'
                    : 'bg-white text-primary-dark-90 border-gray-20 hover:primary-dark-90'
                }`}
            >
              {hobby.label}
            </button>
          ))}
        </div>
        {errors.hobbies && (
          <span className="text-red-500 text-xs mt-2 italic text-center">
            {errors.hobbies}
          </span>
        )}
      </div>
    </div>
  );
};
