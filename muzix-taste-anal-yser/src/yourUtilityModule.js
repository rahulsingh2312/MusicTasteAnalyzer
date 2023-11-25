

// const clientId = "12710544b2c2417d96580fe317b32b60"; 
export async function redirectToAuthCodeFlow(clientId) {

    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    // document.cookie = "inapptestgroup=somevalue; SameSite=None; Secure";

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", "abb3a3ccc0914778a812747071c0c2bd");
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/callback");
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




export function getEncodedClientIdAndSecret() {
    const clientId = "12710544b2c2417d96580fe317b32b60";
    const clientSecret = "abb3a3ccc0914778a812747071c0c2bd";

    if (!clientId || !clientSecret) {
        throw new Error('Missing client ID or client secret');
    }

    const concatenatedString = `${clientId}:${clientSecret}`;
    const encodedString = btoa(concatenatedString);

    return `Basic ${encodedString}`;
}

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    const encodedAuthHeader = getEncodedClientIdAndSecret();
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", "abb3a3ccc0914778a812747071c0c2bd");
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("code_verifier", verifier);

    try {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: encodedAuthHeader,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });

        if (!result.ok) {
            const errorData = await result.json();
            console.error("Error:", result.status, result.statusText, errorData);
            return null;
        }

        const { access_token } = await result.json();
        return access_token;
    } catch (error) {
        console.error("Error during token request:", error);
        return null;
    }
}


export  async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}


export async function getTopartist(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    return await result.json();
}