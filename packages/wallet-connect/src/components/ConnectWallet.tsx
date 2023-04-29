import * as React from 'react';
import { PermissionType } from 'arconnect';
import { ConnectWalletDialog } from './ConnectWalletDialog';
import { useConnect } from '../hooks/useConnect';
import { Button, CSS, ButtonExtendedProps } from '@aura-ui/react';
import ArweaveAccount from 'arweave-account';
import { ArweaveWalletProps } from '../types';

export interface ConnectWalletProps {
  connectButtonLabel?: string;
  connectButtonStyles?: CSS;
  connectButtonVariant?: ButtonExtendedProps['variant'];
  connectButtonSize?: ButtonExtendedProps['size'];
  connectButtonColorScheme?: ButtonExtendedProps['colorScheme'];
  permissions: PermissionType[];
  arweaveAccount: ArweaveAccount;
  arweaveWalletProps?: ArweaveWalletProps;
  appName?: string;
  appLogo?: string;
  arconnectLogo?: string;
  arweaveAppLogo?: string;
}

export const ConnectWallet = (props: ConnectWalletProps) => {
  const { setState, account, walletAddress, connecting, vouched } = useConnect();
  const {
    connectButtonLabel,
    connectButtonStyles,
    connectButtonVariant: variant,
    connectButtonSize: size = '2',
    connectButtonColorScheme: colorScheme,
    permissions,
    arweaveAccount,
    arweaveWalletProps,
    appName,
    arconnectLogo,
    arweaveAppLogo,
  } = props;

  const label = connectButtonLabel ? connectButtonLabel : 'Connect Wallet';

  const user = account ? account : walletAddress;

  const handleDisconnect = () => {
    window.arweaveWallet.disconnect().then(() => {
      setState({ walletAddress: '' });
    });
  };

  return (
    <>
      {user ? (
        <Button
          variant={variant}
          size={size}
          colorScheme={colorScheme}
          css={{ display: 'flex', gap: '$4', ...connectButtonStyles }}
          onClick={handleDisconnect}
        >
          Disconnect
        </Button>
      ) : (
        <ConnectWalletDialog
          arweaveAccount={arweaveAccount}
          permissions={permissions}
          arweaveWalletProps={arweaveWalletProps}
          appName={appName}
          arconnectLogo={arconnectLogo}
          arweaveAppLogo={arweaveAppLogo}
        >
          <Button
            variant={variant}
            size={size}
            colorScheme={colorScheme}
            css={{
              ...connectButtonStyles,
            }}
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : label}
          </Button>
        </ConnectWalletDialog>
      )}
    </>
  );
};
