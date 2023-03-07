import * as React from 'react';
import { ConnectWallet } from '../components/ConnectWallet';

export default {
  title: 'Components/ConnectWallet',
  component: ConnectWallet,
};

// window.arweaveWallet.walletName = 'Arconnect';

export const Default = () => <ConnectWallet permissions={['ACCESS_ADDRESS']} />;
