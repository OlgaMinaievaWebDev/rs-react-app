import { getTranslations } from 'next-intl/server';

import styles from './not-found.module.css';
import { Link } from '../../i18n/navigation';

export const dynamic = 'force-static';

export default async function NotFoundPage() {
  const t = await getTranslations('NotFound');

  return (
    <section className={styles.section}>
      <h2 className={styles.header}>404</h2>
      <p className={styles.paragraph}>{t('message')}</p>
      <Link className={styles.link} href={'/'}>
        {t('home')}
      </Link>
    </section>
  );
}
