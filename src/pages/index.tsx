// import { Button } from '@aura-ui/button';
import { ConnectWallet } from '../components';
import { Flex } from '@aura-ui/react';

export default function Home() {
  return (
    <Flex
      justify="center"
      css={{
        mt: '$16',
      }}
    >
      <ConnectWallet permissions={['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES']} />
    </Flex>
  );
}
