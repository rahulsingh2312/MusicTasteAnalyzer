

const express = require("express")
const axios = require('axios')
const cors = require("cors");

const app = express()
app.use(cors())

CLIENT_ID = "12710544b2c2417d96580fe317b32b60"
CLIENT_SECRET = "abb3a3ccc0914778a812747071c0c2bd"
PORT = 3000 
REDIRECT_URI = `http://localhost:${PORT}/callback` 
SCOPE = [
    "user-read-email",
    "playlist-read-collaborative",
    "user-read-private", 
    " user-top-read"
]

app.get("/login", (request, response) => {
    const redirect_url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPE}&state=123456&redirect_uri=${REDIRECT_URI}&prompt=consent`
    response.redirect(redirect_url);
})
let accesstoken = '';

app.get('/callback', async (req, res) => {
    const code = req.query['code'];

    
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                redirect_uri: REDIRECT_URI,
                code: code,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: CLIENT_ID,
                    password: CLIENT_SECRET,
                },
            }
        );

        accesstoken = response.data.access_token;

        // You may want to store the access token securely or use it immediately for API requests
        // // For example, fetching the user profile
        const profileResponse = await fetchProfile(accesstoken);
        if (profileResponse !== null) {
            console.log('User Profile:', profileResponse.data);
        } else {
            console.error('User profile fetch failed.');
        }

        console.log('User Profile:', profileResponse);

        res.send(JSON.stringify(response.data));
    
});async function fetchProfile(token) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        return null;
    }
}

app.listen(PORT, () => {
    console.log(`Listening on :${PORT}`)
})
