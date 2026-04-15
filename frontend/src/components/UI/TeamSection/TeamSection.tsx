import React from 'react';
import { useTranslation } from 'react-i18next';

export const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  const team = [
    {
      id: '1',
      name: t('team.members.Chuchman_Oleksandr.name'),
      role: t('team.members.Chuchman_Oleksandr.role'),
      desc: t('team.members.Chuchman_Oleksandr.desc'),
      img: './icons/team1.svg',
    },
    {
      id: '2',
      name: t('team.members.Senyk_Bohdank.name'),
      role: t('team.members.Senyk_Bohdank.role'),
      desc: t('team.members.Senyk_Bohdank.desc'),
      img: './icons/team2.svg',
    },
    {
      id: '3',
      name: t('team.members.Shenger_Roman.name'),
      role: t('team.members.Shenger_Roman.role'),
      desc: t('team.members.Shenger_Roman.desc'),
      img: './icons/team3.svg',
    },
  ];

  return (
    <section className=" mx-auto max-w-480   px-4 py-16">
      <div
        className="flex w-fit px-6 py-1 bg-primary-30 text-primary-dark-90
      text-lg font-semibold rounded-full mb-8"
      >
        {t('Our_team')}
      </div>
      <div className="mb-12 text-left">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-4">
          {t('TeamSection_title')}
        </h2>
        <p
          className="text-gray-80 max-w-3xl
        leading-relaxed text-base lg:text-lg font-regular"
        >
          {t('TeamSection_description')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map(member => (
          <div key={member.id} className="flex flex-col group">
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
              <h3 className="text-xl font-semibold text-gray-100">
                {member.name}
              </h3>
            </div>
            <div className="border-b border-gray-200 pb-4 mb-4 ">
              <p className="text-gray-400 text-sm mt-1">{member.role}</p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
              {member.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
