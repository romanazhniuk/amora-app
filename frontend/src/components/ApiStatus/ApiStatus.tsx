import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchHealth } from '../../api/health';
import styles from './ApiStatus.module.scss';

type Status = 'checking' | 'ok' | 'error';

export const ApiStatus: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    let cancelled = false;
    fetchHealth()
      .then((data) => {
        if (!cancelled && data.status === 'ok') {
          setStatus('ok');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error');
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <p
      className={styles.apiStatus}
      data-status={status}
      aria-live="polite"
    >
      <span className={styles.apiStatus__dot}>●</span>{' '}
      {status === 'checking' && t('api_status_checking')}
      {status === 'ok' && t('api_status_ok')}
      {status === 'error' && t('api_status_error')}
    </p>
  );
};
