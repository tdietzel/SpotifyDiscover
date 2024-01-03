import React from 'react'
import { useState, useEffect } from 'react'
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
    console.log("error fetching top tracks", error)
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
    <div>
      <h1>Top Tracks for {artistName}</h1>
      <ol>
        {topTracks.map((track) => (
          <li key={track.id}>
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            {track.name}</a></li>
        ))}
      </ol>
    </div>
  )
}

export default TopTracks;
