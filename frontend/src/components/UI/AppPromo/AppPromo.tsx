import React from 'react';
import { useTranslation } from 'react-i18next';

export const AppPromo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="max-w-480 mx-auto px-4 py-12
    lg:py-24 flex flex-col lg:flex-row-reverse items-center gap-12"
    >
      <div className="flex-1 flex flex-col text-left">
        <div
          className="mb-6 px-6 py-1 bg-primary-20 text-primary-dark-90
         text-lg font-semibold rounded-full w-fit"
        >
          {t('Addition')}
        </div>
        <h1
          className="text-4xl lg:text-5xl font-bold
         text-gray-900 mb-6 leading-tight w-full"
        >
          {t('Mobile_application')}
          <br />
        </h1>

        <p className="text-gray-500 text-lg mb-8 max-w-xl">
          {t('AppPromo_description')}
        </p>

        <ul className="space-y-4 mb-10">
          {[
            t('AppPromo_description_p_1'),
            t('AppPromo_description_p_2'),
            t('AppPromo_description_p_3'),
          ].map((text, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-1 bg-green-500 rounded-full p-1 shrink-0">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">{text}</span>
            </li>
          ))}
        </ul>

        {/* Кнопки */}
        <div className="flex flex-col lg:flex-row gap-4">
          <button
            className="flex items-center gap-2 bg-[#4C459D] border-2
           text-white px-8 py-4 lg:w-[50%] lg:h-16
           rounded-2xl hover:bg-opacity-90 transition-all shadow-lg"
          >
            <img src="./img/Apple.png" className="w-4 h-4 " alt="Apple" />
            <span className="font-semibold">{t('AppPromo_IOS')}</span>
          </button>

          <button
            className="flex items-center gap-2
          bg-[#F4F2FF] text-[#4C459D] border-2
           border-indigo-100  px-8 py-4 lg:w-[50%]
            lg:h-16 rounded-2xl hover:bg-indigo-50 transition-all shadow-sm"
          >
            <img src="./img/play.png" className="w-6 h-6" alt="Android" />
            <span className="font-semibold">{t('AppPromo_Android')}</span>
          </button>
        </div>
      </div>

      <div
        className="relative flex-1 flex items-center
      justify-center lg:justify-center"
      >
        <div
          className="absolute top-30 lg:top-50 left-1/2
          -translate-x-1/2 -translate-y-1/2
               w-[110%] h-[110%] bg-indigo-50 rounded-[40px] -z-10
               lg:w-full lg:h-full lg:max-w-113"
        />
        <div className="max-w-70 lg:max-w-100 z-10">
          <img
            src="./img/Iphon.png"
            alt="Emora App Mockup"
            className="w-full h-auto object-contain drop-shadow-2xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
};
