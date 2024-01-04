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
  const [artistFollowing, setArtistFollowing] = useState(null);
  const [artistGenres, setArtistGenres] = useState(null);
  const [popularityResult, setPopularityResult] = useState(null);
  const [image, setImage] = useState(null);
  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const result = await searchSpotify(searchInput, accessToken);
    setArtistId(result.artists.items[0].id);
    setArtistFollowing(result.artists.items[0].followers.total);
    setArtistGenres(result.artists.items[0].genres);
    setImage(result.artists.items[0].images[0].url);

    const currentPopularity = result.artists.items[0].popularity;
    if (currentPopularity > 75) {
      setPopularityResult("Very High!");
    } else if (currentPopularity > 50) {
      setPopularityResult("High");
    } else {
      setPopularityResult("Low");
    }
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
        {artistId ?
          <div>
            <img src={image} alt="artist" height="200" width="200"/>
            <h4>Followers: {artistFollowing}</h4>
            <h5>Popularity: {popularityResult}</h5>
            <h6>Genres: <span id='genres'>{artistGenres.join(', ')}</span></h6>
          </div>
        : null}
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