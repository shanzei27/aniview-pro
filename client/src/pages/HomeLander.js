import React, { useState, useReducer } from 'react'
import MALIntegration from '../services/MALIntegration'
import { styled, alpha, useTheme   } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

//api functions
import ControlRow from '../components/ControlRow';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import DrawerLeft from '../components/DrawerLeft/DrawerLeft';
import LikeVsHateRow from '../components/LikeVsHateSection/LikeVsHateRow';

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `${drawerWidth}`,
  ...(open && {
      transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
  })
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: "100%"
}));

const HomeLander = (props) => {
  const [openWindow, setOpenWindow] = useState("lvh");
  const [likeVHateArray, setLikeVHateArray] = useState([props.likeVHateArray]);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  //----API-------------------------------------------------------------------------------------

   // console.log("RENDER START user :: "+props.username);
   const [userLikesArray, setUserLikesArray] = useState(props.lvhAnimeArray["userLikes"]);
   const [userHatesArray, setUserHatesArray] = useState(props.lvhAnimeArray["userHates"]);
 

  //----API END-------------------------------------------------------------------------------------


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const WindowComponent = () => {
    switch(openWindow){
      case "lvhUserLikes":
        return <LikeVsHateRow data={ userLikesArray } />
      case "lvhUserHates":
        return <LikeVsHateRow data={ userHatesArray } />
      default:
        return <LikeVsHateRow data={ userLikesArray } />
    }
  }

  return (
    <>
    <Box sx={{ display: 'flex',  width:'100%' }}>
    <CssBaseline />
    <DrawerLeft />   
      <Main open={open}>
        <StyledGrid>
          <Grid item xs={10} >
          <Item>
              <WindowComponent />
          </Item>
          </Grid>
        </StyledGrid>
      </Main>
      </Box>
    </>
  )
}

export default HomeLander