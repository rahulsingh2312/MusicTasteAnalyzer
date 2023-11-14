// Import necessary modules
import React, { useState, useEffect } from 'react';
import  './App.css';

import Button from '../src/components/button';
import {
  redirectToAuthCodeFlow,
  getAccessToken,
  fetchProfile,
  getTopartist
} from './yourUtilityModule'; 


const clientId = "12710544b2c2417d96580fe317b32b60"; 
// Your utility functions and API functions (e.g., redirectToAuthCodeFlow, getAccessToken, fetchProfile, getTopartist)...

// Define the main App component
function App() {
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [homepage, setHomepage] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        // Redirect to Spotify authorization flow
    setHomepage(false);
        // Fetch data and update state
        const accessToken = await getAccessToken(clientId, code);
        const userProfile = await fetchProfile(accessToken);
        const userTopArtists = await getTopartist(accessToken);
console.log(userProfile);

        setProfile(userProfile);
        setTopArtists(userTopArtists.items);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  function authen(){

    redirectToAuthCodeFlow(clientId);
  
  }
  // Render the UI
  return (
    <div className='bg-gradient-to-b from-fuchsia-300 to-lime-200'>









     {homepage && <section>
      
      <Button onClick={authen}/>
      </section> }










     {!homepage && <section> <h1>Muzix Taste Anal-yzer</h1>
{profile && <div className="user-profile ">
{profile.images && profile.images.length > 0 && (
        <img src={profile.images[1].url} alt="User" />
      )}
      <div className="user-info">
        <h1>{profile.display_name}</h1>
        <p>Email: {profile.email}</p>
        <p>Country: {profile.country}</p>
       {/* Check if followers exist before accessing its properties */}
       {profile.followers && (
              <li>Followers: {profile.followers.total}</li>
            )}
        {profile.external_urls && (
              <li>
                Spotify URI:{" "}
                <a href={profile.external_urls.spotify}>{profile.uri}</a>
              </li>
            )}
      </div>


      
    </div> }
    { topArtists && <section id="topArtist">
          <h2>Top Artists</h2>
          <ul>
            {topArtists.map((artist) => (
              <li key={artist.id}>
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  width="100"
                  height="100"
                />
                <div>
                  <h3>{artist.name}</h3>
                  <p>Genres: {artist.genres.join(", ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>}
        </section> }
            
    </div>
  );
}

export default App;
