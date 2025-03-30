// nextAuthOptions.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // Perform your login logic
        // Find user from db
        console.log("ep: ", email, password);

        if (email === process.env.ENV_EMAIL && password === process.env.ENV_PWD) {
          // If everything is fine
          return {
            id: "2024",
            name: "admin",
            email: email,
            role: "admin",
          };
        }
        // Return null if credentials are invalid
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
