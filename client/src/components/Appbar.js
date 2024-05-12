import * as React from "react";
import { NavLink, Router, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { styled, alpha, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import mainPages from "../config/main_pages";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { config } from "../config/config";
import { Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";

const pages = [...mainPages];
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "12px",
  width: "fit-content",
  "&:hover": {
    background: theme.palette.secondary.light,
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  width: "15%",
}));

const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    paddingRight: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  color: "white",
  fontSize: "36px",
  fontFamily: "Permanent Marker",
}));

const VersionText = styled(Typography)(({ theme }) => ({
  color: "white",
  fontSize: "10px",
  position: "absolute",
  bottom: 5,
  right: -25,
}));

const LightModeSwitch = styled(Switch)(({ theme }) => ({
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "light" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "light" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "light" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const AppBarTop = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function AppbarMain(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [barText, setBarText] = React.useState(props.searchText); // changing only effects search bar text
  const [anchorEl, setAnchorEl] = React.useState(null);

  const settingsOpen = Boolean(anchorEl);

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleSearchBarClear = (e) => {
    setBarText("");
    // props.clearCurrentlyLoadedProfile();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.handleInputFromMainSearch(barText);
  };

  const forgetProfile = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const getAppBarStyle = () => {
    return {
      backgroundImage: `radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,152,155,1) 0.1%, rgba(0,94,120,1) 94.2% )`,
      backgroundColor: "#005e78",
      zIndex: (theme) => theme.zIndex.drawer + 1,
      marginBottom: "20px",
    };
  };

  return (
    <>
      <AppBarTop maxWidth="100%" position="fixed" sx={getAppBarStyle()}>
        <Container maxWidth="100%">
          <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(props.drawerOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <LogoContainer>
              <Box sx={{ position: "relative"}}>
                <NavLink style={{ textDecoration: "none" }} to={"/home"}>
                  <LogoText>{config.site_name}</LogoText>
                </NavLink>
                <VersionText>v{config.version}</VersionText>
              </Box>
            </LogoContainer>
            {props.userAcquired && (
              <form onSubmit={submitHandler}>
                <Tooltip title="Search a new MAL profile">
                  <Search
                    component="form"
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    <StyledTextField
                      placeholder="Load another profile…"
                      inputProps={{ "aria-label": "search" }}
                      value={barText}
                      onChange={(e) => {
                        setBarText(e.target.value);
                      }}
                      variant="outlined"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={(e) => {
                              handleSearchBarClear();
                            }}
                            variant="contained"
                          >
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />{" "}
                    <IconButton type="submit" variant="contained">
                      <SearchIcon />
                    </IconButton>
                  </Search>
                </Tooltip>
              </form>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end"}}>
              {pages.map((page) => (
                <NavLink
                  to={`/` + page.toLowerCase()}
                  style={{ textDecoration: "none" }}
                  key={page}
                >
                  <NavButton
                    key={page}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </NavButton>
                </NavLink>
              ))}
              {props.userAcquired && (
                <>
                  <IconButton
                    aria-controls={settingsOpen ? "settings-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={settingsOpen ? "true" : undefined}
                    onClick={handleSettingsClick}
                    style={{ borderRadius: 0 }}
                  >
                    <SettingsIcon sx={{ fontSize: "18px" }} />
                  </IconButton>
                  <Menu
                    id="settings-menu"
                    anchorEl={anchorEl}
                    open={settingsOpen}
                    onClose={handleSettingsClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem disabled={true} onClick={handleSettingsClose}>
                      Refresh profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        forgetProfile();
                        handleSettingsClose();
                      }}
                    >
                      Forget profile
                    </MenuItem>

                    <MenuItem
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <LightModeSwitch onChange={props.handleLightModeChange} />
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBarTop>
      <Toolbar />
    </>
  );
}
export default AppbarMain;
