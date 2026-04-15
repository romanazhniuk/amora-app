import { useTranslation } from 'react-i18next';
import {
  Check,
  Clock,
  Brain,
  BicepsFlexed,
  ChartNoAxesCombined,
} from 'lucide-react';
import { ResultProps } from '../../types/test';

export const Result = ({ resaltss }: ResultProps) => {
  const { t } = useTranslation('quiz');

  if (!resaltss) {
    return (
      <div
        className="text-center p-20 bg-white rounded-4xl
      border border-gray-10"
      >
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-purple-100 rounded-full mb-4"></div>
          <p className="text-gray-40 font-medium">{t('results.loading')}</p>
        </div>
      </div>
    );
  }

  const typeTitle = t(resaltss.titleKey);
  const typeDescription = t(resaltss.descriptionKey);

  const strengths = t(resaltss.strengthsKey, { returnObjects: true });
  const growth = t(resaltss.growthKey, { returnObjects: true });

  const strengthsList = Array.isArray(strengths) ? strengths : [];
  const growthList = Array.isArray(growth) ? growth : [];

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div
            className="inline-block bg-primary-30
           text-primary-dark-90 px-4 py-1 rounded-full
            text-sm font-semibold mb-2 w-fit"
          >
            {t('results.badge')}
          </div>
          <div className="space-y-4">
            <p
              className="text-gray-90  text-lg
             font-regular leading-[1.35] -tracking-[0.01em]"
            >
              {t('results.description_p1')}
            </p>
            <p
              className="text-gray-90  text-lg font-regular
             leading-[1.35] -tracking-[0.01em] "
            >
              {t('results.description_p2')}
            </p>
          </div>
        </div>

        <div
          className="lg:col-span-7 grid grid-cols-1
         md:grid-cols-2 gap-4"
        >
          <div
            className="md:col-span-2 bg-white p-6
          rounded-3xl border-2 border-blue-50
          shadow-[0_0_10px_rgba(141,117,230,0.15)]
          flex flex-col gap-4"
          >
            <div
              className="w-11 h-11 bg-blue-50 rounded-full
            flex items-center justify-center"
            >
              <Brain className="text-blue-700 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {t('results.type_title', { title: typeTitle })}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {t('results.type_subtitle')}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {typeDescription}
              </p>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-3xl
           border-2 border-blue-50 shadow-[0_0_10px_rgba(141,117,230,0.15)]
           flex flex-col gap-4"
          >
            <div
              className="w-12 h-12 bg-green-50 rounded-full
             flex items-center justify-center"
            >
              <BicepsFlexed className="text-green-700 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">
                {t('results.strengths_title')}
              </h4>
              <p className="text-xs text-gray-400 mb-4">
                {t('results.strengths_subtitle')}
              </p>
              <ul className="space-y-3">
                {strengthsList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm
                     text-gray-700 font-medium"
                  >
                    <Check
                      size={16}
                      className="text-green-500 shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="bg-white p-6 rounded-3xl border-2
           border-blue-50 shadow-[0_0_10px_rgba(141,117,230,0.15)]
            flex flex-col gap-4"
          >
            <div
              className="w-12 h-12 bg-orange-50
            rounded-full flex items-center justify-center"
            >
              <ChartNoAxesCombined className="text-orange-400 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">
                {t('results.growth_title')}
              </h4>
              <p className="text-xs text-gray-400 mb-4">
                {t('results.growth_subtitle')}
              </p>
              <ul className="space-y-3">
                {growthList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <Clock
                      size={16}
                      className="text-orange-300 shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
