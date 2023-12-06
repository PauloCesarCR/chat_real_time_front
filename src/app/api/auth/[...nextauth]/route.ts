import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import api from "@/app/services/api"

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials, req) {
                const response = await api.post('/login', JSON.stringify({ email: credentials?.email, password: credentials?.password }))
                const user = response.data;

                if (user) {
                    return user;
                }

                return null;
            },
        })
    ],
    pages: {
        signIn: '/'
    },
    callbacks: {
        async session({ session, token }) {
            session = token.user as any
            return session
        }
    }
}
const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }