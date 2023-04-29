import { ArweaveWebWallet } from 'arweave-wallet-connector';
import ArweaveAccount from 'arweave-account';

// export const webWallet: any = new ArweaveWebWallet({
//   name: 'wavehub',
//   logo: `${typeof window !== 'undefined' && window.location.origin}/img/logo_text.svg`,
// });

// export const connect = () => {
//   webWallet.setUrl('https://arweave.app');
//   return webWallet.connect();
// };

export const getAccount = async (address: string, account: ArweaveAccount) => {
  try {
    const acc = await account.get(address);
    return acc;
  } catch (error) {
    console.log(error);
  }
};

export const getAccountHandle = async (handle: string, account: ArweaveAccount) => {
  console.log(handle);
  return await account.search(handle);
};
