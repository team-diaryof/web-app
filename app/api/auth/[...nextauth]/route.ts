import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  // Adapter connects NextAuth to your Prisma DB
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          // This ID is required by NextAuth
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          // Custom fields that map to your Prisma Schema
          role: "USER", 
          googleId: profile.sub, 
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    // 1. JWT Callback: Add the User ID and Role to the token
    async jwt({ token, user, trigger, session }) {
      // 'user' is the object returned from the Adapter (your Database User)
      // It is only available on the FIRST sign in or when the token is created
      if (user) {
        token.id = user.id;
        token.role = user.role; // No TS error now!
        token.googleId = user.googleId;
      }

      // Handle client-side session updates (e.g. update({ name: "New Name" }))
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      return token;
    },

    // 2. Session Callback: Pass the data to the Client (React)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role; // No TS error now!
        session.user.googleId = token.googleId;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === "production",
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };