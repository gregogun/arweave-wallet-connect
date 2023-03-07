import Arweave from 'arweave';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import ArweaveAccount, { ArAccount } from 'arweave-account';
import { Account } from '../types';

export const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
});

export const webWallet = new ArweaveWebWallet({
  name: 'wavehub',
  logo: `${typeof window !== 'undefined' && window.location.origin}/img/logo_text.svg`,
});

export const connect = () => {
  webWallet.setUrl('https://arweave.app');
  return webWallet.connect();
};

export const account = new ArweaveAccount();

export const getAccount = async (address: string) => {
  try {
    const acc: ArAccount = await account.get(address);
    if (acc) {
      return acc;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAccountHandle = async (handle: string) => {
  console.log(handle);
  return await account.search(handle);
};
