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