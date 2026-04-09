/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';

interface UserProfile {
  firstName: string;
  lastName: string;
  gender: string;
  ageRange: string;
  interests?: string[];
}

type ProfileErrors = Partial<Record<keyof UserProfile, string>>;

interface ProfileProps {
  data: UserProfile;
  updateProfile: (newData: Partial<UserProfile>) => void;
  errors: ProfileErrors;
}

export const Profile = ({ data, updateProfile, errors }: ProfileProps) => {
  const { t } = useTranslation();
  const interests = [
    { id: 'video_games', label: t('interests.video_games') },
    { id: 'reading', label: t('interests.reading') },
    { id: 'travel', label: t('interests.travel') },
    { id: 'walking', label: t('interests.walking') },
    { id: 'sport', label: t('interests.sport') },
    { id: 'dancing', label: t('interests.dancing') },
    { id: 'youtube', label: t('interests.youtube') },
    { id: 'movies', label: t('interests.movies') },
    { id: 'drawing', label: t('interests.drawing') },
    { id: 'meditation', label: t('interests.meditation') },
  ];

  const ageRanges = ['13-15', '16-18', '19-21', '22-25', '25-30', '31+'];

  const genderOptions = [
    { id: 'female', label: t('genders.female') },
    { id: 'male', label: t('genders.male') },
    { id: 'other', label: t('genders.other') },
  ];

  return (
    <div className="w-full  flex flex-col items-center">
      <div className="item-start w-fit">
        <h2 className="text-gray-100 text-[26px]">{t('Test_title')}</h2>
        <p className="text-gray-70 text-[24px] mt-2">{t('Test_description')}</p>
      </div>
      <div className="flex flex-row gap-8 w-full mb-10 ">
        <div className="flex flex-col w-1/2 ">
          <label
            htmlFor="fullName"
            className="text-sm font-medium
             text-gray-100 mb-2 ml-1 mt-3"
          >
            {' '}
            {t('Test_name')}
          </label>
          <input
            type="firstName"
            onChange={e => updateProfile({ firstName: e.target.value })}
            placeholder="John "
            className="w-full h-14 px-5  border-b border-gray-20
             bg-white text-sm outline-none
              focus:border-primary transition-all placeholder:text-gray-30"
          />
          {errors?.firstName && (
            <span className="text-error text-xs mt-1 ml-1">
              {errors.firstName}
            </span>
          )}
        </div>

        <div className="flex flex-col w-1/2 ">
          <label
            htmlFor="lastName"
            className="text-sm font-medium
             text-gray-100 mb-2 ml-1 mt-3"
          >
            {t('Test_lastname')}
          </label>
          <input
            type="lastName"
            placeholder=" Wick"
            className="w-full h-14 px-5 border-b border-gray-20
             bg-white text-sm outline-none
              focus:border-primary transition-all placeholder:text-gray-30"
          />
        </div>
      </div>

      <div className="mb-4  w-full">
        <label className="  text-base font-semibold text-gray-80  ">
          {t('Test_gender')}
        </label>
        <div className="flex flex-wrap gap-3 mt-4">
          {genderOptions.map(item => {
            const isSelected = data.gender === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateProfile({ gender: item.id })}
                className={`flex-1 py-3 px-6 rounded-full border text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-primary-dark-90 text-white border-primary-dark-90'
                    : 'bg-white text-primary border-gray-20 hover:border-primary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {errors?.gender && (
          <p className="text-error text-xs mt-1">{errors.gender}</p>
        )}
      </div>

      {/* Кнопки віку */}
      <div className="mb-4 w-full">
        <label className="block text-base font-semibold text-gray-80 mb-4 ml-1">
          {t('Test_old')}
        </label>
        <div className="flex flex-wrap gap-3">
          {ageRanges.map(range => {
            const isSelected = data.ageRange === range;

            return (
              <button
                key={range}
                type="button"
                onClick={() => updateProfile({ ageRange: range })}
                className={`py-2 px-6 rounded-full border text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? 'bg-primary-dark-90 text-white border-primary-dark-90'
                    : 'bg-white text-primary border-gray-20 hover:border-primary'
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>
        {errors?.ageRange && (
          <p className="text-error text-xs mt-1">{errors.ageRange}</p>
        )}
      </div>
      <div className="mb-8">
        <label className="block text-base font-semibold text-gray-80 mb-4 ml-1">
          {t('Register_interests_label')}{' '}
        </label>

        <div className="flex flex-wrap gap-3">
          {interests.map(item => {
            const isSelected = data.interests?.includes(item.id);

            const toggleInterest = () => {
              const currentInterests = data.interests || [];
              const newInterests = isSelected
                ? currentInterests.filter(id => id !== item.id)
                : [...currentInterests, item.id];

              updateProfile({ interests: newInterests });
            };

            return (
              <button
                key={item.id}
                type="button"
                onClick={toggleInterest}
                className={`py-2 px-5 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-primary-dark-90 text-white border-primary-dark-90'
                    : 'bg-white text-primary border-gray-20 hover:border-primary'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
