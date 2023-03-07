import type { AppProps } from 'next/app';
import { ConnectProvider } from 'arweave-wallet-ui-test';
import { ThemeProvider } from 'next-themes';
import { darkTheme, globalCss } from '@aura-ui/react';

const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },
  '*': {
    '*:focus:not(.focus-visible)': {
      outline: 'none',
    },
  },
  'html, body, #root, #__next': {
    height: '100%',
    fontFamily: '$body',
    margin: 0,
    backgroundColor: '$slate1',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },
  a: {
    textDecoration: 'none',
  },
});

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConnectProvider>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: 'light-theme', dark: darkTheme.toString() }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </ConnectProvider>
  );
}