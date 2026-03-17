import { useTranslation } from 'react-i18next';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-auto h-auto pt-8 lg:pt-15 xl:pt-30 pb-20">
      <div className="flex max-w-480 m-auto justify-between items-center">
        <div className="max-w-210">
          <h1
            className="text-black text-4xl md:text-5xl
           lg:text-7xl pb-6 text-left "
          >
            {t('title')}
          </h1>
          <p
            className="text-gray-500 text-lg
           lg:text-2xl pb-12 text-left"
          >
            {t('hero_description')}
          </p>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <button
              className="gap-2 text-indigo-700 bg-white
            flex items-center border-2 px-6 py-3 rounded-full
            w-[100%] lg:w-55 justify-center"
            >
              {t('More details')} <span>↘</span>
            </button>
            <button
              className="gap-2 text-white bg-indigo-700
            flex items-center border-2 px-6 py-3 rounded-full
            w-[100%] lg:w-55 justify-center"
            >
              {t('Start Test')} <span>→</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className=" hidden lg:block w-full h-full">
            <img src="./public/img/Hero_fon.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
