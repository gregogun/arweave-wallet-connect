import { ArAccount } from 'arweave-account';
import React, { useState } from 'react';
import { ArweaveConfig, ArweaveWalletProps, ConnectProps, PermaProfile, Vouched } from '../types';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
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
  completeConnection: (address: string) => void;
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
  children: React.ReactNode;
}

const ConnectProvider = ({ children }: ConnectProviderProps) => {
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
        await connectWithArweaveApp(props.arweaveWalletProps, props.appName);
      }
      if (props.walletProvider === 'arconnect') {
        await connectWithArconnect(props.permissions);
      }
    } catch (e) {
      console.error('error', e);
      setState({ connecting: false });
    }
  };

  const connectWithArweaveApp = async (
    arweaveWalletProps: ArweaveWalletProps | undefined,
    appName: string
  ) => {
    const arweaveWallet = (props: ArweaveWalletProps) => {
      const { iframeParentNode, logo, name, url = 'arweave.app' } = props;

      const state = { url: url };
      const appInfo = { iframeParentNode, logo, name };
      const wallet = new ArweaveWebWallet(appInfo, { state });

      return wallet;
    };

    const webWallet = arweaveWallet({ name: appName, ...arweaveWalletProps });

    try {
      webWallet.setUrl('https://arweave.app');
      await webWallet.connect();

      const address = webWallet.address;

      const config = (await webWallet.getArweaveConfig()) as ArweaveConfig;

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

    try {
      currentPermissions = await window.arweaveWallet.getPermissions();
      console.log(currentPermissions);

      if (currentPermissions.length <= 0) {
        let newPermissions: PermissionType[] = [];

        await window.arweaveWallet.connect(requestedPermissions);

        try {
          newPermissions = await window.arweaveWallet.getPermissions();
          console.log('new permissions', newPermissions);
        } catch (error) {
          console.log(newPermissions);
          if (newPermissions.includes('ACCESS_ADDRESS')) {
            address = await window.arweaveWallet.getActiveAddress();
          }
          if (newPermissions.includes('ACCESS_ARWEAVE_CONFIG')) {
            config = await window.arweaveWallet.getArweaveConfig();
          }
        }
      } else {
        console.log('reached');
        if (currentPermissions.includes('ACCESS_ADDRESS')) {
          address = await window.arweaveWallet.getActiveAddress();
        }
        if (currentPermissions.includes('ACCESS_ARWEAVE_CONFIG')) {
          config = await window.arweaveWallet.getArweaveConfig();
        }

        completeConnection(address, config);
      }

      // if (currentPermissions.includes('ACCESS_ADDRESS')) {
      //   address = await window.arweaveWallet.getActiveAddress();
      //   console.log(address);
      // }
      // if (currentPermissions.includes('ACCESS_ARWEAVE_CONFIG')) {
      //   config = await window.arweaveWallet.getArweaveConfig();
      //   console.log(config);
      // }
      console.log('continued');
    } catch (error) {
      console.error(error);
      console.log('yo cunt');
    }

    if (
      requestedPermissions.includes('ACCESS_ALL_ADDRESSES') &&
      currentPermissions.includes('ACCESS_ALL_ADDRESSES')
    ) {
      const addresses = await window.arweaveWallet.getAllAddresses();

      if (addresses.length > 1) {
        setState({ addresses, config });
      } else {
        await completeConnection(address, config);
      }
    }
  };

  const completeConnection = async (address: string, config?: ArweaveConfig) => {
    const gateway = config ? `${config?.protocol}://${config?.host}` : undefined;
    const acc = account.init({ gateway });

    try {
      const permaProfile = await acc.get(address);
      if (permaProfile) {
        setState({
          walletAddress: address,
          profile: permaProfile,
          config: config,
          connecting: false,
        });
      } else {
        setState({ walletAddress: address, config: config, connecting: false });
      }
    } catch (error) {
      throw new Error(error as any);
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
