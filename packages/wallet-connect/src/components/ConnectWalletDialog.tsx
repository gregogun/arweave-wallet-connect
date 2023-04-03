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
} from '@aura-ui/react';
import { PermissionType } from 'arconnect';
import { Cross2Icon } from '@radix-ui/react-icons';
import { connect, getAccount, webWallet } from '../lib';
import { useConnect } from '../hooks/useConnect';
import { Image } from './Image';
import { useState } from 'react';
import { abbreviateAddress, accountFromAddress } from '../utils';
import { config } from '../utils/config';
import ArweaveAccount from 'arweave-account';

interface WalletItemProps {
  name: string;
  logo: any;
}

const walletItems: WalletItemProps[] = [
  {
    name: 'Arconnect',
    logo: 'https://github.com/arconnectio/ArConnect/blob/development/public/icons/logo256.png?raw=true',
  },
  {
    name: 'Arweave.app',
    logo: 'https://github.com/jfbeats/ArweaveWebWallet/blob/master/public/arweave-512.png?raw=true',
  },
];

interface WalletItemProps {
  name: string;
  logo: any;
  connect?: (name: string) => void;
}

const WalletItem = ({
  name,
  logo,
  connect,
}: {
  name: string;
  logo: any;
  connect: (name: string) => void;
}) => {
  return (
    <Button
      onClick={() => connect(name)}
      variant="ghost"
      css={{ p: '$2', alignItems: 'center', gap: '$2', justifyContent: 'start' }}
      size="3"
    >
      <Image
        css={{
          filter: name === 'Arweave.app' ? 'invert(1)' : 'none',
        }}
        src={logo}
      />
      <Typography size="3" weight="6">
        {name}
      </Typography>
    </Button>
  );
};

interface ConnectWalletDialogProps {
  permissions: PermissionType[];
  children: React.ReactNode;
  arweaveAccount: ArweaveAccount;
}

export const ConnectWalletDialog = (props: ConnectWalletDialogProps) => {
  const [addresses, setAddresses] = useState<string[]>();
  const { setState } = useConnect();
  const { children, permissions, arweaveAccount } = props;

  const connectWithArweaveApp = async () => {
    await connect();

    const address = await webWallet.address;

    if (!address) {
      throw new Error(
        'Oops something went wrong when connecting with Arweave.app! Please try again.'
      );
    }

    completeConnection(address);
  };

  const connectWithArconnect = async () => {
    if (!permissions) {
      throw new Error('You must at least add one permission');
    }

    await window.arweaveWallet
      .connect(permissions)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        setState({ connecting: false });
        throw new Error('Error', err);
      });

    const address = await window.arweaveWallet.getActiveAddress();

    if (permissions.includes('ACCESS_ALL_ADDRESSES')) {
      const addresses = await window.arweaveWallet.getAllAddresses();
      console.log(addresses);

      if (addresses.length > 1) {
        setAddresses(addresses);
      }
    } else {
      completeConnection(address);
    }
  };

  const handleConnect = async (name: string) => {
    try {
      setState({ connecting: true });
      if (name === 'Arweave.app') {
        await connectWithArweaveApp();
      } else {
        await connectWithArconnect();
      }
    } catch (e) {
      console.log('error', e);
      setState({ connecting: false });
    }
  };

  const completeConnection = async (address: string) => {
    await accountFromAddress(address, arweaveAccount)
      .then((account) => {
        if (account) {
          setState({ walletAddress: address, account, connecting: false });
        } else {
          setState({ walletAddress: address, connecting: false });
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleCompleteConnect = (address: string) => completeConnection(address);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay />
      <DialogContent
        css={{
          maxWidth: 320,
          left: '50%',
          px: '$5',
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
            Choose a wallet to connect to <strong>Permadapp</strong>:
          </Typography>
        </DialogDescription>
        <Flex
          css={{ p: '$3', boxShadow: '0 0 0 1px $colors$slate6', br: '$4' }}
          direction="column"
          gap="3"
        >
          {addresses ? (
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
                  logo={`${config.boringAvatars}/28/${address}`}
                />
              ))}
            </>
          ) : (
            <>
              {walletItems.map((wallet) => (
                <DialogClose key={wallet.name} asChild>
                  <WalletItem connect={handleConnect} name={wallet.name} logo={wallet.logo} />
                </DialogClose>
              ))}
            </>
          )}
        </Flex>
        <Typography css={{ my: '$2' }} size="2">
          New to arweave wallets?{' '}
          <Link href="https://arweave.app/" external>
            Learn more
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
