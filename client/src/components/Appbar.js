import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../assets/logo_temp.png';
import { styled, alpha, useTheme   } from '@mui/material/styles';
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
import List from '@mui/material/List';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const pages = [...mainPages];
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
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

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

function AppbarMain( props ) {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [barText, setBarText] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    const selections = {
      "lvh": true,
      "recommendations": true,
      "history": true,
  };
    props.handleInputFromMainSearch(barText, selections);
  }

  return (
    <>
      <AppBarTop position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#315E8B", marginBottom: '20px'}}>
      <Container maxWidth='85%'>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-evenly'}}>
        <LogoContainer>
          <Box
              component="img"
              sx={{
                width: 240,
                
              }}
              alt="logo"
              src={logo}
            />
            <VersionText>v0.1a</VersionText>
            </LogoContainer>
          {props.userAcquired &&
            <form onSubmit={submitHandler}>
            <Search component="form" sx={{display:{sm: 'none', md: 'block'}}}>
              <StyledTextField
                placeholder="Search and load profile…"
                inputProps={{ 'aria-label': 'search' }}
                value={props.searchText}
                onChange={(e) => {
                  setBarText(e.target.value);
                }}
                variant="outlined"
              />
              <IconButton
              type="submit"
              variant="contained"
            >
              <SearchIcon />
            </IconButton>
            </Search>
            </form>
          }
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink to={`/`+page} style={{textDecoration:"none"}} key={page}>
              <NavButton
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
                
              </NavButton>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBarTop>
   
    </>  
  );
}
export default AppbarMain;
