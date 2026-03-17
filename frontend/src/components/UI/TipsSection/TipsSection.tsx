/* eslint-disable @typescript-eslint/indent */
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categories, recommendations } from './../../../data/recommendations';

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
    <section className="max-w-420 pt-25 flex w-auto flex-col ">
      <h2 className="text-5xl pb-5">{t('TipsSection_title')}</h2>
      <p className="text-xl text-gray-600 pb-12">
        {t('TipsSection_description')}
      </p>

      <div className="flex flex-wrap gap-4 mb-10 ">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`pb-2 text-sm transition
          ${
            activeCategory === cat.id
              ? 'border-b-2 border-black font-semibold'
              : 'text-gray-700'
          }`}
          >
            {t(cat.key)}
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
            className="min-w-[260px] flex-shrink-0
             bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="aspect-video mb-4 rounded-lg overflow-hidden">
              <iframe
                src={item.video}
                title={t(`${item.itemKey}.title`)}
                className="w-full h-full block"
                allowFullScreen
              />
            </div>

            <h3 className="font-semibold mb-2">{t(`${item.itemKey}.title`)}</h3>

            <p className="text-sm text-gray-500">{t(`${item.itemKey}.text`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
