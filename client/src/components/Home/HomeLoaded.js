import React, { useState, useEffect } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerLeft from "../DrawerLeft/DrawerLeft";
import LikeVsHateRow from "../LikeVsHateSection/LikeVsHateRow";
import ProfilePage from "../Profile";
import HistoryPage from "../History";
import Recommendations from "../Recommendations";

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `${drawerWidth}`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
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
  const [userLikesArray, setUserLikesArray] = useState(
    props.lvhAnimeArray["userLikes"]
  );
  const [userHatesArray, setUserHatesArray] = useState(
    props.lvhAnimeArray["userHates"]
  );
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const preProcessData = props.lvhAnimeArray["historyPage"];
    let bar1Array = [];

    Object.keys(preProcessData["bar_1"]).forEach((key) => {
      const value = preProcessData["bar_1"][key];
      if (key != "0") {
        bar1Array.push({
          year: key,
          hours_watched: value["hours_watched"],
          animes_completed: value["animes_completed"],
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
    switch (openWindow) {
      case "overview":
        return <ProfilePage data={props.profileData} type={openWindow} />;
      case "history":
        return <HistoryPage data={historyData} type={openWindow} />;
      case "lvhUserLikes":
        return <LikeVsHateRow data={userLikesArray} type={openWindow} />;
      case "lvhUserHates":
        return <LikeVsHateRow data={userHatesArray} type={openWindow} />;
      case "recommendations":
        return (
          <Recommendations
            data={props.lvhAnimeArray["recommendations"]}
            type={openWindow}
          />
        );
      default:
      // return <LikeVsHateRow data={ userLikesArray } type={ openWindow }/>
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%"
        }}
      >
        <CssBaseline />
        <DrawerLeft handleSidebarLinkClick={handleSidebarLinkClick} />
        <Main open={open}>
          <WindowComponent />
        </Main>
      </Box>
    </>
  );
};

export default HomeLander;
