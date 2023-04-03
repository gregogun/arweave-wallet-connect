import { ConnectWallet } from 'arweave-wallet-ui-test';
import { Flex } from '@aura-ui/react';

export default function Home() {
  return (
    <Flex
      justify="center"
      css={{
        mt: '$16',
      }}
    >
      <ConnectWallet
        permissions={['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES']}
        connectButtonColorScheme="indigo"
        connectButtonVariant="solid"
      />
    </Flex>
  );
}
