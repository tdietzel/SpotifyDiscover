import React, { useState } from 'react'
import TopTracks from './TopTracks';
import RelatedArtists from './RelatedArtists'
import { Card, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

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

const listItemStyles = {
  backgroundColor: '#4CAF50',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
  borderRadius: '8px',
  marginBottom: '4px',
  padding: '10px',
  fontWeight: 'bold'
};

function Search({ accessToken }) {
  const [searchInput, setSearchInput] = useState("");
  const [artistName, setArtistName] = useState(null);
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
    setArtistName(result.artists.items[0].name)
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
    setSearchInput("");
    };

    const handleRelatedArtistClick = (artistName) => {
      setSearchInput(artistName);
    };

    const handleArtistClick = (result) => {
      console.log(result)
      // window.open(track.external_urls.spotify, '_blank');
    }

  return (
    <>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input class='artist-search-input' type="text" name='artist' value={searchInput} onChange={handleSearchInputChange} placeholder="Search for an artist" />
          <Button variant="outline-success" type="submit" style={{height:'47px', margin: '5px'}}>Search</Button>
        </form>
      </div>
      <br />
      {artistId ?
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card style={{ height: '100%', margin: '10px', color: 'white' }} class='profile-card' onClick={() => handleArtistClick (result)}>
          <Card.Img style={{ height:'340px', objectFit: 'cover' }} variant="top" src={image} alt="artist" />
          <Card.ImgOverlay>
            <div class='artist-name-header'>
              <Card.Title><h1 style={{textShadow: '2px 2px 4px red'}}>{artistName}</h1></Card.Title>
            </div>
          </Card.ImgOverlay>
          <ListGroup>
            <ListGroup.Item style={listItemStyles}>Followers: {artistFollowing}</ListGroup.Item>
            <ListGroup.Item style={listItemStyles}>Popularity: {popularityResult}</ListGroup.Item>
            <ListGroup.Item style={listItemStyles}>Genres: {artistGenres.join(', ')}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      : null}
      <br />
      {artistId ? <TopTracks artistId={artistId} accessToken={accessToken} artistName={artistName}/> : null}
      <br /> <br /> <hr />
      {artistId ? <RelatedArtists artistId={artistId} accessToken={accessToken} onArtistClick={handleRelatedArtistClick}/> : null}
    </>
  );
}
export default Search;