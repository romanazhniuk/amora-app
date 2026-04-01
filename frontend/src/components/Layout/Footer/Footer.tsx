import React from 'react';
import { useTranslation } from 'react-i18next';

import WaveFoter from './../../../../public/icons/wavefoter.svg';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="relative pt-16 mt-16 pb-8 px-4 bg-primary-30 pl-4 pr-4 md:pl-6
     md:pr-6 lg:pl-15
      lg:pr-15 xl:pl-40 xl:pr-40"
      id="target-contact"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <img
            src={WaveFoter}
            alt="wave"
            className="absolute top-1 left-0 w-full
              -translate-y-full object-fill"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('footer.title')}
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl leading-relaxed">
              {t('footer.description')}
            </p>

            <form className="space-y-6 max-w-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div
                  className="flex-1 border-b border-gray-300
                 focus-within:border-indigo-600 transition"
                >
                  <label
                    className="block text-xs font-bold uppercase
                   text-gray-900"
                  >
                    {t('footer.form.name')}
                  </label>
                  <input
                    type="text"
                    placeholder="John Wick"
                    className="w-full py-2 bg-transparent outline-none
                     placeholder:text-gray-300"
                  />
                </div>
                <div
                  className="flex-1 border-b border-gray-300
                 focus-within:border-indigo-600 transition"
                >
                  <label
                    className="block text-xs font-bold uppercase
                   text-gray-900"
                  >
                    {t('footer.form.email')}
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full py-2 bg-transparent outline-none
                     placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div
                className="border-b border-gray-300
               focus-within:border-indigo-600 transition"
              >
                <label
                  className="block text-xs font-bold uppercase
                 text-gray-900"
                >
                  {t('footer.form.subject')}
                </label>
                <input
                  type="text"
                  placeholder="Співпраця, загальні питання..."
                  className="w-full py-2 bg-transparent outline-none
                   placeholder:text-gray-300"
                />
              </div>

              <button
                className="bg-[#4F46E5] hover:bg-[#4338CA]
               text-white px-8 py-3 rounded-full flex items-center gap-2
               transition-all transform hover:scale-105 active:scale-95"
              >
                {t('footer.form.send')}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:pl-20">
            <div>
              <h4 className="font-bold mb-6 text-gray-900">
                {t('footer.contacts_title')}
              </h4>
              <ul className="space-y-4 text-gray-600 text-sm">
                <li>
                  <a
                    href="mailto:Newpoin@team.com"
                    className="hover:text-indigo-600"
                  >
                    Newpoin@team.com
                  </a>
                </li>
                <li className="leading-relaxed">
                  м. Львів, вул. Шевченка 55/а
                  <br />
                  Центри допомоги &quot;Баланс&quot;
                </li>
                <li>
                  <a
                    href="tel:+380504442222"
                    className="hover:text-indigo-600 font-medium"
                  >
                    +380 (50) 444-22-22
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-gray-900">
                {t('footer.follow_title')}
              </h4>
              <ul className="space-y-4 text-sm text-gray-600">
                {['Linkedin', 'Facebook', 'Instagram', 'Twitter'].map(
                  social => (
                    <li key={social}>
                      <a
                        href="#"
                        className="flex items-center justify-between group
                         hover:text-indigo-600 transition"
                      >
                        {social}
                        <span
                          className="text-xs transform
                        group-hover:translate-x-1 group-hover:-translate-y-1
                         transition"
                        >
                          ↗
                        </span>
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
        <div
          className="pt-8 border-t border-gray-200 flex flex-col
         md:flex-row justify-center items-center gap-4
         text-[10px] sm:text-xs text-gray-400"
        >
          <div
            className="flex flex-col md:flex-row gap-4
          items-center uppercase tracking-wider"
          >
            <span>{t('footer.copy')}</span>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:underline">
              {t('footer.policy')}
            </a>
          </div>
          <span className="italic">{t('footer.motto')}</span>
        </div>
      </div>
    </footer>
  );
};
