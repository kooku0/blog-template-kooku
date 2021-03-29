/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import GlobalStyle from '../styles/global-styles';
import theme from '../styles/theme';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Blog-template-kooku</title>
      </Head>

      <Global styles={GlobalStyle} />
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <Component {...pageProps} />
        </React.StrictMode>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
