import React, { useEffect, useState } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import LikeVsHateRow from './LikeVsHateRow';
//import testData from '../../config/test_data';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
//apis
import { fetchMALAnime, fetchMALUserAnimeList } from '../../services/MALAPIHandlers';

const LoadingText = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '16px',
  marginTop: '15px'
}));

// HANDLER FOR LIKE VS HATE ONLY
const  MALLikeVHateDataHandler = (props) => {

  function getLikeVHateData(){
    return props.lvhAnimeArray;
  }

  return (
    <>
      <LikeVsHateRow data={ props.lvhAnimeArray } getData = {getLikeVHateData} />
    </>
  )
}

export default MALLikeVHateDataHandler