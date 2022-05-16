declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HASURA_ENDPOINT: string;
      HASURA_ADMIN_SECRET: string;
    }
  }
}
export {};
