import React, { useState, useEffect, useReducer } from 'react';
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
import ProfilePage from '../components/Profile';
import HistoryPage from '../components/History';

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
  padding: theme.spacing(1),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: "100%"
}));

const HomeLander = (props) => {
  const [openWindow, setOpenWindow] = useState("overview");
  const [likeVHateArray, setLikeVHateArray] = useState([props.likeVHateArray]);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  //----API-------------------------------------------------------------------------------------

   // console.log("RENDER START user :: "+props.username);
   const [userLikesArray, setUserLikesArray] = useState(props.lvhAnimeArray["userLikes"]);
   const [userHatesArray, setUserHatesArray] = useState(props.lvhAnimeArray["userHates"]);
   const [historyData, setHistoryData] = useState([]);
   const [profileData, setProfileData] = useState(props.lvhAnimeArray["profilePage"]);
   
  useEffect( () => {
    const preProcessData = props.lvhAnimeArray["historyPage"];
    let bar1Array = [];
    
    Object.keys(preProcessData["bar_1"]).forEach(key => {
      const value = preProcessData["bar_1"][key];
      if(key != "0"){
        bar1Array.push({
          "year": key,
          "hours_watched": value["hours_watched"],
          "animes_completed": value["animes_completed"],
        });
      }
      setHistoryData(bar1Array);
      console.log(bar1Array);
  });
  }, []);

  //----API END-------------------------------------------------------------------------------------
  const handleSidebarLinkClick = (event) => {
    setOpenWindow(event.currentTarget.id);
    console.log(openWindow);
  };

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
      case "overview":
        return <ProfilePage data={ profileData } type={ openWindow } />
      case "history":
        return <HistoryPage data={ historyData } type={ openWindow } />
      case "lvhUserLikes":
        return <LikeVsHateRow data={ userLikesArray } type={ openWindow }/>
      case "lvhUserHates":
        return <LikeVsHateRow data={ userHatesArray } type={ openWindow }/>
      default:
       // return <LikeVsHateRow data={ userLikesArray } type={ openWindow }/>
    }
  }

  return (
    <>
    <Box sx={{ display: 'flex',  width:'100%' }}>
    <CssBaseline />
    <DrawerLeft handleSidebarLinkClick = {handleSidebarLinkClick}/>   
      <Main open={open}>
        <Item>
          <WindowComponent />
        </Item>
      </Main>
      </Box>
    </>
  )
}

export default HomeLander