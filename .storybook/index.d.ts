export {};

declare global {
  interface Window {
    arweaveWallet: {
      getActiveAddresses: (...args: any[]) => string;
    };
  }
}
