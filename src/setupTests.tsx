import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

export const mockRouterPush = vi.fn();
export const mockRouterReplace = vi.fn();
export const mockRouterRefresh = vi.fn();
let mockSearchParams = new URLSearchParams('page=1');

export const setMockSearchParams = (searchParams: string) => {
  mockSearchParams = new URLSearchParams(searchParams);
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: mockRouterReplace,
    refresh: mockRouterRefresh,
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
    refresh: mockRouterRefresh,
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}));

const messages: Record<string, string> = {
  'Search.placeholder': 'Search for item',
  'Search.button': 'Search',
  'Home.prev': 'Prev',
  'Home.next': 'Next',
  'Home.page': 'Page {currentPage} of {totalPages}',
  'Home.refresh': 'Refresh',
  'Home.loadError':
    'Unable to load characters right now. Check your connection and try again.',
  'Results.loading': 'Loading...',
  'Results.empty': 'No results',
  'Results.select': 'Select {name}',
  'Details.loading': 'Loading...',
  'Details.loadingLabel': 'Loading character details',
  'Details.unableToLoad': 'Unable to load character.',
  'Details.empty': 'No character',
  'Details.imageAlt': '{name} character portrait',
  'Details.species': 'Species: {species}',
  'Details.status': 'Status: {status}',
  'Details.description':
    'Description: {species} character with {status} status.',
  'Details.refresh': 'Refresh',
  'Details.close': 'Close',
  'Flyout.selected': '{count} selected',
  'Flyout.unselectAll': 'Unselect all',
  'Flyout.download': 'Download',
};

const interpolateMessage = (
  message: string,
  values: Record<string, string | number> = {}
) =>
  Object.entries(values).reduce(
    (text, [key, value]) => text.split(`{${key}}`).join(String(value)),
    message
  );

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: (namespace: string) => {
    return (key: string, values?: Record<string, string | number>) =>
      interpolateMessage(messages[`${namespace}.${key}`] ?? key, values);
  },
}));
