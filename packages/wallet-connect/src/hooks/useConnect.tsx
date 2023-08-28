import { ArAccount } from 'arweave-account';
import React, { useState } from 'react';
import {
  ArweaveConfig,
  ArweaveWalletProps,
  ConnectProps,
  PermaProfile,
  Vouched,
  WebWallet,
} from '../types';
import { ArweaveWebWallet, ArweaveApi } from 'arweave-wallet-connector';
import { account } from '../lib/account';
import { PermissionType } from 'arconnect';

const ConnectContext = React.createContext<{
  walletAddress?: string;
  addresses?: string[];
  profile?: PermaProfile;
  connecting?: boolean;
  vouched?: Vouched;
  config?: ArweaveConfig;
  connect: (props: ConnectProps) => void;
  disconnect: () => void;
  completeConnection: (address: string, config?: ArweaveConfig) => void;
  setState: React.Dispatch<
    React.SetStateAction<{
      connecting?: boolean;
      walletAddress?: string | undefined;
      addresses?: string[] | [];
      profile?: PermaProfile | undefined;
      vouched?: Vouched | undefined;
      config?: ArweaveConfig | undefined;
    }>
  >;
}>({
  connecting: false,
  setState: () => {},
  connect: () => {},
  disconnect: () => {},
  completeConnection: () => {},
});

interface ConnectProviderProps {
  webWallet?: typeof WebWallet;
  includeProfile?: boolean;
  children: React.ReactNode;
}

const ConnectProvider = ({ children, webWallet, includeProfile }: ConnectProviderProps) => {
  const [state, setState] = useState<{
    connecting?: boolean;
    walletAddress?: string;
    addresses?: string[];
    profile?: PermaProfile;
    vouched?: Vouched;
    config?: ArweaveConfig;
  }>({
    connecting: false,
  });

  const connect = async (props: ConnectProps) => {
    try {
      setState({ connecting: true });
      if (props.walletProvider === 'arweave.app') {
        await connectWithArweaveApp(props.permissions);
      }
      if (props.walletProvider === 'arconnect') {
        await connectWithArconnect(props.permissions);
      }
    } catch (e) {
      console.error(e);
      setState({ connecting: false });
    }
  };

  const connectWithArweaveApp = async (requestedPermissions?: PermissionType[]) => {
    if (!webWallet) {
      throw new Error('Must provide an instance of ArweaveWebWallet');
    }

    try {
      if (!webWallet.url) {
        webWallet.setUrl('https://arweave.app');
      }

      await webWallet.connect();

      const address = webWallet.address;

      let config: ArweaveConfig | undefined = undefined;

      if (requestedPermissions?.includes('ACCESS_ARWEAVE_CONFIG')) {
        config = (await webWallet.getArweaveConfig()) as ArweaveConfig;
      }

      if (!address) {
        throw new Error(
          'Oops something went wrong when connecting with Arweave.app! Please try again.'
        );
      }

      completeConnection(address, config);
    } catch (error) {
      setState({ connecting: false });
      throw new Error(error as any);
    }
  };

  const connectWithArconnect = async (requestedPermissions?: PermissionType[]) => {
    if (!requestedPermissions) {
      throw new Error('You must at least add one permission');
    }

    let currentPermissions: PermissionType[] = [];

    let address = '';
    let config = {} as ArweaveConfig;

    currentPermissions = await window.arweaveWallet.getPermissions();

    if (currentPermissions.length <= 0) {
      await window.arweaveWallet.connect(requestedPermissions);

      currentPermissions = await window.arweaveWallet.getPermissions();

      if (currentPermissions.includes('ACCESS_ALL_ADDRESSES')) {
        const addresses = await window.arweaveWallet.getAllAddresses();

        if (currentPermissions.includes('ACCESS_ARWEAVE_CONFIG')) {
          config = await window.arweaveWallet.getArweaveConfig();
        }

        setState({ addresses, config });
      } else {
        if (currentPermissions.includes('ACCESS_ADDRESS')) {
          address = await window.arweaveWallet.getActiveAddress();
        }

        if (currentPermissions.includes('ACCESS_ARWEAVE_CONFIG')) {
          config = await window.arweaveWallet.getArweaveConfig();
        }

        completeConnection(address, config);
      }
    } else {
      if (currentPermissions.includes('ACCESS_ALL_ADDRESSES')) {
        const addresses = await window.arweaveWallet.getAllAddresses();

        if (currentPermissions.includes('ACCESS_ARWEAVE_CONFIG')) {
          config = await window.arweaveWallet.getArweaveConfig();
        }

        setState({ addresses, config });
      } else {
        if (currentPermissions.includes('ACCESS_ADDRESS')) {
          address = await window.arweaveWallet.getActiveAddress();
        }

        if (currentPermissions.includes('ACCESS_ARWEAVE_CONFIG')) {
          config = await window.arweaveWallet.getArweaveConfig();
        }
        completeConnection(address, config);
      }
    }
  };

  const completeConnection = async (address: string, config?: ArweaveConfig) => {
    const walletConfig = config && `${config?.protocol}://${config?.host}`;
    const stateConfig = state.config && `${state.config?.protocol}://${state.config?.host}`;
    const gateway = walletConfig || stateConfig || undefined;
    let permaProfile: PermaProfile | undefined = undefined;

    if (includeProfile) {
      const acc = account.init({ gateway });
      permaProfile = await acc.get(address);
    }

    if (permaProfile) {
      setState({
        walletAddress: address,
        profile: permaProfile,
        config,
        connecting: false,
      });
    } else {
      setState({ walletAddress: address, config: config || state.config, connecting: false });
    }
  };

  const disconnect = () => {
    window.arweaveWallet.disconnect().then(() => {
      setState({ walletAddress: '' });
    });
  };

  return (
    <ConnectContext.Provider
      value={{
        walletAddress: state.walletAddress,
        addresses: state.addresses,
        profile: state.profile,
        connecting: state.connecting,
        setState: setState,
        vouched: state.vouched,
        config: state.config,
        connect,
        disconnect,
        completeConnection,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

const useConnect = () => React.useContext(ConnectContext);

export { ConnectProvider, useConnect };
