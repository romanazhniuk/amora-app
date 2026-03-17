import React from 'react';
import { useTranslation } from 'react-i18next';

export const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  const team = [
    {
      name: t('team.members.oleksandr_kovalenko.name'),
      role: t('team.members.oleksandr_kovalenko.role'),
      desc: t('team.members.oleksandr_kovalenko.desc'),
      img: './img/teamSection.png',
    },
    {
      name: t('team.members.mariya_shevchuk.name'),
      role: t('team.members.mariya_shevchuk.role'),
      desc: t('team.members.mariya_shevchuk.desc'),
      img: './img/teamSection.png',
    },
    {
      name: t('team.members.dmytro_bondar.name'),
      role: t('team.members.dmytro_bondar.role'),
      desc: t('team.members.dmytro_bondar.desc'),
      img: './img/teamSection.png',
    },
    {
      name: t('team.members.iryna_melnyk.name'),
      role: t('team.members.iryna_melnyk.role'),
      desc: t('team.members.iryna_melnyk.desc'),
      img: './img/teamSection.png',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto max-w-480   px-4 py-16">
      <div className="mb-12 text-left">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t('TeamSection_title')}
        </h2>
        <p className="text-gray-500 max-w-3xl leading-relaxed">
          {t('TeamSection_description')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <div key={index} className="flex flex-col group">
            <div
              className="aspect-square bg-[#EDEDED] rounded-xl
            mb-6 overflow-hidden relative"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover
                transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="border-b border-gray-200 pb-2 mb-4">
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{member.role}</p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
              {member.desc}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-black hover:opacity-70 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* eslint-disable-next-line max-len */}
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-black hover:opacity-70 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
