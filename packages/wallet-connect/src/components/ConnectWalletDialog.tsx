import * as React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogOverlay,
  Button,
  IconButton,
  DialogTrigger,
  Flex,
  Typography,
  Link,
  DialogPortal,
  Box,
} from '@aura-ui/react';
import { PermissionType } from 'arconnect';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useConnect } from '../hooks/useConnect';
import { Image } from './Image';
import { useState } from 'react';
import { abbreviateAddress } from '../utils';
import { config } from '../utils/config';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { ArweaveConfig, ArweaveWalletProps, PermaProfile } from '../types';
import { ArweaveLogo } from '../Icons/ArweaveLogo';
import { ArconnectLogo } from '../Icons/ArconnectLogo';
import { account } from '../lib/account';

interface WalletServiceProps {
  name: 'Arweave.app' | 'Arconnect';
  logo: any;
}

const walletItems: WalletServiceProps[] = [
  {
    name: 'Arconnect',
    logo: 'https://arweave.net/dKJd2vi7RXG3kxaotGDLD6VZjLn58AD4xan5L9cN9es',
  },
  {
    name: 'Arweave.app',
    logo: 'https://arweave.net/9ENUQI5qIZDH5C9Ot7SjgRRgKwNIMETanueDKudxIRU',
  },
];

interface WalletItemProps {
  name: string | WalletServiceProps['name'];
  logo: any;
  connect: (name: string) => void;
}

const WalletItem = React.forwardRef<HTMLButtonElement, WalletItemProps>(
  ({ name, logo, connect }, ref) => {
    return (
      <Button
        onClick={() => connect(name.toLowerCase())}
        variant="ghost"
        css={{
          p: '$2',
          alignItems: 'center',
          gap: '$2',
          justifyContent: 'start',
          '& svg': { size: '$7', color: '$slate12' },
        }}
        size="3"
        ref={ref}
      >
        {name === 'Arweave.app' ? (
          <ArweaveLogo width={50} height={50} />
        ) : name === 'Arconnect' ? (
          <ArconnectLogo width={50} height={50} />
        ) : (
          <Image src={logo} />
        )}
        <Typography
          colorScheme={name === 'Arconnect' ? 'violet' : 'slate'}
          contrast={name === 'Arweave.app' ? 'hiContrast' : undefined}
          size="3"
          weight="6"
        >
          {name}
        </Typography>
      </Button>
    );
  }
);

interface ConnectWalletDialogProps {
  open: boolean;
  onClose: () => void;
  permissions: PermissionType[];
  profile: PermaProfile | undefined;
  arweaveWalletProps: ArweaveWalletProps | undefined;
  appName?: string;
  providers?: {
    arweaveApp: boolean;
    arconnect: boolean;
  };
}

export const ConnectWalletDialog = (props: ConnectWalletDialogProps) => {
  const { connect, addresses, completeConnection } = useConnect();
  const {
    permissions,
    profile,
    arweaveWalletProps,
    appName,
    providers = { arconnect: true, arweaveApp: true },
  } = props;

  const handleConnect = (name: string) => {
    props.onClose();
    return connect({
      appName: appName || 'this app',
      walletProvider: name as 'arweave.app' | 'arconnect',
      arweaveWalletProps,
      permissions,
    });
  };

  const handleCompleteConnect = (address: string) => completeConnection(address);

  const providerName = (name: string) => {
    if (name === 'Arconnect') {
      console.log(providers?.arconnect);
      return providers?.arconnect ? 'Arconnect' : '';
    }
    if (name === 'Arweave.app') {
      console.log(providers?.arweaveApp);
      return providers?.arweaveApp ? 'Arweave.app' : '';
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          css={{
            maxWidth: 320,
            left: '50%',
            px: '$2',
            py: '$3',
            display: 'flex',
            flexDirection: 'column',
            gap: '$2',
            textAlign: 'center',
            br: '$4',
          }}
        >
          <DialogClose asChild>
            <IconButton
              css={{
                position: 'fixed',
                top: 12,
                right: 12,
                br: '$round',
              }}
              aria-label="Close Dialog"
              variant="ghost"
              size="1"
            >
              <Cross2Icon />
            </IconButton>
          </DialogClose>
          <DialogTitle asChild>
            <Typography size="4" weight="6" contrast="hiContrast">
              Connect a Wallet
            </Typography>
          </DialogTitle>
          <DialogDescription asChild>
            <Typography css={{ textAlign: 'center', my: '$3' }} size="2">
              Choose a wallet to connect to{' '}
              <Typography size="2" as="span" weight="6" contrast="hiContrast">
                {appName || 'this app'}
              </Typography>
              :
            </Typography>
          </DialogDescription>
          <Box
            css={{
              width: '200%',
              height: 1,
              backgroundColor: '$slate5',
              mx: '-$5',
              position: 'relative',
            }}
          />
          <Flex css={{ br: '$4', width: '100%' }} direction="column" gap="3">
            {addresses && props.providers?.arconnect ? (
              <>
                <Typography size="1">Connect with one of the following wallets:</Typography>
                {addresses.map((address) => (
                  <WalletItem
                    key={address}
                    connect={() => handleCompleteConnect(address)}
                    name={abbreviateAddress({
                      address,
                      options: { startChars: 10, endChars: 8, noOfEllipsis: 4 },
                    })}
                    logo={profile?.avatar || `${config.boringAvatars}/28/${address}`}
                  />
                ))}
              </>
            ) : (
              <>
                {walletItems
                  .filter((walletItem) => walletItem.name === providerName(walletItem.name))
                  .map((wallet) => (
                    <DialogClose key={wallet.name} asChild>
                      <WalletItem connect={handleConnect} name={wallet.name} logo={wallet.logo} />
                    </DialogClose>
                  ))}
              </>
            )}
          </Flex>
          <Box
            css={{
              width: '200%',
              height: 1,
              backgroundColor: '$slate5',
              mx: '-$5',
              position: 'relative',
            }}
          />
          <Typography css={{ my: '$2' }} size="2">
            Don't have a wallet?{' '}
            <Link href="https://arconnect.io/" external>
              Get one here
            </Link>
          </Typography>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
