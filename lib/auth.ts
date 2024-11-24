import prisma from "@/db";

import { SHA256 } from "crypto-js";
import encBase64 from "crypto-js/enc-base64";
import { type NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials==>", credentials);
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const userFromDB = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log("user==>", userFromDB);
        if (!userFromDB) {
          return null;
        }
        const newHash = SHA256(
          credentials.password + userFromDB?.salt
        ).toString(encBase64);
        const isPasswordValid = newHash === userFromDB?.hash;
        if (!isPasswordValid) {
          return null;
        }
        const user = {
          id: userFromDB.id + "",
          email: userFromDB.email,
          token: userFromDB.token,
          name: `${userFromDB.firstname} ${userFromDB.lastname}`,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};
