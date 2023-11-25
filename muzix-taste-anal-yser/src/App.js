// Import necessary modules
import React, { useState, useEffect } from 'react';

import { useSpring, animated } from 'react-spring';
import  './App.css';

import Landing from './components/landing';
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
  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-50px)' },
    config: { tension: 300, friction: 10 },
  });


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
      
      <Landing onClick={authen}/>
      </section> }









 
     {!homepage && <section> <div className='text-3xl Bono  p-8 justify-center flex'>Muzix Taste Anal-yzer</div>
{profile && 
 <animated.div style={animationProps}>
<div className="user-profile ">
{profile.images && profile.images.length > 0 && (
      <div className='flex justify-center rounded-full '>   <img className='w-40' src={profile.images[1].url} alt="User" /> </div>
      )}
      <div className="user-info flex justify-center mt-4 Bono text-2xl ">
        <h1> hey , {profile.display_name}</h1>
       
       {/* Check if followers exist before accessing its properties */}
      
      </div>
     

      
    </div>  </animated.div>}
    {topArtists && (
  <section id="topArtist" style={{ overflow:'hidden', whiteSpace: 'nowrap' }}>
    
    <ul style={{ display: 'inline-block', margin: 0, padding: 0, listStyle: 'none',  animation: 'marquee 25s linear infinite' }}>
      {topArtists.map((artist) => (
        <li key={artist.id} style={{ display: 'inline-block', marginRight: '20px' }}>
          <img
            src={artist.images[0].url}
            alt={artist.name}
            width="150"
            height="150"
          />
          <div>
            <h3>{artist.name}</h3>
          </div>
        </li>
      ))}
    </ul>
  </section>
)}

        </section> }
            
    </div>
  );
}

export default App;
