declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HASURA_ENDPOINT: string;
      HASURA_ADMIN_SECRET: string;
      NEXT_PUBLIC_HASURA_ENDPOINT: string;
      NEXT_PUBLIC_HASURA_ADMIN_SECRET: string;
      NODE_ENDPOINT: string;
      NEXT_PUBLIC_NODE_ENDPOINT: string;
      NEXT_PUBLIC_CYBERCONNECT_ENDPOINT: string;
      NEXT_PUBLIC_SMARTLOOK_KEY: string;
    }
  }
}
export {};
