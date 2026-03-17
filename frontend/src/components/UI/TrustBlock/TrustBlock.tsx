import React from 'react';
import styles from './TrustBlock.module.scss';
import { useTranslation } from 'react-i18next';

const logos = [
  {
    id: 1,
    src: './img/image29.png',
    alt: 'Speech Therapy',
  },
  { id: 2, src: './img/image30.png', alt: 'Therapy' },
  { id: 3, src: './img/image31.png', alt: 'Mental Health' },
  { id: 4, src: './img/image32.png', alt: 'Health' },
  {
    id: 5,
    src: './img/image33.png',
    alt: 'Speech Therapy Blue',
  },
];

export const TrustBlock: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.trustBlock}>
      <h2
        className="flex text-lg font-medium
       justify-center "
      >
        {t('trust_title')}
      </h2>
      <div className="relative w-full overflow-hidden py-10">
        <div className={styles.logos_track}>
          {[...logos, ...logos].map((logo, index) => (
            <div key={`${logo.id}-${index}`} className={styles.logo_item}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
