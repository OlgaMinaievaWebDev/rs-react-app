import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { Providers } from '../providers';
import { StyledComponentsRegistry } from '../styled-components-registry';
import { StyledAppShell } from '../layout.styles';
import { Navbar } from '../../components/Navbar';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <NextIntlClientProvider>
      <StyledComponentsRegistry>
        <Providers>
          <StyledAppShell>
            <Navbar />
            {children}
          </StyledAppShell>
        </Providers>
      </StyledComponentsRegistry>
    </NextIntlClientProvider>
  );
}
