import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

async function fetchTopTracks(artistId, accessToken) {
  const artistParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  try {
    const topTrackResults = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`, artistParameters);
    const data = await topTrackResults.json();
    return data.tracks;
  } catch (error) {
    return null;
  }
}

function TopTracks({artistId, accessToken, artistName}) {
  const [topTracks, setTopTracks] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const tracks = await fetchTopTracks(artistId, accessToken);
      if (tracks) {
        setTopTracks(tracks);
      }
    };

    fetchData();
  }, [artistId, accessToken]);

  return (
    <>
      <h1 style={{textShadow: '2px 2px 4px white'}}>Top Tracks for {artistName}</h1>
      <div class='topTracksBackground'>
        <ol style={{color:'red'}}>
          {topTracks.map((track) => (
            <div class='topTracks'>
              <li key={track.id}>
                <a style={{textDecoration: 'none', color: 'white'}} href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  {track.name}
                </a>
              </li>
            </div>
          ))}
        </ol>
      </div>
    </>
  )
}
export default TopTracks;