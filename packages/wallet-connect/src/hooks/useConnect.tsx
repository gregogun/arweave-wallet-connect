import { ArAccount } from 'arweave-account';
import React, { useState } from 'react';
import { ArweaveConfig, PermaProfile, Vouched } from '../types';

const ConnectContext = React.createContext<{
  walletAddress?: string;
  profile?: PermaProfile;
  connecting?: boolean;
  vouched?: Vouched;
  config?: ArweaveConfig;
  setState: React.Dispatch<
    React.SetStateAction<{
      connecting?: boolean;
      walletAddress?: string | undefined;
      profile?: PermaProfile | undefined;
      vouched?: Vouched | undefined;
      config?: ArweaveConfig | undefined;
    }>
  >;
}>({ connecting: false, setState: () => {} });

interface ConnectProviderProps {
  children: React.ReactNode;
}

const ConnectProvider = ({ children }: ConnectProviderProps) => {
  const [state, setState] = useState<{
    connecting?: boolean;
    walletAddress?: string;
    profile?: PermaProfile;
    vouched?: Vouched;
    config?: ArweaveConfig;
  }>({
    connecting: false,
  });

  return (
    <ConnectContext.Provider
      value={{
        walletAddress: state.walletAddress,
        profile: state.profile,
        connecting: state.connecting,
        setState: setState,
        vouched: state.vouched,
        config: state.config,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

const useConnect = () => React.useContext(ConnectContext);

export { ConnectProvider, useConnect };
