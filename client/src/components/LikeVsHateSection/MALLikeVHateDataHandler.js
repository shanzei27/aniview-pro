import React, { useEffect, useState } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import LikeVsHateRow from './LikeVsHateRow';
//import testData from '../../config/test_data';
import Box from '@mui/material/Box';

//apis
import { fetchMALAnime, fetchMALUserAnimeList } from '../../services/MALAPIHandlers';


// HANDLER FOR LIKE VS HATE ONLY
const  MALLikeVHateDataHandler = (props) => {

  function getLikeVHateData(){
    return props.lvhAnimeArray;
  }

  return (
    <>
    {props.loading &&
    <Box sx={{display:'flex',  alignItems: 'center', justifyContent: 'center', width: `calc(100vw - 240` }}>
      <PulseLoader color="#36d7b7" />
    </Box>
    }

    {!props.loading &&
      
      <LikeVsHateRow data={ props.lvhAnimeArray } getData = {getLikeVHateData} />
          
    }
    </>
  )
}

export default MALLikeVHateDataHandler