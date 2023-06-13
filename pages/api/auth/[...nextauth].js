import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";


const login = async (email, password) => {
  try {
      const response = await axios.post(`http://backend_container:8000/auth/login`, {
          email: email,
          password: password
      })
      return response.data
  } catch(error) {
      console.log(error)
  }
}

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials 
        // perform your login logic
        // find out user from db
        const user = await login(email, password)
        // if no user
        if(!user){
          throw new Error("No user found. Please Sign Up!")
        }

        // if everything is fine - what is being returned here is wrong
        return user
          
      },
    }),
    // Google provider
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
  ],
  pages: {
    signIn: "/auth/login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    async jwt({token, user}) {
      return {...token, ...user};
    },
    async session ({session, token, user}){
      session.user = token
      return session
    }
  },
};

export default NextAuth(authOptions);
