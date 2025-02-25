import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "Code", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.code) {
          return null;
        }

        const verificationCode = await prisma.verificationCode.findFirst({
          where: {
            phone: credentials.phone,
            code: credentials.code,
            expiresAt: {
              gt: new Date()
            }
          }
        });

        if (!verificationCode) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            phone: credentials.phone
          }
        });

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          phone: user.phone,
          name: user.name
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  }
};

export const handler = NextAuth(authOptions);
