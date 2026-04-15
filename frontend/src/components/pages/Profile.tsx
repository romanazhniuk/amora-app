import React, { useEffect, useMemo, useState } from 'react';
import { ProfileSidebar } from '../../Profile/ProfileSidebar';
import { AssessmentBlock } from '../../Profile/AssessmentCard';
import { RecommendationCards } from '../Test/RecommendationCards';
import { quizResultsData } from '../Test/quizResultsData';
import { useNavigate } from 'react-router-dom';
import api from './../../api/axios';
import { useTranslation } from 'react-i18next';

export const Profile: React.FC = () => {
  const [resultKey, setResultKey] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const hobbiesMap: Record<string, string> = useMemo(
    () => ({
      video_games: t('Hobbies.video_games'),
      reading: t('Hobbies.reading'),
      travel: t('Hobbies.travel'),
      walking: t('Hobbies.walking'),
      sport: t('Hobbies.sport'),
      dancing: t('Hobbies.dancing'),
      youtube: t('Hobbies.youtube'),
      movies: t('Hobbies.movies'),
      drawing: t('Hobbies.drawing'),
      meditation: t('Hobbies.meditation'),
    }),
    [t],
  );

  const genderMap: Record<string, string> = useMemo(
    () => ({
      female: t('genders.female'),
      male: t('genders.male'),
      other: t('genders.other'),
    }),
    [t],
  );

  const updateTestData = () => {
    const savedKey = localStorage.getItem('quiz_result_key');

    setResultKey(savedKey);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/auth/me/');

        setUserData(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const savedKey = localStorage.getItem('quiz_result_key');

    setResultKey(savedKey);
  }, [navigate]);

  useEffect(() => {
    updateTestData();

    window.addEventListener('storage', updateTestData);

    return () => window.removeEventListener('storage', updateTestData);
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (!userData) {
    return <div>Помилка доступу</div>;
  }

  const formattedUserData = {
    name: userData.lastName || 'Користувач',
    age: userData.birthDate
      ? Math.floor(
          (new Date().getTime() - new Date(userData.birthDate).getTime()) /
            (1000 * 60 * 60 * 24 * 365.25),
        )
      : '—',
    gender: userData.gender || '—',
    city: userData.city,
    email: userData.email || '',
    hobbies: userData.hobbies
      ? userData.hobbies.split(',').map((h: string) => h.trim())
      : [],
    isTestCompleted: !!resultKey,
  };

  const currentResults = resultKey
    ? quizResultsData[resultKey as keyof typeof quizResultsData]
    : undefined;

  return (
    <div>
      <img
        className="w-full h-30 mt-10 object-cover"
        src="./icons/profile_bg.svg"
        alt=""
      />
      <div
        className="min-h-screen pl-4 pr-4 md:pl-6
     md:pr-6 lg:pl-15
      lg:pr-15 xl:pl-20 xl:pr-20"
      >
        <div className="max-w-400 mx-auto px-6  pb-20 ">
          <div
            className="flex flex-col lg:flex-row justify-between
  items-start gap-10 relative z-10"
          >
            <aside className="w-full  lg:w-1/3 xl:w-1/4 z-20 gap-3 mt-4">
              <ProfileSidebar
                user={formattedUserData}
                hobbiesTranslations={hobbiesMap}
                genderTranslations={genderMap}
              />
            </aside>

            <main className="w-full lg:w-2/3 xl:w-3/4 mt-4 ">
              <AssessmentBlock
                isCompleted={!!resultKey}
                resultsData={currentResults}
                onRetry={() => {
                  localStorage.removeItem('quiz_result_key');
                  setResultKey(null);
                  navigate('/quiz');
                }}
                onStart={() => {
                  navigate('/quiz');
                }}
              />
              <div className="pl-8">
                <RecommendationCards />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
