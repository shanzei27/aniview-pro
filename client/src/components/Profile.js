import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import { openInNewTab } from '../utils/utils';
import ProfileHeader from './Profile/ProfileHeader';

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: 'calc(80vw - 240px)',
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  }));

const Profile = (props) => {
  const [pageData, setPageData] = useState({...props.data});

  return (
   <>
    <ProfileHeader pageData={pageData}/>
   </>
  )
}

export default Profile