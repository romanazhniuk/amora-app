/* eslint-disable @typescript-eslint/indent */
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categories, recommendations } from './../../../data/recommendations';
import Icon from './../../../../public/icons/icontip.svg';

export const TipsSection: React.FC = () => {
  const { t } = useTranslation('tips');
  const [activeCategory, setActiveCategory] = useState('breathing');
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentData =
    recommendations[activeCategory as keyof typeof recommendations];

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-480 pt-25 flex w-auto flex-col   mx-auto">
      <div
        className="px-6 py-1 bg-primary-20 text-primary-dark-90
       text-lg font-semibold rounded-full  mb-8 w-fit"
      >
        {t('Health_resources')}
      </div>
      <h2 className="text-4xl pb-5">{t('TipsSection_title')}</h2>
      <p className="text-xl text-gray-600 pb-12">
        {t('TipsSection_description')}
      </p>

      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6 mb-10">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-1 pb-3 text-left transition-all duration-300 border-b-4
      ${
        activeCategory === cat.id
          ? 'border-primary-dark-90 text-primary-dark-90'
          : // eslint-disable-next-line max-len
            'border-indigo-100 text-indigo-200 hover:text-primary-dark-90 hover:border-primary-dark-80'
      }`}
          >
            <div className="flex items-center gap-3">
              {/* Номер категорії */}
              <span className="text-base font-medium">{index + 1}</span>
              {/* Назва категорії */}
              <span
                className={`text-sm lg:text-base ${activeCategory === cat.id ? 'font-bold' : 'font-medium'}`}
              >
                {t(cat.key)}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={scrollLeft}
          className="w-10 h-10 rounded-full border flex
           items-center justify-center"
        >
          ←
        </button>

        <button
          onClick={scrollRight}
          className="w-10 h-10 rounded-full border flex
           items-center justify-center"
        >
          →
        </button>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
      >
        {currentData.map(item => (
          <div
            key={item.id}
            className="min-w-65 shrink-0
             bg-white border rounded-xl p-4 shadow-sm max-w-[320px]"
          >
            <div className="aspect-video mb-4 rounded-lg overflow-hidden">
              <iframe
                src={item.video}
                title={t(`${item.itemKey}.title`)}
                className="h-auto w-auto max-h-60 "
                allowFullScreen
              />
            </div>

            <h3 className="font-semibold mb-2">{t(`${item.itemKey}.title`)}</h3>

            <p
              className="text-sm text-gray-500 leading-relaxed line-clamp-3
            max-w-[90%] lg:max-w-xs"
            >
              {t(`${item.itemKey}.text`)}
            </p>
            <div className="mt-auto pt-4">
              <div className="group flex items-center cursor-pointer w-fit">
                <a href={item.video}>
                  <div
                    className="flex items-center bg-primary-70
                     text-primary-dark-90 rounded-full
         p-2.5 transition-all duration-500 ease-in-out group-hover:pr-5"
                  >
                    {/* Текст, що виїжджає при наведенні */}
                    <span
                      className="max-w-0 overflow-hidden
                       whitespace-nowrap font-bold
           text-sm transition-all duration-500 ease-in-out
            group-hover:max-w-30 group-hover:pl-2 group-hover:pr-2"
                    >
                      Переглянути
                    </span>

                    {/* SVG Стрілка з вашого дизайну */}
                    <div
                      className="w-5 h-5 bg-primary-70 rounded-full
           flex items-center justify-center shrink-0"
                    >
                      <img src={Icon} alt="icon" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
