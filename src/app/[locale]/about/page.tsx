import { getTranslations } from 'next-intl/server';

import styles from './page.module.css';

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

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
