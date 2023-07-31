import { ConnectWallet, useConnect } from 'arweave-wallet-ui-test';
import { Flex, Typography } from '@aura-ui/react';

export default function Home() {
  const { walletAddress, profile, config } = useConnect();

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
        permissions={['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'ACCESS_ARWEAVE_CONFIG']}
        appName="Wallet Test App"
        options={{
          connectButtonType: 'icon',
        }}
      />
      <Flex direction="column" gap="3">
        <Flex gap="2">
          <Typography css={{ opacity: 0.6 }}>Wallet Address:</Typography>
          <Typography>{walletAddress}</Typography>
        </Flex>
        <Flex gap="2">
          <Typography css={{ opacity: 0.6 }}>Account Info:</Typography>
          <Typography>{profile?.uniqueHandle || walletAddress}</Typography>
        </Flex>
        <Flex gap="2">
          <Typography css={{ opacity: 0.6 }}>Preferred Gateway:</Typography>
          <Typography>{config?.host}</Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}
