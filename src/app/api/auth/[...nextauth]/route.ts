import NextAuth from "next-auth/next";
import { nextAuthOptions } from "@/app/utils/authOptions"

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }