import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../../lib/spotify"


async function refreshAccessToken(token) {

    try {

        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log('Refreshed token details:', refreshedToken);

        token.accessToken = refreshedToken.access_token;
        token.accessTokenExpires = Date.now() + refreshedToken.expires_in * 1000;
        token.refreshToken = refreshedToken.refresh_token ?? token.refreshToken;

        return token;
 
    } catch (error) {
        token.error = 'RefreshAccessTokenError';
        return token
    }
}


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        
        async jwt({ token, account, user }) {

            if (account && user) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.username = account.providerAccountId;
                token.accessTokenExpires = account.expires_at * 1000
                return token
            }

            if (Date.now() < token.accessTokenExpires) {
                console.log('Existing token is valid, returning it')
                return token;
            }

            console.log('access token has expired, trying to update it')
            return await refreshAccessToken(token)
            
        },

        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }

    },

})