import { useTranslation } from 'react-i18next';
import Wave from './../../../public/icons/Designппп.svg';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="flex  relative pl-4 pr-4 md:pl-6
     md:pr-6 lg:pl-15
      lg:pr-15 xl:pl-40 xl:pr-40 bg-primary"
    >
      <section
        className="w-auto max-w-480
       mx-auto  h-full pt-8 lg:pt-15 xl:pt-30 pb-30 "
      >
        <div className="flex  justify-between items-center">
          <div className="max-w-210">
            <h1
              className="text-gray-0 text-4xl md:text-5xl
           lg:text-6xl pb-6 text-left "
            >
              {t('title')}
            </h1>
            <p
              className="text-gray-10 text-lg
           lg:text-1xl pb-12 text-left"
            >
              {t('hero_description')}
            </p>

            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <Link to="/test" className="contents">
                <button
                  className="gap-2 text-gray-0 bg-primary-dark-90
            flex items-center  px-6 py-3 rounded-full
            w-full lg:w-55 justify-center
            hover:bg-primary-dark-80"
                >
                  {t('Start Test')} <span>→</span>
                </button>
              </Link>

              <button
                onClick={() => {
                  const element = document.getElementById('target-component');

                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="gap-2 text-gray-0 bg-primary
            flex items-center border-2 px-6 py-3 rounded-full
            w-full lg:w-55 justify-center duration-300
            hover:bg-gray-80 hover:border-transparent"
              >
                {t('More details')} <span>↘</span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className=" hidden lg:block w-full h-full min-w-120">
              <img src="./public/icons/Design.svg" alt="Desing" />
            </div>
          </div>

          <img
            src={Wave}
            alt="wave"
            className="absolute -bottom-0.5 left-0 w-full   object-fill"
          />
        </div>
      </section>
    </section>
  );
};

export default Hero;
