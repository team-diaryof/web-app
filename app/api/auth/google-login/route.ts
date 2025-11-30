import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

// ⚠️ IMPORTANT: This MUST be the "Web Client ID" from Google Cloud Console
// The same one you use in your .env for NEXT_PUBLIC_GOOGLE_CLIENT_ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    // 1. Verify the Google Token sent from React Native
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, 
    });
    const payload = ticket.getPayload();

    if (!payload?.email) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    const { email, sub: googleId, name, picture } = payload;

    // 2. Database Transaction: Find or Create User + Link Account
    // We mimic exactly what NextAuth does automatically, but manually here.
    const user = await prisma.$transaction(async (tx) => {
      let existingUser = await tx.user.findUnique({ where: { email } });

      if (!existingUser) {
        // Create new user if not exists
        existingUser = await tx.user.create({
          data: {
            email,
            name,
            image: picture,
            profilePictureUrl: picture,
            googleId,
            accounts: {
              create: {
                type: "oauth",
                provider: "google",
                providerAccountId: googleId,
                id_token: idToken,
              },
            },
          },
        });
      } else {
        // Link Account if exists but not linked
        if (!existingUser.googleId) {
          await tx.user.update({
            where: { id: existingUser.id },
            data: { googleId, image: picture, profilePictureUrl: picture },
          });
        }

        const accountLink = await tx.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: googleId,
            },
          },
        });

        if (!accountLink) {
          await tx.account.create({
            data: {
              userId: existingUser.id,
              type: "oauth",
              provider: "google",
              providerAccountId: googleId,
              id_token: idToken,
            },
          });
        }
      }
      return existingUser;
    });

    // 3. Generate a Session Token for Mobile (JWT)
    // React Native will store this token to stay logged in
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.NEXTAUTH_SECRET!, 
      { expiresIn: "30d" }
    );

    return NextResponse.json({
      success: true,
      user,
      token,
    });

  } catch (error) {
    console.error("Mobile Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}