import * as React from 'react';
import { PermissionType } from 'arconnect';
import { ConnectWalletDialog } from './ConnectWalletDialog';
import { useConnect } from '../hooks/useConnect';
import { Button, CSS, ButtonExtendedProps, IconButton } from '@aura-ui/react';
import { ArweaveWalletProps } from '../types';
import { BsArrowBarRight, BsThreeDots, BsWallet2 } from 'react-icons/bs/index.js';

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
    connectButtonType?: 'normal' | 'icon';
    arweaveWalletProps?: ArweaveWalletProps;
  };
}

export const ConnectWallet = (props: ConnectWalletProps) => {
  const { setState, profile, walletAddress, connecting, vouched } = useConnect();
  const { options, permissions, appName } = props;

  const type = options?.connectButtonType;

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
        <>
          {type && type === 'icon' ? (
            <IconButton
              variant={options?.connectButtonVariant}
              size={options?.connectButtonSize}
              colorScheme={options?.connectButtonColorScheme}
              css={{ ...options?.connectButtonStyles }}
              onClick={handleDisconnect}
              title="Disconnect wallet"
            >
              <BsArrowBarRight />
            </IconButton>
          ) : (
            <Button
              variant={options?.connectButtonVariant}
              size={options?.connectButtonSize}
              colorScheme={options?.connectButtonColorScheme}
              css={{ display: 'flex', gap: '$4', ...options?.connectButtonStyles }}
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          )}
        </>
      ) : (
        <ConnectWalletDialog
          permissions={permissions}
          arweaveWalletProps={options?.arweaveWalletProps}
          appName={appName}
          profile={profile}
        >
          {type && type === 'icon' ? (
            <IconButton
              variant={options?.connectButtonVariant}
              size={options?.connectButtonSize}
              colorScheme={options?.connectButtonColorScheme}
              css={{
                ...options?.connectButtonStyles,
              }}
              disabled={connecting}
              title="Connect wallet"
            >
              {connecting ? <BsThreeDots /> : <BsWallet2 />}
            </IconButton>
          ) : (
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
          )}
        </ConnectWalletDialog>
      )}
    </>
  );
};
