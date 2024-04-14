import React, { useEffect, useState } from 'react'
import MALIntegration from '../services/MALIntegration'
import { styled, alpha, useTheme  } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppbarMain from '../components/Appbar';
import MALLikeVHateDataHandler from '../components/LikeVsHateSection/MALLikeVHateDataHandler';
import DrawerLeft from '../components/DrawerLeft/DrawerLeft';
import HomeLander from './HomeLander';
import HomeSearchPage from './HomeSearchPage';
import axios from 'axios';

const HomeMain = () => {
  const [userAquired, setUserAcquired] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [ showLoadError, setShowLoadError ] = useState(false);
  const [loadError, setLoadError] = useState({
    "message": ""
  });
  const [responseData, setResponseData] = useState({
    "data": [],
    "count": 0
});

  const handleInputFromMainSearch = (text, selections) => {
      if(!loading){
        setSearchText(text);
      }
  };

  useEffect( () => {
    // !! below hits the MAL API for profile data | temporarily replaced with testData in config.js for testing !!
  
   if(searchText != "" && !loading){
     async function fetchData() {
       setLoading(true);
       setUserAcquired(false);
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
        setLoading(false);
        setTimeout(() => {
          setShowLoadError(false);
          
      }, 5000);
      }

    
     }

       if(searchText) fetchData();
      
     }
  }, [searchText]);

  const HomeComponent = () => {
    if(userAquired){
      return <HomeLander handleInputFromMainSearch={handleInputFromMainSearch} lvhAnimeArray={responseData["lvhArray"]} loading={loading}/>;
    } else {
      return <HomeSearchPage handleInputFromMainSearch={handleInputFromMainSearch} error={loadError} showError={showLoadError} loading={loading}/>;
    }
  }
  return (
    <>
      <AppbarMain handleInputFromMainSearch={handleInputFromMainSearch} userAcquired={userAquired}/>
      <Box sx={{ display: 'flex' }}>
        
        <HomeComponent />
      </Box>
    </>
  )
}

export default HomeMain