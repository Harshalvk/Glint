import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "./schemas/auth";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user?.password) {
            return null;
          }

          if (!user) {
            throw new Error("User not found.");
          }

          const validPassword = bcrypt.compareSync(password, user.password);

          if (!validPassword) {
            return null;
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
        return null;
      },
    }),
    Google,
    GitHub,
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
