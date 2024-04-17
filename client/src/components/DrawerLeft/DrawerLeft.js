import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import HistoryIcon from '@mui/icons-material/History';
import RecommendIcon from '@mui/icons-material/Recommend';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import drawerLeftTabs from '../../config/drawer_left_tabs';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export default function DrawerLeft(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();

  const buttonProps = (value) => ({
    selected: selectedIndex === value
  });

  
  return (
    <>
        <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{color: '#000'}}>
            {drawerLeftTabs.map((data, index) => (
              <ListItem key={data.text} disablePadding>
                <ListItemButton {...buttonProps(index)}
                   sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#5aa2a2",
                      color: "white"
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#a2dede",
                      color: "white"
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: "#318B8B",
                    },
                    ":hover": {
                      backgroundColor: "#40b7b7",
                      color: "white"
                    }
                  }}
                  id = {data.key}
                  onClick={(e) => {
                    props.handleSidebarLinkClick(e);
                    setSelectedIndex(index)
                  }}
                >                     
                  <ListItemIcon sx={{marginRight:-1}}>
                    { data.icon == "starFull" ? <StarIcon/> : null }
                    { data.icon == "starHalf" ? <StarHalfIcon/> : null }
                    { data.icon == "history" ? <HistoryIcon/> : null }
                    { data.icon == "recommend" ? <RecommendIcon/> : null }
                    { data.icon == "overview" ? <AccountCircleIcon/> : null }
                  </ListItemIcon>
                  <ListItemText primary={data.text} />
                </ListItemButton>
                
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}
