import { ArAccount } from 'arweave-account';
import React, { useState } from 'react';
import { Vouched } from '../types';

const AuthContext = React.createContext<{
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

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<{
    connecting?: boolean;
    walletAddress?: string;
    account?: ArAccount;
    vouched?: Vouched;
  }>({
    connecting: false,
  });

  return (
    <AuthContext.Provider
      value={{
        walletAddress: state.walletAddress,
        account: state.account,
        connecting: state.connecting,
        setState: setState,
        vouched: state.vouched,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
