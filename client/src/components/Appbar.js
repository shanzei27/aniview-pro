import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import logo from "../assets/logo_temp.png";
import { styled, alpha, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import mainPages from "../config/main_pages";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { config } from "../config/config";

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
  justifyContent: "center",
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
  const { pathname } = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [barText, setBarText] = React.useState(props.searchText);

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

  const handleSearchBarClear = (e) => {
    setBarText("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const selections = {
      lvh: true,
      recommendations: true,
      history: true,
    };
    props.handleInputFromMainSearch(barText, selections);
  };

  return (
    <>
      <AppBarTop
        maxWidth="95%"
        position="fixed"
        sx={{
          backgroundImage:
            pathname === "/" || pathname === "/home"
              ? theme.palette.primary.nav
              : `radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,152,155,1) 0.1%, rgba(0,94,120,1) 94.2% )`,
          backgroundColor:
            pathname === "/" || pathname === "/home" ? theme.palette.primary.nav : "#005e78",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginBottom: "20px",
        }}
      >
        <Container maxWidth="85%">
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
              <Box sx={{ position: "relative" }}>
                <NavLink style={{ textDecoration: "none" }} to={"/home"}>
                  <LogoText>{config.site_name}</LogoText>
                </NavLink>
                <VersionText>v{config.version}</VersionText>
              </Box>
            </LogoContainer>
            {props.userAcquired && (
              <form onSubmit={submitHandler}>
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
                  />
                  <IconButton type="submit" variant="contained">
                    <SearchIcon />
                  </IconButton>
                </Search>
              </form>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <NavLink
                  to={`/` + page.toLowerCase()}
                  style={{ textDecoration: "none" }}
                  key={page}
                >
                  <NavButton
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </NavButton>
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBarTop>
      <Toolbar />
    </>
  );
}
export default AppbarMain;
