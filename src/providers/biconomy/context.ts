/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { PartialDeep } from 'type-fest';

import { Credentials } from '@/services/hasura/types';
import { MintStatus } from './biconomy-provider';

export type MintResponse = {
  isMinted: boolean;
  transactionUrl?: string;
  error?: any;
};

type Context = {
  mintCredential: (
    credential: PartialDeep<Credentials>
  ) => Promise<MintResponse>;
  mintStatus: MintStatus;
};

// TODO: make this better for the love of God!
export const BiconomyContext = createContext<Context | undefined>(undefined);

export const useBiconomy = () => useContext(BiconomyContext);
