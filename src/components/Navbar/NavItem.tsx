'use client';
import { Link, usePathname } from '../../i18n/navigation';

import type { NavItemProps } from './Navbar.interfaces';
import { StyledLink } from './Navbar.styles';

export function NavItem({ children, to }: NavItemProps) {
  const pathname = usePathname() ?? '/';

  const isHomeActive =
    to === '/' && (pathname === '/' || pathname.startsWith('/details'));
  const isActive = isHomeActive || pathname === to;
  return (
    <Link href={to} style={{ textDecoration: 'none' }}>
      <StyledLink $isActive={isActive}>{children}</StyledLink>
    </Link>
  );
}
