import React from 'react';
import { useTranslation } from 'react-i18next';
import { BadgeCheck } from 'lucide-react';

export const AppPromo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="max-w-480 mx-auto px-4 py-12
    lg:py-24 flex flex-col lg:flex-row-reverse items-center gap-12"
    >
      <div className="flex-1 flex flex-col text-left">
        <div
          className=" px-6 py-1 bg-primary-30 text-primary-dark-90
         text-lg font-semibold rounded-full w-fit mb-8"
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
              <BadgeCheck className="w-6 h-6 text-green-600" />
              <span className="text-gray-700 font-medium">{text}</span>
            </li>
          ))}
        </ul>

        {/* Кнопки */}
        <div className="flex flex-col lg:flex-row gap-4 w-fit">
          <button
            className="flex items-center gap-2
          bg-primary-dark-90 border-2 text-white
           border-indigo-100  pl-9 pr-2 py-4 lg:w-[50%]
            lg:h-16 rounded-full hover:bg-primary-dark-80 transition-all shadow-sm"
          >
            <img src="./icons/apple.svg" className="w-6 h-6 " alt="Apple" />
            <span className="font-medium">{t('AppPromo_IOS')}</span>
          </button>

          <button
            className="w-fit flex items-center gap-2
          bg-[#F4F2FF] text-[#4C459D] border-2
           border-indigo-100  pl-6 pr-11 py-4 lg:w-[50%]
            lg:h-16 rounded-full hover:bg-indigo-50 transition-all shadow-sm
            "
          >
            <img src="./img/play.png" className="w-6 h-6" alt="Android" />
            <span className="font-medium w-fit whitespace-nowrap">
              {t('AppPromo_Android')}
            </span>
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
        <div className="max-w-70 lg:max-w-250 z-10">
          <img
            src="./icons/ifon.svg"
            alt="Emora App Mockup"
            className="w-full h-auto object-contain drop-shadow-2xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
};
