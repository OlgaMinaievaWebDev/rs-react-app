import styles from './not-found.module.css';
import Link from 'next/link';

export const dynamic = 'force-static';

export default function NotFoundPage() {
  return (
    <section className={styles.section}>
      <h2 className={styles.header}>404</h2>
      <p className={styles.paragraph}>Page not found</p>
      <Link className={styles.link} href={'/'}>
        Return Home
      </Link>
    </section>
  );
}
