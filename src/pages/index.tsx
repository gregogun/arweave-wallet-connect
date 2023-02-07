// import { Button } from '@aura-ui/button';
import { ConnectWallet } from '../components';
import { Box } from '@aura-ui/layout';
import { Flex } from '../components/Flex';

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
