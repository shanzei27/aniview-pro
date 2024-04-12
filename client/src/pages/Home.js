import React, { useEffect, useState } from 'react'
import MALIntegration from '../services/MALIntegration'
import { styled, alpha, useTheme   } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppbarMain from '../components/Appbar';
import MALLikeVHateDataHandler from '../components/LikeVsHateSection/MALLikeVHateDataHandler';
import ControlRow from '../components/ControlRow';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerLeft from '../components/DrawerLeft/DrawerLeft';
import HomeLander from './HomeLander';


const Home = () => {

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HomeLander />

      
      </Box>
    </>
  )
}

export default Home