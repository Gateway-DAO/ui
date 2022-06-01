import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { withSentry } from '@sentry/nextjs';

import { gqlAnonMethods, gqlMethods } from '../../../services/api';

/* TODO: Implement refresh token */

export default withSentry(
  NextAuth({
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          wallet: { label: 'Wallet', type: 'text' },
          signature: { label: 'Signature', type: 'text' },
        },
        /* async authorize(credentials, req) {
        const res = await gqlMethodsClient.login({
          signature: credentials.signature,
          wallet: credentials.wallet,
        });
        return res.login;
      }, */
        async authorize(credentials) {
          try {
            const res = await gqlAnonMethods.login({
              signature: credentials.signature,
              wallet: credentials.wallet,
            });

            const { error } = (res as any) ?? {};

            if (error || !res.login) {
              throw error;
            }

            /* get current user from hasura based on the token */
            const user = (
              await gqlMethods({ token: res.login.token }).get_current_user()
            )?.me;

            return {
              ...res.login,
              ...user,
            };
          } catch (e) {
            console.error('Auth error', e);
            throw new Error(e);
          }
        },
      }),
      // ...add more providers here
    ],
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      /*     async signIn(data) {
      console.log('signIn:', data);
      return true;
    }, */
      async session(data) {
        // console.log('session:', data);
        const { session, token } = data;
        session.user = {
          id: token.id,
          token: token.token,
          init: token.init,
        };
        return session;
      },
      async jwt({ user, token }) {
        if (user?.token) return user;
        return token;
      },
      /* TODO: Implement jwt refresh token */
      /* async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    }, */
    },
  })
);
