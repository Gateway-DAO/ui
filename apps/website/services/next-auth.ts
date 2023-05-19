import { NextAuthOptions, unstable_getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import jwt from 'jsonwebtoken';

import { SessionToken } from '../types/user';
import { gqlAnonMethods } from './hasura/api';

const callLogin = async (
  signature: string,
  wallet: string
): Promise<SessionToken> => {
  try {
    const res = await gqlAnonMethods.login({
      signature,
      wallet,
    });

    const { error } = (res as any) ?? {};

    if (error || !res.protocol.loginWallet) {
      return null;
    }

    const { __typename, ...token } = res.protocol.loginWallet;

    return token;
  } catch (e) {
    throw new Error(e);
  }
};
const callRefresh = async (token: SessionToken): Promise<SessionToken> => {
  try {
    const res = await gqlAnonMethods.refresh({
      refresh_token: token.refresh_token,
    });

    const { error } = (res as any) ?? {};

    if (error || !res.protocol.refreshToken) {
      throw error;
    }

    const { __typename, ...newToken } = res.protocol.refreshToken;

    return {
      ...newToken,
    };
  } catch (e) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
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
        token = user as SessionToken;
      }

      const parsedToken = jwt.decode(token.token, { json: true });

      if (parsedToken.exp < Date.now() / 1000) {
        const refreshedToken = await callRefresh(token);
        return refreshedToken;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        ...(token.error && { error: token.error }),
        ...(token ?? {}),
      };
    },
  },
};

export const getServerSession = (req, res) =>
  unstable_getServerSession(req, res, nextAuthConfig);
