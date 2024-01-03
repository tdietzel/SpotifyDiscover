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









// import dotenv from 'dotenv';
// dotenv.config();

// function App() {
// const client_id = process.env.VITE_CLIENT_ID; 
// const client_secret = process.env.VITE_CLIENT_SECRET;

// async function getToken() {
//   const response = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     body: new URLSearchParams({
//       'grant_type': 'client_credentials',
//     }),
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
//     },
//   });

//   return await response.json();
// }

// async function getTrackInfo(access_token) {
//   const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
//     method: 'GET',
//     headers: { 'Authorization': 'Bearer ' + access_token },
//   });

//   return await response.json();
// }

// getToken().then(response => {
//   getTrackInfo(response.access_token).then(profile => {
//     console.log(profile)
//   })
// });
// return (
//   <>
//   </>
// )
// }

// export default App;