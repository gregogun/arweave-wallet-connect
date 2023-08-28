import * as React from 'react';
import { PermissionType } from 'arconnect';
import { ConnectWalletDialog } from './ConnectWalletDialog';
import { useConnect } from '../hooks/useConnect';
import { Button, CSS, ButtonExtendedProps, IconButton } from '@aura-ui/react';
// import { ArweaveWalletProps } from '../types';
import { BsArrowBarRight, BsThreeDots, BsWallet2 } from 'react-icons/bs/index.js';

export interface ConnectWalletProps {
  appName?: string;
  permissions: PermissionType[];
  appLogo?: string;
  className?: string | undefined;
  providers?: {
    arweaveApp: boolean;
    arconnect: boolean;
  };
  options?: {
    connectButtonLabel?: string;
    connectButtonStyles?: CSS;
    connectButtonVariant?: ButtonExtendedProps['variant'];
    connectButtonSize?: ButtonExtendedProps['size'];
    connectButtonColorScheme?: ButtonExtendedProps['colorScheme'];
    connectButtonType?: 'normal' | 'icon';
  };
  children?: React.ReactNode;
}

export const ConnectWallet = (props: ConnectWalletProps) => {
  const { setState, profile, walletAddress, connecting } = useConnect();
  const { options, permissions, appName, providers } = props;
  const [showConnectDialog, setShowConnectDialog] = React.useState(false);

  const handleShowConnectDialog = () => setShowConnectDialog(true);
  const handleCancelConnectDialog = () => setShowConnectDialog(false);

  const type = options?.connectButtonType;

  const label = options?.connectButtonLabel ? options.connectButtonLabel : 'Connect Wallet';

  const user = profile ? profile : walletAddress;

  const handleDisconnect = () => {
    window.arweaveWallet.disconnect().then(() => {
      setState({ walletAddress: '' });
    });
  };

  const childButton = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          if (walletAddress) {
            handleDisconnect();
            handleCancelConnectDialog();
          } else {
            handleShowConnectDialog();
          }

          if (child.props.onClick) {
            child.props.onClick(event);
          }
        },
      });
    }
  });

  return (
    <>
      {props.children ? (
        childButton
      ) : (
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
            <>
              {type && type === 'icon' ? (
                <IconButton
                  onClick={handleShowConnectDialog}
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
                  onClick={handleShowConnectDialog}
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
            </>
          )}
        </>
      )}
      <ConnectWalletDialog
        open={showConnectDialog}
        onClose={handleCancelConnectDialog}
        permissions={permissions}
        appName={appName}
        profile={profile}
        providers={providers}
      />
    </>
  );
};
