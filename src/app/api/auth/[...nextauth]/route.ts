import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";



export const authOption = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ]
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }