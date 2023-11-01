import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { theme } from '@/utils/theme';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { MaxWidthLayout } from '@/layouts/MaxWidthLayout';
import NavLayout from '@/layouts/NavLayout';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const isRemoveLayout = [`/sign-in`, `/sign-up`].includes(router.pathname);
  const LayoutComponent = isRemoveLayout ? React.Fragment : NavLayout;

  return (
    <div className={roboto.className}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <ToastContainer />
          <LayoutComponent>
            <MaxWidthLayout>
              <Component {...pageProps} />
            </MaxWidthLayout>
          </LayoutComponent>
        </SessionProvider>
      </ThemeProvider>
    </div>
  );
}
