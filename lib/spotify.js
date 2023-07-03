import SpotifyWebApi from "spotify-web-api-node";

// const scope = [
//     'streaming',
//     'user-read-email',
//     'user-read-private',
//     'user-library-read',
//     'playlist-read-private',
//     'playlist-read-collaborative',
// ].join(' ');

var scope = "streaming user-read-email user-read-private"

const params = {
    scope: scope,
};

const queryParamString = new URLSearchParams(params)

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,

})

export default spotifyApi;

export { LOGIN_URL }