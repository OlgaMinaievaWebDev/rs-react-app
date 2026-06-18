import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

export const mockRouterPush = vi.fn();
export const mockRouterReplace = vi.fn();
let mockSearchParams = new URLSearchParams('page=1');

export const setMockSearchParams = (searchParams: string) => {
  mockSearchParams = new URLSearchParams(searchParams);
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: mockRouterReplace,
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useParams: () => ({ id: '1' }),
  useSearchParams: () => mockSearchParams,
}));

vi.mock('./i18n/navigation', () => ({
  Link: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  useRouter: () => ({
    push: mockRouterPush,
    replace: mockRouterReplace,
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}));
