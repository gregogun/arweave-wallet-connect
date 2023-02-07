import { Grid, Flex, Typography, keyframes, styled, TextField, Button, Box } from '@aura-ui/react';

const moveBg = keyframes({
  to: {
    backgroundPosition: 'var(--bg-size) 0',
  },
});

const ControlGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  width: '100%',
});

export default function Forks() {
  return (
    <Grid
      css={{
        placeItems: 'center',
        height: '100%',
        background: 'url(/img/bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <Box
        css={{
          width: '100%',
          position: 'absolute',
          top: 0,
        }}
      >
        <Flex
          css={{
            py: '$5',
            px: '$30',
            boxShadow: '0 1px 0 0 $colors$indigo3',
            backdropFilter: 'blur($space$2)',
          }}
          justify="between"
        >
          <Typography size="6" weight="6" contrast="hiContrast">
            Evolutionary Apps
          </Typography>
          <Button colorScheme="indigo" variant="ghost">
            Connect Wallet
          </Button>
        </Flex>
      </Box>
      <Flex
        css={{
          mt: '-$20',
          p: '$10',
          br: '$3',
          boxShadow: 'inset 0 0 0 2px $colors$indigo4',
          backdropFilter: 'blur($space$3)',
        }}
        align="center"
        direction="column"
        gap="10"
      >
        <Flex align="center" direction="column" gap="3">
          <Typography
            css={{
              '--bg-size': '400%',

              letterSpacing: '-1px',
              background: `linear-gradient(
              90deg,
              hsla(263, 93%, 69%, 1),
              hsla(282, 57%, 64%, 1),
              hsla(325, 55%, 66%, 1),
              hsla(0, 92%, 75%, 1),
              hsla(16, 65%, 78%, 1),
              hsla(32, 50%, 80%, 1),
              hsla(16, 65%, 78%, 1),
              hsla(0, 92%, 75%, 1),
              hsla(325, 55%, 66%, 1),
              hsla(282, 57%, 64%, 1),
              hsla(263, 93%, 69%, 1)
            ) 0 0 / var(--bg-size) 100%`,

              color: 'transparent',
              '-webkit-background-clip': 'text',
              backgroundClip: 'text',

              '@media (prefers-reduced-motion: no-preference)': {
                animation: `${moveBg} 12s infinite linear`,
              },
            }}
            size="4"
            weight="5"
          >
            A whole new era for web applications
          </Typography>
          <Typography contrast="hiContrast" css={{ letterSpacing: '-1px' }} size="8" weight="6">
            Evolutionary App Explorer
          </Typography>
        </Flex>
        <ControlGroup>
          <TextField
            size="2"
            variant="outline"
            css={{ width: '100%' }}
            placeholder="Enter your app Asset ID"
          />
          <Button
            css={{
              color: '$indigo11',
              backgroundColor: '$indigoA3',

              '&:hover': {
                backgroundColor: '$indigoA4',
              },

              '&:active': {
                backgroundColor: '$indigoA5',
              },

              '&:focus-visible': {
                boxShadow: 'inset 0 0 0 2px $colors$blue8',
              },
            }}
            size="3"
          >
            View Fork Tree
          </Button>
        </ControlGroup>
      </Flex>
    </Grid>
  );
}
