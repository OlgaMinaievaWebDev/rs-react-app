import '@testing-library/jest-dom';
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
