// import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from './lib/schemas/auth'
import { getUserByPhoneNumber } from './lib/queries/auth/user'
// import Github from 'next-auth/providers/github'
// import Google from 'next-auth/providers/google'

export default {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { phone, password } = validatedFields.data

          const user = await getUserByPhoneNumber(phone)
          if (!user || !user.password) return null

          // const passwordsMatch = await bcrypt.compare(password, user.password)

          if (password === user.password) return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
