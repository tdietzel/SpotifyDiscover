import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Card} from 'react-bootstrap'

async function fetchRelatedArtist(artistId, accessToken) {
  const artistParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  try {
    const relatedArtistResults = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists?market=ES`, artistParameters);
    const data = await relatedArtistResults.json();
    const topThreeRelatedArtists = data.artists.slice(0,3)
    return topThreeRelatedArtists;
  } catch (error) {
    console.log("error fetching top tracks", error)
    return null;
  }
}

function RelatedArtists({artistId, accessToken}) {
  const [relatedArtist, setRelatedArtist] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const artist = await fetchRelatedArtist(artistId, accessToken);
      if (artist) {
        setRelatedArtist(artist);
      }
    };

    fetchData();
  }, [artistId, accessToken]);

  const handleCardClick = (artistId) => {
    const clickedArtist = relatedArtist.find(artist => artist.id === artistId);
  
    if (clickedArtist) {
      const artistURL = clickedArtist.external_urls.spotify;
      window.open(artistURL, '_blank');
    }
  };

  return (
<>
  <h1>Related Artists</h1>
  <p>Click Related Artist</p>
  <Container>
    <Row className='mx-2 row row-cols-3'>
      {relatedArtist.map(artist => (
        <Card key={artist.id} className='col mb-4' onClick={() => handleCardClick(artist.id)}>
          <Card.Img variant='top' src={artist.images[0]?.url || 'placeholder-image-url'} alt={artist.name} />
          <Card.Body>
            <Card.Title>{artist.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </Row>
  </Container>
  </>
  )
}
export default RelatedArtists