import { ConnectWallet, useConnect } from 'arweave-wallet-ui-test';
import { Button, Flex, Typography } from '@aura-ui/react';
import { useEffect } from 'react';

export default function Home() {
  const { walletAddress, profile, config, connect, disconnect, connecting } = useConnect();

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
        <Button onClick={() => console.log('hello')} size="3" colorScheme="brown">
          {walletAddress ? 'Disconnect' : 'Connect Wallet'}
        </Button>
      </ConnectWallet>
      <Flex direction="column" gap="3">
        <Flex gap="2">
          <Typography css={{ opacity: 0.6 }}>Wallet Address:</Typography>
          <Typography>{walletAddress}</Typography>
        </Flex>
        <Flex gap="2">
          <Typography css={{ opacity: 0.6 }}>Account Handle:</Typography>
          <Typography>{profile?.uniqueHandle}</Typography>
        </Flex>
        <Flex gap="2">
          <Typography css={{ opacity: 0.6 }}>Preferred Gateway:</Typography>
          <Typography>{config?.host}</Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}
