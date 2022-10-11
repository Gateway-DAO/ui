import { NextAuthOptions, unstable_getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { SessionToken } from '../types/user';
import { gqlAnonMethods, gqlMethods } from './api';

const callLogin = async (
  signature: string,
  wallet: string
): Promise<SessionToken> => {
  const res = await gqlAnonMethods.login({
    signature,
    wallet,
  });

  const { error } = (res as any) ?? {};

  if (error || !res.login) {
    throw error;
  }

  const { __typename, ...token } = res.login;

  return {
    ...token,
    expiry: Date.parse(token.expiry),
  };
};
const callRefresh = async (token: SessionToken): Promise<SessionToken> => {
  try {
    const res = await gqlMethods(token.token, token.user_id).refresh({
      refresh_token: token.refresh_token,
    });

    const { error } = (res as any) ?? {};

    if (error || !res.refresh) {
      throw error;
    }

    const { __typename, ...newToken } = res.refresh;

    return {
      ...newToken,
      user_id: token.user_id,
      expiry: Date.parse(newToken.expiry),
    };
  } catch (e) {
    return {
      ...token,
      error: e,
    };
  }
};

const providers = [
  CredentialsProvider({
    name: 'ethereum',
    credentials: {
      wallet: {
        label: 'wallet',
        type: 'text',
        placeholder: '0x0',
      },
      signature: {
        label: 'signature',
        type: 'text',
        placeholder: '0x0',
      },
    },
    async authorize(credentials) {
      return callLogin(credentials.signature, credentials.wallet);
    },
  }),
];

export const nextAuthConfig: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // We're retrieving the token from the provider
      if (user) {
        token = user;
      }

      if (token.expiry < Date.now()) {
        const refreshedToken = await callRefresh(token);
        return refreshedToken;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        ...token,
      };
    },
  },
};

export const getServerSession = (req, res) =>
  unstable_getServerSession(req, res, nextAuthConfig);
