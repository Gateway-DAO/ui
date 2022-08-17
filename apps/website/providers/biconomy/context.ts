/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { PartialDeep } from 'type-fest';

import { Credentials } from '../../services/graphql/types.generated';
import { MintStatus } from './biconomy-provider';

export type MintResponse = {
  isMinted: boolean;
  transactionUrl?: string;
  error?: any;
};

type Context = {
  mint: () => Promise<MintResponse>;
  mintCredential: (
    credential: PartialDeep<Credentials>
  ) => Promise<MintResponse>;
  mintStatus: MintStatus;
};

// export const BiconomyContext = createContext<Context>({
//   mint: async () => {},
//   mintCredential: async () => {},
//   asksSignature: false,
// });

// TODO: make this better for the love of God!
export const BiconomyContext = createContext<Context | undefined>(undefined);

export const useBiconomy = () => useContext(BiconomyContext);
