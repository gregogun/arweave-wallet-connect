import { ConnectWallet, useConnect } from 'arweave-wallet-ui-test';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Button,
  Flex,
  Separator,
  Typography,
} from '@aura-ui/react';
import { useEffect } from 'react';

export default function Home() {
  const { walletAddress, profile, config, reconnect, connecting, currentProvider } = useConnect();

  useEffect(() => {
    if (currentProvider) {
      if (reconnect) {
        localStorage.setItem('shouldReconnect', currentProvider);
      }
    }
  }, [currentProvider]);

  useEffect(() => {
    if (connecting) {
      if (reconnect) {
        return;
      } else {
        localStorage.removeItem('shouldReconnect');
      }
    }
  }, [reconnect]);

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      css={{
        mt: '$16',
      }}
      gap="10"
    >
      <ConnectWallet
        permissions={[
          'ACCESS_ADDRESS',
          'ACCESS_ALL_ADDRESSES',
          'ACCESS_ARWEAVE_CONFIG',
          'DISPATCH',
          'ACCESS_PUBLIC_KEY',
        ]}
        appName="Wallet Test App"
      >
        <Button size="3" colorScheme="brown">
          {walletAddress ? 'Disconnect' : connecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </ConnectWallet>
      <Flex
        css={{ p: '$5', br: '$3', boxShadow: '0 0 0 1px $colors$slate6', minWidth: 300 }}
        direction="column"
        gap="3"
      >
        <Flex gap="5" align="center">
          <Avatar size="5">
            <AvatarImage src={profile?.avatar} />
            <AvatarFallback>{walletAddress?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <Flex direction="column">
            <Typography contrast="hiContrast" size="4" weight="6">
              {profile?.handle}
            </Typography>
            <Typography>{profile?.uniqueHandle}</Typography>
          </Flex>
        </Flex>
        <Separator css={{ mt: '$3' }} />
        <Box>
          <Typography contrast="hiContrast">Bio</Typography>
          <Typography>{profile?.bio || 'No bio'}</Typography>
        </Box>
        <Separator css={{ mt: '$3' }} />
        <Flex gap="2">
          <Typography>
            {walletAddress ? 'Connected with: ' : 'Previously connected with: '}
          </Typography>
          <Typography contrast="hiContrast">{currentProvider}</Typography>
        </Flex>
        <Flex gap="2">
          <Typography>Preferred gateway: </Typography>
          <Typography contrast="hiContrast">{config?.host}</Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}
