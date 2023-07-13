import Head from 'next/head';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import icon from '../../public/assets/logo2.png';


export default function App(props) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <>
      <Head>
        <title>Salesine</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href={icon} />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          primaryColor: 'indigo'
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}