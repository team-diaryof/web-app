import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  // 1. Adapter connects NextAuth to your Prisma DB
  adapter: PrismaAdapter(prisma) as Adapter,

  // 2. Configure Google Provider
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],

  // 3. Session Handling - Use database strategy with PrismaAdapter
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // 4. Events to handle post-signin updates
  events: {
    async signIn({ user, account }) {
      // Update custom fields after successful sign-in
      if (account?.provider === "google" && account.providerAccountId && user.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          
          if (dbUser) {
            await prisma.user.update({
              where: { id: dbUser.id },
              data: {
                googleId: account.providerAccountId,
                image: user.image || dbUser.image,
                profilePictureUrl: user.image || dbUser.profilePictureUrl,
              },
            });
          }
        } catch (error) {
          console.error("Error updating user with Google info:", error);
        }
      }
    },
  },

  // 5. Callbacks for session management
  callbacks: {
    async signIn({ user, account }) {
      // Allow all sign-ins - adapter will handle account creation/linking
      if (!account || !user.email) return false;

      // If user exists with same email but no linked account, allow linking
      if (account.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { accounts: true },
          });

          if (existingUser) {
            // Check if Google account is already linked
            const hasGoogleAccount = existingUser.accounts.some(
              (acc) => acc.provider === "google"
            );

            // If user exists but no Google account linked, allow linking
            // The adapter will handle the actual linking
            if (!hasGoogleAccount) {
              // Explicitly link the account
              try {
                await prisma.account.create({
                  data: {
                    userId: existingUser.id,
                    type: account.type,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId!,
                    refresh_token: account.refresh_token,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state,
                  },
                });
              } catch (linkError: unknown) {
                // If account already exists (race condition), that's fine
                const error = linkError as { code?: string };
                if (!error?.code || error.code !== "P2002") {
                  console.error("Error linking account:", linkError);
                }
              }
            }
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          // Still allow sign-in - adapter will handle it
        }
      }

      return true;
    },
    async session({ session, user }) {
      // With database strategy, user is the database user object
      if (session.user && user) {
        // Fetch full user data to get role and other custom fields
        const fullUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { 
            role: true, 
            googleId: true, 
            profilePictureUrl: true,
            email: true,
            name: true,
            image: true,
          },
        });
        if (fullUser) {
          // Extend session.user with custom properties
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const extendedUser = session.user as any;
          extendedUser.id = user.id;
          extendedUser.role = fullUser.role;
          extendedUser.googleId = fullUser.googleId;
          // Ensure email and name are set
          if (fullUser.email) session.user.email = fullUser.email;
          if (fullUser.name) session.user.name = fullUser.name;
          if (fullUser.image) session.user.image = fullUser.image;
        }
      }
      return session;
    },
  },

  // 6. Cookie configuration for proper state management
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days - matches session.maxAge
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    pkceCodeVerifier: {
      name: `next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 15, // 15 minutes
      },
    },
    state: {
      name: `next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 15, // 15 minutes
      },
    },
  },

  // 7. Pages configuration
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors back to login
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };