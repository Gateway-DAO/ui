import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { gqlAnonMethods } from '../../../services/api';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req, res) {
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
        try {
          const res = await gqlAnonMethods.login({
            signature: credentials.signature,
            wallet: credentials.wallet,
          });
          console.log('res', res);

          const { error } = (res as any) ?? {};

          if (error || !res.login) {
            throw error;
          }

          const { __typename, ...token } = res.login;

          return token;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  // const isDefaultSigninPage =
  //   req.method === 'GET' && req.query.nextauth.includes('signin');

  // // Hides Sign-In with Ethereum from default sign page
  // if (isDefaultSigninPage) {
  //   providers.pop();
  // }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async jwt({ token, user }) {
        // TODO: Implement refresh token
        if (user) {
          token = user;
        }
        return token;
      },
      async session({ session, token }) {
        session.token = token.token as string;
        session.refresh_token = token.refresh_token as string;
        return session;
      },
    },
  });
}
