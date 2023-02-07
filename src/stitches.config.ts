import {
  blue,
  slate,
  red,
  violet,
  slateDark,
  blueDark,
  redDark,
  violetDark,
  blackA,
} from '@radix-ui/colors';
import * as Stitches from '@stitches/react';
import { createStitches } from '@stitches/react';

export const { styled, css, theme, globalCss, keyframes, getCssText, config } = createStitches({
  theme: {
    colors: {
      ...slate,
      ...red,
      ...blue,
      ...blackA,
      // ...mint,
      // ...violet,
    },
    fonts: {
      heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      30: '120px',
    },
    sizes: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
    },
    fontSizes: {
      1: '.75rem',
      2: '.875rem',
      3: '1rem',
      4: '1.125rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.875rem',
      8: '2.25rem',
      9: '3rem',
      10: '3.75rem',
      11: '4.5rem',
      12: '6rem',
    },
    fontWeights: {
      1: 100,
      2: 200,
      3: 300,
      4: 400,
      5: 500,
      6: 600,
      7: 700,
      8: 800,
      9: 900,
    },
    lineHeights: {
      1: '1rem',
      2: '1.25rem',
      3: '1.5rem',
      4: '1.75rem',
      5: '1.75rem',
      6: '2rem',
      7: '2.25rem',
      8: '2.5rem',
      9: '3rem',
      10: '3.75rem',
      11: '4.5rem',
      12: '6rem',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
    },
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },
  utils: {
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: Stitches.PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: Stitches.PropertyValue<'margin'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'margin'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'margin'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'margin'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'margin'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value,
    }),

    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),
  },
});

const darkModeConfig = {
  colors: {
    ...slateDark,
    ...redDark,
    ...blueDark,
    ...blackA,
  },
};

const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },
  'html, body': {
    padding: 0,
    margin: 0,
    fontFamily: '$body',
  },
});

globalStyles();

export const darkTheme = Stitches.createTheme('dark-theme', darkModeConfig);
export type CSS = Stitches.CSS<typeof config>;
export type { ComponentProps, VariantProps, PropertyValue, ScaleValue } from '@stitches/react';
