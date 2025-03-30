import { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }: { profile?: { email?: string } }) {
      if (profile?.email?.endsWith("@traxion.com")) {
        return true; // Allow sign-in
      }
      return false; // Block sign-in if not @traxion.com
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, profile }: { token: any; profile?: { email?: string } }) {
      if (profile) {
        token.email = profile.email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin", // Optional: Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
