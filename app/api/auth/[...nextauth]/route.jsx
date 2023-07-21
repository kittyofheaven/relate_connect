import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { firestore } from '../../../../utils/dbfirestore'

const authOptions = {

    adapter: FirestoreAdapter(firestore),

    providers: [

        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    
    pages: {
    }
}

const handler = NextAuth(authOptions)


export { handler as GET, handler as POST, authOptions }