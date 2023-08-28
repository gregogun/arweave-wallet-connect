import type AppProps from 'next/app';
import { ConnectProvider } from 'arweave-wallet-ui-test';
import { ThemeProvider } from 'next-themes';
import { darkTheme, globalCss } from '@aura-ui/react';
import { ArweaveWebWallet } from 'arweave-wallet-connector';

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

const webWallet = new ArweaveWebWallet({
  name: 'wavehub',
  logo: `${typeof window !== 'undefined' && window.location.origin}/img/logo_text.svg`,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConnectProvider webWallet={webWallet}>
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
