import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { db } from "./db/drizzle"
import { users } from "./db/schema"
import { eq } from "drizzle-orm"
import { getAccountByUserId } from "./data/account"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

export const {
  handlers, auth, signIn, signOut} = NextAuth({
    pages: {
signIn: '/login',
error: "/error"
    },
    events: {
async linkAccount({user}){
await db
.update(users)
.set({emailVerified: new Date()})
.where(eq(users.id, user.id as string))
    }},
    callbacks: {
      async signIn({user,account}){
        if(account?.provider !== "credentials") return true
      const existingUser = await getUserById(user.id as string)
      if(!existingUser?.emailVerified){
        return false
      }
        return true;
      },
      async session({session, token}){
if(token.sub && session.user){
session.user.id = token.sub;
}


if(session.user){
session.user.name = token.name;
session.user.email = token.email as string
session.user.isOAuth = token.isOAuth as boolean
}
        return session
      },
async jwt({token}){

  if(!token.sub) return token;
  
  const existingUser = await getUserById(token.sub)
  if(!existingUser) return token;

  const existingAccount = await getAccountByUserId(existingUser.id);

  token.isOAuth = !!existingAccount;
  token.name = existingUser.name;
  token.email = existingUser.email
  return token
}
    },
      adapter: DrizzleAdapter(db),
      session: {strategy: "jwt"},
  ...authConfig
})