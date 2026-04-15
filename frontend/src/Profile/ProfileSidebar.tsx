import { useNavigate } from 'react-router-dom';
import { Mail, LogOut, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProfileSidebarProps {
  user: {
    name: string;
    age: number | string;
    gender: string;
    city: string;
    email: string;
    hobbies: string[];
  } | null;
  hobbiesTranslations: Record<string, string>;
  genderTranslations: Record<string, string>;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  hobbiesTranslations,
  genderTranslations,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="p-6 bg-white rounded-3xl shadow-sm">Завантаження...</div>
    );
  }

  return (
    <div
      className="relative w-full bg-white rounded-3xl
     min-w-80 shadow-sm p-6 pt-16 flex flex-col items-start text-left"
    >
      <div
        className="absolute w-full  -top-16 left-1/2
      -translate-x-1/2 md:left-6 md:translate-x-0"
      >
        <div className="relative">
          <img
            src="./icons/Profile_icon.svg"
            className="w-32 h-32 rounded-full border-6
             border-white shadow-lg object-cover bg-gray-200"
            alt="Avatar"
          />
        </div>
      </div>

      <h2 className="text-xl pt-6 font-bold text-gray-800">{user.name}</h2>
      <p className="text-gray-500 text-sm mb-4">
        {user.age} {t('Profile_years')} •{' '}
        {genderTranslations[user.gender] || user.gender}
      </p>

      <div
        className="w-full space-y-2 text-left text-sm
      border-b pb-5 border-gray-10 text-gray-600 mb-6 whitespace-nowrap"
      >
        <div className="w-full flex items-center gap-2 text-gray-80">
          <MapPin className="h-6 w-6" />
          <span className="leading-none">
            {user.city || t('Profile_specified')}
          </span>
        </div>
        <div className="inline-flex items-center gap-x-2">
          <Mail size={24} className="text-gray-80" />
          <span>{user.email}</span>
        </div>
      </div>

      <div className="w-full text-left border-b border-gray-10 pb-5">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {t('Profile_Delight')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {user.hobbies.map(hobbyId => (
            <span
              key={hobbyId}
              className="px-4 py-2 bg-white rounded-full
               text-sm font-medium text-indigo-900/80
               border border-gray-200 shadow-sm"
            >
              {hobbiesTranslations && hobbiesTranslations[hobbyId]
                ? hobbiesTranslations[hobbyId]
                : hobbyId}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-3
        h-12 mt-5 text-primary-dark-90 border
         border-purple-200 w-full py-2 rounded-xl
          hover:bg-purple-50 transition"
      >
        <LogOut /> {t('nav_logout')}
      </button>
    </div>
  );
};
