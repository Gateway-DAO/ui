declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HASURA_ENDPOINT: string;
      HASURA_ADMIN_SECRET: string;
      NEXT_PUBLIC_HASURA_ENDPOINT: string;
      NEXT_PUBLIC_HASURA_ADMIN_SECRET: string;
    }
  }
}
export {};
