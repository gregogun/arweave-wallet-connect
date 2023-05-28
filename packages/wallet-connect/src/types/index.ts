import { State, AppInfo } from 'arweave-wallet-connector';

interface ProfileLinks {
  discord?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
}

interface Profile {
  avatar: string;
  addr: string;
  bio: string;
  handle: string;
  links: ProfileLinks;
  name: string;
}

export interface Account {
  profile: Profile;
  txid: string;
}

export type Vouched = boolean;

export interface ArweaveWalletProps extends AppInfo {
  url?: string;
}

export type IconProps = {
  width?: number | string | undefined;
  height?: number | string | undefined;
};

export type ArweaveConfig = {
  host: string;
  port: number;
  protocol: string;
};

export interface PermaProfile {
  address: string;
  handle: string | undefined;
  uniqueHandle: string | undefined;
  bio: string | undefined;
  avatar: string | undefined;
  banner: string | undefined;
  // vouched: boolean;
}

export type Env = {
  gateway?: string;
  // maybe add some cache options here
};
