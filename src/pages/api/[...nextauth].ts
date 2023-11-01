// @ts-nocheck

import axiosInstance from '@/utils/axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E-mail', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const user = await axiosInstance.post(
            'auth/signin',
            {
              password: credentials?.password,
              email: credentials?.email,
            },
            {
              headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
              },
            }
          );

          if (user) {
            return user
          } else {
            return null;
          }
        } catch (err: any) {
          const errorMessage = err.response.data.message;
          // Redirecting to the login page with error message in the URL
          throw new Error(errorMessage + '&email=' + credentials?.email);
        }
      },
    }),
  ],

//   session: {
//     jwt: true,
//     maxAge: 30 * 24 * 60 * 60,
//   },

  callbacks: {
    // Getting the JWT token from API response
    // jwt: async ({ token, user }) => {
    //   if (user) {
    //     token.accessToken = user.accessToken;
    //   }
    //   return token;
    // },

    session: async ({ session, token, user }) => {
      return session;
    },
  },

  pages: {
    error: '/sign-in',
    signIn: '/sign-in',
  },
});
