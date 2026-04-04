import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const images = ['./img/team1.png', './img/team2.png', './img/team3.png'];

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="max-w-480 mx-auto
     block about-section pt-55"
      id="target-component"
    >
      <div
        className="px-6 py-1 bg-primary-20 text-primary-dark-90
      text-lg font-semibold rounded-full w-fit"
      >
        {t('teams')}
      </div>
      <h2 className="pt-5 pb-10 text-5xl">{t('About_title')}</h2>

      <div className="flex gap-6 items-center  ">
        <div
          className="flex flex-col  lg:justify-between
         h-full max-w-480 lg:max-w-[50%] "
        >
          <div>
            <p className="text-lg text-gray-700 pb-7 ">
              {t('About_description_1')}
            </p>

            <p className="text-gray-700 text-lg pb-25">
              {t('About_description_2')}
            </p>
          </div>

          <div>
            <p className="text-gray-600 text-sm">{t('About_description_3')}</p>
            <button
              onClick={() => {
                const element = document.getElementById('target-contact');

                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8  px-6 py-3 rounded-full
            flex items-center gap-2 bg-primary-30 duration-300
            hover:bg-primary-70"
            >
              <span>✉</span> {t('Contact_us')}
            </button>
          </div>
        </div>
        <div className="relative w-[50%] h-full hidden max-w-7xl lg:block">
          <img
            src={images[current]}
            className="w-full h-full object-cover
             rounded-2xl transition-opacity duration-500"
          />
        </div>
      </div>
    </section>
  );
};
