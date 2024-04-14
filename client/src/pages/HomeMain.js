import React, { useEffect, useState } from 'react'
import MALIntegration from '../services/MALIntegration'
import { styled, alpha, useTheme  } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppbarMain from '../components/Appbar';
import MALLikeVHateDataHandler from '../components/LikeVsHateSection/MALLikeVHateDataHandler';
import ControlRow from '../components/ControlRow';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerLeft from '../components/DrawerLeft/DrawerLeft';
import HomeLander from './HomeLander';
import HomeSearchPage from './HomeSearchPage';
import axios from 'axios';

const HomeMain = () => {
  const [userAquired, setUserAcquired] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [ showLoadError, setShowLoadError ] = useState(false);
  const [loadError, setLoadError] = useState({
    "message": ""
  });
  const [responseData, setResponseData] = useState({
    "data": [],
    "count": 0
});

  const handleSearchTextChange = (text) => {
      if(!loading){
        setSearchText(text);
      }
  };

  useEffect( () => {
    // !! below hits the MAL API for profile data | temporarily replaced with testData in config.js for testing !!
  
   if(searchText != ""){
     async function fetchData() {
       setLoading(true);
    //   const url = require("url");
       const queryParams = searchText
      // const params = new URLSearchParams(queryParams);
      try {
        const responseData = await axios.get(`http://localhost:9000/testAPI/${queryParams}`).then((res) => setResponseData(res.data)); 
        setLoading(false);
        setUserAcquired(true);
      }
      catch(error) {
        if(error === null){
          setLoadError({
            message: "Unknown error"
          });
        } else {
          setLoadError(error);
        }
        
        console.log(loadError);
        setShowLoadError(true);
        
        setTimeout(() => {
          setShowLoadError(false);
          setLoading(false);
      }, 5000);
      }

    
     }

       if(searchText) fetchData();
      
     }
  }, [searchText]);

  const HomeComponent = () => {
        if(userAquired){
      
      return <HomeLander handleSearchTextChange={handleSearchTextChange} lvhAnimeArray={responseData["lvhArray"]}/>;
    } else {
      return <HomeSearchPage handleSearchTextChange={handleSearchTextChange} error={loadError} showError={showLoadError}/>;
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <HomeComponent />
      </Box>
    </>
  )
}

export default HomeMain