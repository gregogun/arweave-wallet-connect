import * as React from 'react';
import { Button } from './Button';
import { Flex } from './Flex';
import { PermissionType } from 'arconnect';
import { useState } from 'react';
import { ConnectWalletDialog } from './ConnectWalletDialog';
import { useAuth } from '../hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@aura-ui/react';
import { Image } from './Image';
import { config } from '../config';
import { abbreviateAddress } from '../utils';
import { Box } from './Box';
import { ChevronDownIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { ProfileDialog } from './ProfileDialog';
import { styled } from '../stitches.config';

const StyledDropdownMenuItem = styled(DropdownMenuItem, {
  justifyContent: 'start',
  px: '$3',
  gap: '$2',
});

export interface ConnectWalletProps {
  connectButtonLabel?: string;
  permissions: PermissionType[];
}

export const ConnectWallet = (props: ConnectWalletProps) => {
  const { setState, account, walletAddress, connecting, vouched } = useAuth();
  const { connectButtonLabel, permissions } = props;

  const label = connectButtonLabel ? connectButtonLabel : 'Connect Wallet';
  const username = account?.profile.name ? account.profile.name : walletAddress;

  const user = account ? account : walletAddress;

  const handleDisconnect = () => {
    window.arweaveWallet.disconnect().then(() => {
      setState({ walletAddress: '' });
    });
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button css={{ display: 'flex', gap: '$4' }}>
              {account ? (
                <Flex as="span" align="center" gap="2">
                  <Image
                    css={{
                      width: 24,
                      height: 24,
                    }}
                    src={
                      // check if no avatar or using account default avatar
                      !account.profile.avatar ||
                      account.profile.avatar === config.accountAvatarDefault
                        ? `${config.gatewayUrl}/${account.profile.avatar}`
                        : `${config.boringAvatars}/40/${walletAddress}`
                    }
                  />
                  {account.profile.name ? account.profile.name : account.handle}
                </Flex>
              ) : !account && walletAddress ? (
                <span>{abbreviateAddress({ address: walletAddress })}</span>
              ) : (
                <Box />
              )}
              <span>
                <ChevronDownIcon />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8}>
            <ProfileDialog account={account}>
              <Button
                variant="ghost"
                css={{
                  alignItems: 'center',
                  justifyContent: 'start',
                  gap: '$2',
                  px: '$3',
                  fontSize: '$2',
                  lineHeight: '$2',
                  maxHeight: 32,
                  fontWeight: '$4',
                  color: '$slate12',
                }}
              >
                <Box as="span">
                  <PersonIcon />
                </Box>
                Profile
              </Button>
            </ProfileDialog>
            <StyledDropdownMenuItem color="red" onClick={handleDisconnect}>
              <Box as="span" css={{ display: 'inline-flex' }}>
                <ExitIcon />
              </Box>
              Disconnect
            </StyledDropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <ConnectWalletDialog permissions={permissions}>
            <Button disabled={connecting}>{connecting ? 'Connecting...' : label}</Button>
          </ConnectWalletDialog>
        </>
      )}
    </>
  );
};
