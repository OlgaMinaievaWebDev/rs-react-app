import styles from './page.module.css';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>About</h1>

      <p className={styles.subtitle}>Created by Olga Minaieva.</p>

      <p className={styles.description}>
        This application demonstrates migration from a Vite React SPA to Next.js
        App Router, including file-based routing, dynamic routes, URL-based
        navigation, cached API queries, and interactive client components.
      </p>

      <a
        className={styles.link}
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        RS School React Course
      </a>
    </section>
  );
}
