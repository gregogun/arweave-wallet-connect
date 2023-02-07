import { Box } from '../src/components/Box';
import { darkTheme } from '../src/stitches.config';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';

export const decorators = [
  (Story, context) => {
    let { scheme } = context.globals;
    console.log('story', window.arweaveWallet);
    return (
      <Box
        css={{
          backgroundColor: '$slate1',
          padding: '$3',
          margin: '-$4',
          height: '100vh',
          color: '$slate12',
        }}
        className={scheme === 'dark' && darkTheme}
      >
        <Story />
      </Box>
    );
  },
];

export const globalTypes = {
  scheme: {
    name: 'Scheme',
    description: 'Select light or dark theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: ['light', 'dark'],
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// window.arweaveWallet = {
//   getActiveAddress: (...args) => args,
// };
// console.log('window', window, window.arweaveWallet);
