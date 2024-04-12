import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import MALAuthHeader from './components/MALAuthHeader';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const MALIntegration = () => {
  const [codeVerifier, setCodeVerifier] = useState('');
  const [authorisationCode, setAuthorisationCode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;


    // Check if the URL contains the authorization code
    if (!authorized && currentUrl.includes('?code=')) {
      // Extract the authorization code from the URL
      const authorizationCode = currentUrl.split('?code=')[1].split('&')[0];
      setAuthorisationCode(authorizationCode);
    }
  }, []);
    
  useEffect(() => {
      if(authorisationCode != ''){
        console.log('attempting genNewToken');
        generateNewToken();
      }
    })

  // Generate a new Code Verifier / Code Challenge.
  const getNewCodeVerifier = () => {
    const token = generateCodeVerifier();
    console.log(token);
    setCodeVerifier(token.slice(0, 128));
    console.log(codeVerifier);

    const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&code_challenge=${codeVerifier}`;
    window.location.href = url;
  };
  
const generateCodeVerifier = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const length = 128;
    let codeVerifier = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      codeVerifier += characters[randomIndex];
    }
    return codeVerifier;
  };
  

  // Print the URL needed to authorize your application.
  const printNewAuthorisationUrl = () => {
    const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&code_challenge=${codeVerifier}`;
    console.log(`Authorise your application by clicking here: ${url}\n`);
  };

  // Generate new token
  const generateNewToken = async () => {
    console.log('Token gen attempt with :: '+authorisationCode);
    
    const response = await axios.post(
      'https://myanimelist.net/v1/oauth2/token',
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: authorisationCode,
        code_verifier: codeVerifier,
        grant_type: "authorization_code"
      }),
      )

     // const response = await axios.post(url, data);
      const token = response.data;
      console.log('Token generated successfully:', token);
      setAccessToken(token.access_token);
      saveTokenLocally(token);
      console.log('User info attempt with token: '+token["access_token"]);

        const url = 'https://api.myanimelist.net/v2/users/@me';
        const response2 = await axios.get(url, {
          headers: { 'Authorization': `Bearer ${token["access_token"]}` }
        });
        const user = response2.data;
        console.log('User info:', user);
        setUserInfo(user);
        setAuthorized(true);
      return token;

  };

  // Save token locally
  const saveTokenLocally = (token) => {
    localStorage.setItem('accessToken', token.access_token);
    localStorage.setItem('refreshToken', token.refresh_token);
  };

  // Test the API by requesting your profile information
  const printUserInfo = async () => {
    console.log('User info attempt');

    try {
      const url = 'https://api.myanimelist.net/v2/users/@me';
      const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const user = response.data;
      console.log('User info:', user);
      setUserInfo(user);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleCodeInputChange = (event) => {
    setAuthorisationCode(event.target.value.trim());
  };

  return (
    <div>
      <MALAuthHeader />
      <Button variant="contained" onClick={getNewCodeVerifier}>Authorize to access your MAL account</Button>
      <br />
      {userInfo && (
        <div>
          <h2>Greetings {userInfo.name}!</h2>
          <p>Email: {userInfo.email}</p>
          <p>Location: {userInfo.location}</p>
          <p>all: {userInfo}</p>
          {/* Display other user info as needed */}
        </div>
      )}
    </div>
  );
};

export default MALIntegration;