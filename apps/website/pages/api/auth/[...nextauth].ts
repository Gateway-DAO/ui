import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { gqlMethodsClient } from '../../../services/api';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        wallet: { label: 'Wallet' },
        signature: { label: 'Signature' },
      },
      async authorize(credentials, req) {
        const res = await gqlMethodsClient.login({
          signature: credentials.signature,
          wallet: credentials.wallet,
        });
        return res.login;
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.address = token.sub;
      session.user.name = token.sub;
      session.user.image = 'https://www.fillmurray.com/128/128';
      return session;
    },
    async jwt(options) {
      console.log(options);
      return options.token;
    },
  },
});
