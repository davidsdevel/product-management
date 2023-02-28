import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from 'bcrypt';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: {}
      },
      async authorize({password}, req) {

        //TODO: Handle user credentials
        const validUser = await compare(password, process.env.ADMIN_PASSWORD_HASH);

        // If no error and we have user data, return it
        if (validUser) {
          return {
            access: true
          }
        }

        // Return null if user data could not be retrieved
        return null;
      }
    })
  ]
}

export default NextAuth(authOptions);