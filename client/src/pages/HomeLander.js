import React, { useEffect, useState, useReducer } from 'react'
import MALIntegration from '../services/MALIntegration'
import { styled, alpha, useTheme   } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppbarMain from '../components/Appbar';
import MALLikeVHateDataHandler from '../components/LikeVsHateSection/MALLikeVHateDataHandler';

//api functions
import ControlRow from '../components/ControlRow';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../assets/logo_temp.png';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import TextField from "@mui/material/TextField";
import mainPages from '../config/main_pages';
import MuiDrawer from "@mui/material/Drawer";
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import DrawerLeft from '../components/DrawerLeft/DrawerLeft';
import axios from 'axios';

//apis
import { fetchMALAnime, fetchMALUserAnimeList } from  '../services/MALAPIHandlers';
//vars
const publicScoreBadThreshold = 7.25;     //score to determine worse than avg anime - anything below this value
const likeHateThreshold = 0.5;     //score threshold to check

//temp process vars
let publicAnimeDataObj = {};
  let lvhAnimeObject = {
    "data": [],
    count: 0
  };

const pages = [...mainPages];
const drawerWidth = 200;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const NavText = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const AppBarContainer = styled(Box)(({ theme }) => ({
  
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const AppBarTop = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

  const VersionText = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontSize: '10px'
  }));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
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
  width: '100%',
}));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: "100%"
}));

const HomeLander = () => {
  const [likeVHateArray, setLikeVHateArray] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  //----API-------------------------------------------------------------------------------------

   // console.log("RENDER START user :: "+props.username);
   const [userApiData, setUserApiData] = useState([]);
   const [publicAnimeData, setPublicAnimeData] = useState({});
   const [lvhAnimeArray, setLvhAnimeArray] = useState({
       "data": [],
       count: 0
   });
   const [loading, setLoading] = useState(true);
   const [totalItems, setTotalItems] = useState(0);
   const [objectsLoaded, setObjectsLoaded] = useState([]);
   const [processedData, setProcessedData] = useState([]);
 
   const fetchPublicData = () => {
 
   }
 
   useEffect( () => {
     setLvhAnimeArray({
       "data": [],
       count: 0
   });
     // !! below hits the MAL API for profile data | temporarily replaced with testData in config.js for testing !!
   
    if(searchText != ""){
      async function fetchData() {
        setLoading(true);
        //debugger
          const username = searchText;
          console.log("exec start with ::"+ username);
          const headers = {
              'X-MAL-CLIENT-ID': process.env.REACT_APP_CLIENT_ID
          };

          const responseData = await axios.get(`https://api.myanimelist.net/v2/users/${username}/animelist?status=completed&fields=list_status&limit=50`, { headers }).then((res) => setUserApiData(res.data)); 
          
          // processing api data post fetching
          console.log("init end, response ::", userApiData);

          await Promise.all([
            initFetchAndHandleResponse()
          ]).then(setPublicAnimeData(publicAnimeDataObj))
          console.log("WAITED 1");
         
          await Promise.all([
            handleFetchedData(publicAnimeDataObj)
          ]).then(updateStateWithAnimeData(lvhAnimeObject))
          
          console.log("WAITED 2");
          console.log("FINALLY");
          console.log(lvhAnimeArray);
          console.log(publicAnimeData);
          
          setLoading(false);
      }
  
        console.log(userApiData);
        if(searchText) fetchData();
      
      
      }
   }, [searchText]);
 
   const updateStateWithAnimeData = (data) => {
     const newObj = {
       ...lvhAnimeArray,
       data: data["data"],
       count: data["count"],
     };
     setLvhAnimeArray(newObj);
   };
 
   const initFetchAndHandleResponse = async () => {
    // console.log("init start");
     let prevIDs = [];
     //debugger;
     for (let i = 0; i < userApiData["data"].length; i++) {     //userApiData["data"].forEach( (element) => {
       const animeID = userApiData["data"][i]["node"]["id"];
         const publicAnime = await fetchMALAnime(animeID);
        //   console.log(publicAnime);
           const obj = {};
           obj[animeID] = publicAnime;
          // console.log(prevIDs);
 
           if(!prevIDs.includes(animeID)){
             prevIDs.push(animeID);
             const newObj = {};
             newObj[animeID] = publicAnime;
             publicAnimeDataObj[animeID] = publicAnime;
             setObjectsLoaded(prev => [...prev, animeID]);
          //   debugger;
          //   await handleData(element, animeID);
          //   console.log("end 1");
           }
 
     };
 }
 
   const handleFetchedData = async (publicData) =>{
     userApiData["data"].forEach(async (element) => {
       const animeID = element["node"]["id"];
       let processedObj = {};
       const userScore = element["list_status"]["score"];
    //   debugger;
         const publicScore = publicData[animeID]["mean"];
         if(publicScore < publicScoreBadThreshold){
           if(userScore > publicScore){
             if((userScore-likeHateThreshold) > publicScore){
               processedObj["node"] = element["node"];
               processedObj["public_mean"] = publicScore;
               processedObj["user_score"] = element["list_status"]["score"]
               //lvhDataArray.push(processedObj);
               let newData = [];
 
               if(lvhAnimeObject["data"].length === undefined){
                 newData = processedObj;
               } else {
                 newData = lvhAnimeObject["data"].concat(processedObj);
             //    console.log("newData:: ",newData);
 
               }
               const count = newData.length;
               const newAnimeObject = { data: newData, count: count };
               lvhAnimeObject = newAnimeObject;
               
               console.log('MATCH FOUND :: ' + processedObj["node"]["title"]);
            //   console.log(lvhAnimeObject);
 
             } else {
              console.log('NO MATCH');
             }
         } else {
          console.log('NO MATCH');
         }
       }
     });
      // setLvhAnimeArray([...lvhAnimeArray, processedObj]);
   }
 
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

  useEffect(() => {
    // const response = fetchMALAnime(10357);
    // setLikeVHateArray(oldArray => [...oldArray,response]);
  },[])

  const handleSearchTextChange = (text) => {
 //   debugger
    setSearchText(text);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppbarMain username={searchText} handleSearchTextChange={handleSearchTextChange}/>
    <DrawerLeft />

   
      
      <Main open={open}>
      <DrawerHeader />
      <ControlRow />
        <StyledGrid>
        <Item>
          
        </Item>
          {/* <Item>
          <MALIntegration />
          </Item> */}
          <Grid item xs={12}>
          <Item>
            <MALLikeVHateDataHandler loading={loading} lvhAnimeArray={lvhAnimeArray} username={searchText} />
          </Item>
          </Grid>
        </StyledGrid>
      </Main>
      </Box>
    </>
  )
}

export default HomeLander