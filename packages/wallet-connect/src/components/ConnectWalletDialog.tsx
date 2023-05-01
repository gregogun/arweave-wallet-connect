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
} from '@aura-ui/react';
import { PermissionType } from 'arconnect';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useConnect } from '../hooks/useConnect';
import { Image } from './Image';
import { useState } from 'react';
import { abbreviateAddress, accountFromAddress } from '../utils';
import { config } from '../utils/config';
import ArweaveAccount from 'arweave-account';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { ArweaveConfig, ArweaveWalletProps } from '../types';
import { ArweaveLogo } from '../Icons/ArweaveLogo';
// import { isVouched } from 'vouchdao';

const arweaveWallet = (props: ArweaveWalletProps) => {
  const { iframeParentNode, logo, name, url = 'arweave.app' } = props;

  const state = { url: url };
  const appInfo = { iframeParentNode, logo, name };
  const wallet = new ArweaveWebWallet(appInfo, { state });

  return wallet;
};

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
        onClick={() => connect(name)}
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
        {name === 'Arweave.app' ? <ArweaveLogo width={50} height={50} /> : <Image src={logo} />}
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
  permissions: PermissionType[];
  children: React.ReactNode;
  arweaveAccount: ArweaveAccount;
  arweaveWalletProps: ArweaveWalletProps | undefined;
  appName?: string;
  arconnectLogo?: string;
  arweaveAppLogo?: string;
}

export const ConnectWalletDialog = (props: ConnectWalletDialogProps) => {
  const [addresses, setAddresses] = useState<string[]>();
  const { setState } = useConnect();
  const {
    children,
    permissions,
    arweaveAccount,
    arweaveWalletProps,
    appName,
    arconnectLogo,
    arweaveAppLogo,
  } = props;

  const webWallet = arweaveWallet({ name: appName, ...arweaveWalletProps });

  const connectWithArweaveApp = async () => {
    webWallet.setUrl('https://arweave.app');
    await webWallet.connect();

    const address = webWallet.address;

    const config = (await webWallet.getArweaveConfig()) as ArweaveConfig;

    if (!address) {
      console.log('disconnected');

      throw new Error(
        'Oops something went wrong when connecting with Arweave.app! Please try again.'
      );
    }

    completeConnection(address, config);
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

    const config = (await window.arweaveWallet.getArweaveConfig()) as ArweaveConfig;

    if (permissions.includes('ACCESS_ALL_ADDRESSES')) {
      const addresses = await window.arweaveWallet.getAllAddresses();

      if (addresses.length > 1) {
        setAddresses(addresses);
      } else {
        completeConnection(address, config);
      }
    } else {
      completeConnection(address, config);
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
      console.error('error', e);
      setState({ connecting: false });
    }
  };

  const completeConnection = async (address: string, config?: ArweaveConfig) => {
    // const vouched = await isVouched(address);

    await accountFromAddress(address, arweaveAccount)
      .then((account) => {
        if (account) {
          setState({ walletAddress: address, account, config: config, connecting: false });
        } else {
          setState({ walletAddress: address, config: config, connecting: false });
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleCompleteConnect = (address: string) => completeConnection(address);

  const name = appName ? appName : 'this app';

  const walletLogo = (logo: 'Arweave.app' | 'Arconnect', defaultLogo: string) => {
    let returnedLogo;
    if (logo === 'Arweave.app') {
      returnedLogo = arweaveAppLogo || defaultLogo;
    } else {
      returnedLogo = arconnectLogo || defaultLogo;
    }

    return returnedLogo;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
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
              Choose a wallet to connect to{' '}
              <Typography size="2" as="span" weight="6" contrast="hiContrast">
                {name}
              </Typography>
              :
            </Typography>
          </DialogDescription>
          <Flex
            css={{ p: '$2', boxShadow: '0 0 0 1px $colors$slate5', br: '$4' }}
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
                    <WalletItem
                      connect={handleConnect}
                      name={wallet.name}
                      logo={walletLogo(wallet.name, wallet.logo)}
                    />
                  </DialogClose>
                ))}
              </>
            )}
          </Flex>
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
