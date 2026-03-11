import React from 'react';
import s from './AboutSection.module.scss'; // Або .module.css
import { useTranslation } from 'react-i18next';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  const features = t('features', { returnObjects: true }) as Feature[];

  return (
    <section className={s.aboutSection}>
      <h2 className={s.title}>{t('About_title')}</h2>
      <div className={s.container}>
        <div className={s.textContent}>
          <div className={s.description}>
            <p>{t('About_description_1')}</p>
            <p>{t('About_description_2')}</p>
            <p>{t('About_description_3')}</p>
          </div>
        </div>

        <div className={s.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={s.featureCard}>
              <div className={s.iconWrapper}>{feature.icon}</div>
              <h4 className={s.cardTitle}>{feature.title}</h4>
              <p className={s.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
