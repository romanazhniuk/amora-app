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
}

export const StepThree = ({
  formData,
  handleChange,
  toggleHobby,
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
    <div className="animate-in fade-in duration-500 w-full text-left">
      {/* Поле: Місто */}
      <div className="flex flex-col mb-8">
        <label className="text-sm font-medium text-gray-100 mb-2 ml-1">
          Вкажіть ваше місто{' '}
        </label>
        <input
          type="text"
          name="city"
          placeholder="Львів, Київ, Ужгород..."
          onChange={handleChange}
          value={formData.city || ''}
          className="w-full h-12 px-5 rounded-full border
           border-gray-20 bg-white text-sm outline-none
            focus:border-primary transition-all"
        />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
          Які ваші захоплення?{' '}
        </label>
        <p className="text-xs text-gray-40 mb-4 ml-1">
          Можна обрати декілька варіантів
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
      </div>
    </div>
  );
};
