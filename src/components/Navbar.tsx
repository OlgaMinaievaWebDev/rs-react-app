import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to={'/'}
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Home
      </NavLink>
      <NavLink
        to={'/about'}
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        About
      </NavLink>
    </nav>
  );
}
