import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import app from '@/lib/firebase/server';
import {getAuth} from 'firebase-admin/auth';

const auth = getAuth(app);
const isDev = process.env.NODE_ENV !== 'production';

export default NextAuth({
  
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: !isDev,
  debug: isDev,
  session:{
    strategy: 'jwt'
  },
  logger: {
    error(code, metadata) {
      console.error({ type: 'inside error logger', code, metadata }); //eslint-disable-line
    },
    warn(code) {
      console.warn({ type: 'inside warn logger', code }); //eslint-disable-line
    },
    debug(code, metadata) {
      console.log({ type: 'inside debug logger', code, metadata }); //eslint-disable-line
    },
  },
  callbacks: {
    async jwt({token, user, account}) {
          
      if (token.user) {
        // Renew Firebase token on expiration 
        if(Date.now() > token.user.firebaseExp) {
          token.user.firebaseToken = await auth.createCustomToken({admin: true});
          token.user.firebaseExp = Date.now() + (60*60*1000);
        }

        return token;
      }

      return {
        user: {sub: token.sub, ...user}
      };
    },
    async session({session, token, user}) {
      session.user = token.user;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: {label: 'Password', type: 'password'}
      },
      async authorize({password}, req) {
        //TODO: Handle user credentials
        try {
          const validUser = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
          // If no error and we have user data, return it
          if (validUser) {
            const firebaseToken = await auth.createCustomToken('admin');
            const firebaseExp = Date.now() + (60 * 60 * 1000);

            return {
              firebaseToken,
              firebaseExp
            }
          }

          // Return null if user data could not be retrieved
          return null;
        } catch(err) {
          return null
        }
      }
    })
  ]
});
