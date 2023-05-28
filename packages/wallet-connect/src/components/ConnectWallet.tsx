import * as React from 'react';
import { PermissionType } from 'arconnect';
import { ConnectWalletDialog } from './ConnectWalletDialog';
import { useConnect } from '../hooks/useConnect';
import { Button, CSS, ButtonExtendedProps } from '@aura-ui/react';
import ArweaveAccount from 'arweave-account';
import { ArweaveWalletProps } from '../types';

export interface ConnectWalletProps {
  appName?: string;
  permissions: PermissionType[];
  appLogo?: string;
  options?: {
    connectButtonLabel?: string;
    connectButtonStyles?: CSS;
    connectButtonVariant?: ButtonExtendedProps['variant'];
    connectButtonSize?: ButtonExtendedProps['size'];
    connectButtonColorScheme?: ButtonExtendedProps['colorScheme'];
    arweaveWalletProps?: ArweaveWalletProps;
  };
}

export const ConnectWallet = (props: ConnectWalletProps) => {
  const { setState, profile, walletAddress, connecting, vouched } = useConnect();
  const { options, permissions, appName } = props;

  const label = options?.connectButtonLabel ? options.connectButtonLabel : 'Connect Wallet';

  const user = profile ? profile : walletAddress;

  const handleDisconnect = () => {
    window.arweaveWallet.disconnect().then(() => {
      setState({ walletAddress: '' });
    });
  };

  return (
    <>
      {user ? (
        <Button
          variant={options?.connectButtonVariant}
          size={options?.connectButtonSize}
          colorScheme={options?.connectButtonColorScheme}
          css={{ display: 'flex', gap: '$4', ...options?.connectButtonStyles }}
          onClick={handleDisconnect}
        >
          Disconnect
        </Button>
      ) : (
        <ConnectWalletDialog
          permissions={permissions}
          arweaveWalletProps={options?.arweaveWalletProps}
          appName={appName}
          profile={profile}
        >
          <Button
            variant={options?.connectButtonVariant}
            size={options?.connectButtonSize}
            colorScheme={options?.connectButtonColorScheme}
            css={{
              ...options?.connectButtonStyles,
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
