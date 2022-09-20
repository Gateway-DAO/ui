import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { gqlAnonMethods } from '../../../services/api';
import { SessionToken } from '../../../types/user';

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

    if (error || !res.login) {
      throw error;
    }

    const { __typename, ...token } = res.login;

    return {
      ...token,
      expiry: Date.parse(token.expiry),
    };
  } catch (e) {
    return null;
  }
};
const callRefresh = async (refresh_token: string): Promise<SessionToken> => {
  try {
    const res = await gqlAnonMethods.refresh({
      refresh_token,
    });

    const { error } = (res as any) ?? {};

    if (error || !res.refresh) {
      throw error;
    }

    const { __typename, ...token } = res.refresh;

    return {
      ...token,
      expiry: Date.parse(token.expiry),
    };
  } catch (e) {
    return null;
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

export const config: NextAuthOptions = {
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
        return callRefresh(token.refresh_token);
      }

      return token;
    },
    async session({ session, token }) {
      session.token = token.token as string;
      session.refresh_token = token.refresh_token as string;
      return session;
    },
  },
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth(config);
