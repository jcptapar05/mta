import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prismaDb'

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email
            },
            include: {
              role: true
            }
          })

          if (!user) return null;

          const verifiedPw = await bcrypt.compare(password, user.password)

          if (!verifiedPw) return null;

          const userData = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
            role: user.role?.name
          }

          return userData;
        } catch (error) {
          console.log(error);
        }
      },
    })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.avatar = token.avatar
        session.user.email = token.email
        session.user.first_name = token.first_name
        session.user.last_name = token.last_name
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
        token.avatar = user.avatar
        token.first_name = user.first_name
        token.last_name = user.last_name
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/"
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }