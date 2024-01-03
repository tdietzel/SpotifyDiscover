import React from 'react'
import { useState, useEffect } from 'react'

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

function TopTracks({artistId, accessToken}) {
  const [TopTracks, setTopTracks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const tracks = await fetchTopTracks(artistId, accessToken);
      if (tracks) {
        setTopTracks(tracks);
      }
    };

    fetchData();
  }, [artistId, accessToken]);

  // // const artistId = await fetch('https://api.spotify.com/v1/search?q='+ searchInput + '&type=artist', artistParameters)
  // const topTrackResults = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks/ES`, artistParameters)
   
  //   .then(response => response.json())
  //   .then(data => console.log(data))

  return (
    <div>
      <h1>Top Tracks</h1>
      <ul>
        {TopTracks.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default TopTracks;
