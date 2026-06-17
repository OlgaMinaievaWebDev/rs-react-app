import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Rick and Morty Character Explorer',
  description:
    'Search, browse, and explore Rick and Morty characters, view details, and export selected results.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
