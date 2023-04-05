import { EntriesProvider } from '@/context/entries';
import { UIProvider } from '@/context/ui';
import '@/styles/globals.css';
import { darkTheme, lightTheme } from '@/themes';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}
