const clientId = "12710544b2c2417d96580fe317b32b60"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
async function start() {
if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const topArtists = await getTopartist(accessToken);
    populateUI(profile , topArtists);
    // populateUI(profile);
}
}

start();


export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}
// ...

function populateUI(profile ,topArtists) {
    // Populate user profile information
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(100, 100);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
    populateTopArtists(topArtists)
    // // Populate top artist information
    // const topArtistList = document.getElementById("topArtistList");
    // topArtists.items.forEach(artist => {
    //     const listItem = document.createElement("li");
    //     listItem.innerHTML = `
    //         <img src="${artist.images[0].url}" alt="${artist.name}" width="100" height="100">
    //         <div>
    //             <h3>${artist.name}</h3>
    //             <p>Genres: ${artist.genres.join(", ")}</p>
    //         </div>
    //     `;
    //     topArtistList.appendChild(listItem);
    // });
}

// ...

export async function getTopartist(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    return await result.json();
}


function populateTopArtists(topArtists) {
    const topArtistList = document.getElementById("topArtistList");
    topArtistList.innerHTML = ""; // Clear previous content

    topArtists.items.forEach(artist => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="${artist.images[0].url}" alt="${artist.name}" width="100" height="100">
            <div>
                <h3>${artist.name}</h3>
                <p>Genres: ${artist.genres.join(", ")}</p>
            </div>
        `;
        topArtistList.appendChild(listItem);
    });
}