import {NextAuthOptions} from 'next-auth';
import axios from 'axios';
import { cookies } from "next/headers";
import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@lib/prisma";
export const authOptions = {
    providers:[
        CredentialsProvider({
            // name:"Sign In",

            credentials:{
                email:{
                    lable:"email",
                    type:"email",
                    placeholder:"email"
                },
                password:{
                    lable:"Password",
                    type:"password",
                    placeholder:"Password"
                }
            },
            async authorize(credentials, req){
                    // const userCredentials = {
                    //     email: credentials.email,
                    //     password: credentials.password,
                    // };    
                    // console.log({userCredentials})
                try{
                    const {data}  = await axios.post(
                        `${process.env.API_URL || "https://greatrun.ethiotelecom.et/great/v1"}/auth/login`,
                        // "https://greatrun.ethiotelecom.et/great/v1/auth/login",
                        credentials
                        );
                        if (!data) {
                            return null;
                          }
                          // console.log({data})
                          const { jwtToken } = data;
                          cookies().set({
                            name: "jwtToken",
                            value: jwtToken,
                            httpOnly: true,
                            path: "/",
                            sameSite: "lax",
                          });
                          return data;
                }catch(e){
                    console.log("exception: ",e)
                    throw new e;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 60,
    },
    // jwt: {
    //     secret: process.env.NEXTAUTH_SECRET,
    //     maxAge: 60 * 60 * 24 * 30,
    //     encryption: true,
    //   },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 30 * 60,
    },
  pages: {
    signIn: "/great/dashboard/login",
    signOut: "/login",
    // error: "/login",
  },

  callbacks: {
    async session(session, user, token) {
        if (user !== null) {
          
        //   session.user = user;
        }
        return await session;
      },

    //   async jwt({ token, user }) {
    //      return await token;
    //   },
      jwt: async ({ token, user }) => {
        // console.log({token})
      return { ...token, ...user };
    },
    // session: ({ session, token }) => {
    //   return {
    //     expires: session.expires,
    //     user: {
    //       id: token.sub,
    //       name: token.name,
    //       email: token.email,
    //     },
    //   };
    // },
  },
    // async redirect({ url, baseUrl }) {
    //   console.log({ url, baseUrl: `${baseUrl}${basePath}` })
    //   return `${baseUrl}${basePath}`
    // },
    // jwt: async ({ token, user }) => {
    //   return { ...token, ...user };
    // },
    // session: async ({ session, token }) => {
    //   return {
    //     expires: session.expires,
    //     user: {
    //       id: token.id,
    //       name: token.name,
    //       email: token.email,
    //       mobileNumber: token.mobileNumber,
    //       isPasswordChanged: token.isPasswordChanged,
    //     },
    //   } as Session;
    // },
  
};

export default (req, res) => NextAuth(req, res, options);


