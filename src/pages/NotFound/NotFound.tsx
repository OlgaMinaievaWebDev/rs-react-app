import { Link } from 'react-router-dom';
import './NotFound.css';

export function NotFound() {
  return (
    <section className="not-found-page">
      <h2>404</h2>
      <p>Page not found</p>
      <Link to={'/'}>Return Home</Link>
    </section>
  );
}
