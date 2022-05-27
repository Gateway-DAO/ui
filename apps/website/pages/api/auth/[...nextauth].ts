import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { gqlMethodsClient } from '../../../services/api';

export default NextAuth({
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
      async authorize(credentials, req) {
        try {
          const res = await gqlMethodsClient.login({
            signature: credentials.signature,
            wallet: credentials.wallet,
          });

          const { error } = (res as any) ?? {};

          if (error) {
            throw error;
          }
          return res.login;
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
    // async signIn(data) {
    //   console.log('signIn', data);
    //   return true;
    // },
    // async session({ session, token }) {
    //   session.address = token.sub;
    //   session.user.id = 'e92ec36c-d003-46ac-ae3d-75f378070caa';
    //   session.user.name = token.sub;
    //   session.user.image = 'https://www.fillmurray.com/128/128';
    //   session.user.isFirstTime = true; // TODO: validate if is a new user
    //   return session;
    // },
    // async jwt(options) {
    //   // console.log(options);
    //   return options.token;
    // },
  },
});
