import * as React from 'react';
import { ConnectWallet } from '../components/ConnectWallet';
import ArweaveAccount from 'arweave-account';

const account = new ArweaveAccount();

export default {
  title: 'Components/ConnectWallet',
  component: ConnectWallet,
};

// window.arweaveWallet.walletName = 'Arconnect';

export const Default = () => <ConnectWallet permissions={['ACCESS_ADDRESS']} />;
