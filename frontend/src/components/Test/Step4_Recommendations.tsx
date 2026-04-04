import { useTranslation } from 'react-i18next';
import { RecommendationCards } from './RecommendationCards';

export const Recommendations = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full py-12">
      <div
        className="flex flex-col lg:flex-row gap-12
      items-start justify-between"
      >
        <div className="flex flex-col gap-8 max-w-[540px] font-sans">
          <h2
            className="text-[28px] md:text-[31px]
          font-bold text-[#1A1C1E] leading-[1.2] tracking-tight"
          >
            {t('Recomemendations_title')}
          </h2>
          <div
            className="inline-block bg-purple-50
           text-purple-600 px-4 py-1 rounded-full text-sm
            font-semibold mb-6 w-fit"
          >
            {t('Recomemendations_Tips')}
          </div>

          <div
            className="flex flex-col gap-6 text-[#4A4D54]
           text-[17px] leading-[1.6]"
          >
            <p>{t('Recomemendations_desc')}</p>

            <p>{t('Recomemendations_desc1')}</p>
          </div>
        </div>

        <div className="w-full lg:flex-1">
          <RecommendationCards />
        </div>
      </div>
    </div>
  );
};
