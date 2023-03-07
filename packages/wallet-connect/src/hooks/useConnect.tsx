import { ArAccount } from 'arweave-account';
import React, { useState } from 'react';
import { Vouched } from '../types';

const ConnectContext = React.createContext<{
  walletAddress?: string;
  account?: ArAccount;
  connecting?: boolean;
  vouched?: Vouched;
  setState: React.Dispatch<
    React.SetStateAction<{
      connecting?: boolean;
      walletAddress?: string | undefined;
      account?: ArAccount | undefined;
      vouched?: Vouched | undefined;
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
    account?: ArAccount;
    vouched?: Vouched;
  }>({
    connecting: false,
  });

  return (
    <ConnectContext.Provider
      value={{
        walletAddress: state.walletAddress,
        account: state.account,
        connecting: state.connecting,
        setState: setState,
        vouched: state.vouched,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

const useConnect = () => React.useContext(ConnectContext);

export { ConnectProvider, useConnect };
