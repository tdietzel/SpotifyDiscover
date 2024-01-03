import { useState, useEffect } from 'react'
import Search from './Search';

function App() {
  const [access_token, setAccessToken] = useState("");

  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + import.meta.env.VITE_CLIENT_ID + '&client_secret=' + import.meta.env.VITE_CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  if (access_token) {
    return (
      <>
      <Search accessToken={access_token}/>
      </>
    )
  }
}

export default App;