import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { keyframes, styled } from '../stitches.config';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  mx: '-$3',
  backgroundColor: '$slate6',
});

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const DropdownMenuContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: 180,
  backgroundColor: '$slate1',
  br: '$3',
  border: '1px solid $slate6',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  p: '$2',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, {
  unset: 'all',
  fontSize: '$2',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  py: '$2',
  pl: '$2',
  pr: '$5',
  br: '$2',
  gap: '$2',
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',
  color: '$slate9',

  variants: {
    color: {
      slate: {
        '&:hover': {
          color: '$slate11',
          backgroundColor: '$slate4',
        },

        '&:active': {
          color: '$slate11',
          backgroundColor: '$slate5',
        },

        '&:focus': {
          outline: 'none',
          backgroundColor: '$slate5',
          color: '$slate11',
        },
      },
      red: {
        '&:hover': {
          color: '$red11',
          backgroundColor: '$red4',
        },

        '&:active': {
          color: '$red11',
          backgroundColor: '$red5',
        },

        '&:focus': {
          outline: 'none',
          backgroundColor: '$red5',
          color: '$red11',
        },
      },
    },
  },

  defaultVariants: {
    color: 'slate',
  },
});
