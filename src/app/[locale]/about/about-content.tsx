'use client';

import { useTranslations } from 'next-intl';

import styles from './page.module.css';

export function AboutContent() {
  const t = useTranslations('About');

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{t('title')}</h1>

      <p className={styles.subtitle}>{t('subtitle')}</p>

      <p className={styles.description}>{t('description')}</p>

      <a
        className={styles.link}
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        {t('courseLink')}
      </a>
    </section>
  );
}
