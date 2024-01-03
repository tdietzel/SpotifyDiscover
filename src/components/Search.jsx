import React, { useState } from 'react';
import TopTracks from './TopTracks';
import RelatedArtists from './RelatedArtists'

async function searchSpotify(searchInput, accessToken) {
  const artistParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, artistParameters);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function Search({ accessToken }) {
  const [searchInput, setSearchInput] = useState("");
  const [artistId, setArtistId] = useState(null);
  const [image, setImage] = useState(null);
  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const result = await searchSpotify(searchInput, accessToken);
    setArtistId(result.artists.items[0].id);
    console.log(result.artists.items[0])
    setImage(result.artists.items[0].images[0].url)
  };

  return (
    <>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input type="text" name='artist' value={searchInput} onChange={handleSearchInputChange} placeholder="Search for an artist" />
          <br />
          <button type="submit">Search</button>
        </form>
      </div>
      <br />
      <div>
        {artistId ? <img src={image} alt="artist" height="200" width="200"/> : null}
        <br />
      </div>
      <br />
      <hr />
    {artistId ? <TopTracks artistId={artistId} accessToken={accessToken} artistName={searchInput}/> : null}
    <br />
    <br />
    <hr />
    {artistId ? <RelatedArtists artistId={artistId} accessToken={accessToken}/>: null}
    </>
  );
}

export default Search;