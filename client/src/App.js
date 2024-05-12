import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import AppbarMain from "./components/Appbar.js";
//pages
import HomeMain from "./pages/HomeMain.js";
import About from "./pages/About.js";
import Feedback from "./pages/Feedback.js";
import { useState, useEffect } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#282c34",
    },
    primary: {
      main: "#009688",
      nav: "#262626",
    },
    secondary: {
      main: "#00989B",
    },
    positive: {
      main: green[800],
    },
    text: {
      // primary: "#ffffff",     ???
      dark: "#000",
    },
  },
  typography: {
    lead: {
      fontSize: 52,
      fontWeight: 700,
      fontFamily: "Oxygen",
    },
    h1: {
      fontSize: 44,
      fontWeight: 600,
    },
    h2: {
      fontSize: 48,
    },
    h3: {
      fontSize: 32,
      fontFamily: "Oxygen",
    },
    h5: {
      padding: 4,
      color: "#000",
      fontSize: 17,
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    body1Dark: {
      fontWeight: 500,
      color: "#000",
    },
    body2: {
      fontWeight: 500,
    },
    button: {
      fontStyle: "bold",
      fontSize: 16,
      fontWeight: 600,
    },
    fontFamily: "Roboto",
  },
});

const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1800,
    },
  },
  palette: {
    mode: "light",
    background: {
      default: "#fff",
      dark: "#fff",
    },
    primary: {
      main: "#009688",
      nav: "#005e78",
    },
    secondary: {
      main: "#00989B",
    },
    positive: {
      main: green[800],
    },
    text: {
      // primary: "#ffffff",     ???
      dark: "#000",
    },
  },
  typography: {
    lead: {
      fontSize: 52,
      fontWeight: 700,
      fontFamily: "Oxygen",
    },
    h1: {
      fontSize: 36,
      fontWeight: 800,
    },
    h2: {
      fontSize: 36,
    },
    h3: {
      fontSize: 32,
      fontFamily: "Oxygen",
    },
    h5: {
      padding: 4,
      color: "#000",
      fontSize: 16,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    body1Dark: {
      fontWeight: 500,
      color: "#000",
    },
    body2: {
      fontWeight: 500,
    },
    button: {
      fontStyle: "bold",
      fontSize: 16,
      fontWeight: 600,
    },
    fontFamily: "Roboto",
  },
});

function App() {
  const [light, setLight] = useState(false);
  const [searchText, setSearchText] = useState(""); // changing triggers profile reload and rerender
  const [loading, setLoading] = useState(false);
  const [userAcquired, setUserAcquired] = useState(false); // !! TESTING = TRUE / SWITCH BACK TO FALSE !!
  const [sideDrawerOpen, setSideDrawerOpen] = useState(true);
  const [showSnackMessage, setShowSnackMessage] = useState(false);
  const [forgottenProfile, setForgottenProfile] = useState(false);
  const [snackMessage, setSnackMessage] = useState("Profile forgotten");

  useEffect(() => {
    const lastForgotten = localStorage.getItem("lastforgotten");
    if (lastForgotten === "true") {
      setShowSnackMessage(true);
      setTimeout(() => {
        setShowSnackMessage(false);
      }, "6000");
    }
  }, []);

  const handleLightModeChange = (value) => {
    setLight((prevMode) => !prevMode);
  };

  const handleInputFromMainSearch = (text) => {
    setSearchText(text);
  };

  const handleForgetProfile = () => {
    setShowSnackMessage(true);
  };

  const handleDrawerOpen = () => {
    setSideDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setSideDrawerOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={light ? lightTheme : darkTheme}>
          <main>
            <AppbarMain
              handleInputFromMainSearch={handleInputFromMainSearch}
              userAcquired={userAcquired}
              drawerOpen={sideDrawerOpen}
              searchText={searchText}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              handleLightModeChange={handleLightModeChange}
              handleForgetProfile={handleForgetProfile}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <HomeMain
                    searchText={searchText}
                    setSearchText={setSearchText}
                    loading={loading}
                    setLoading={setLoading}
                    userAcquired={userAcquired}
                    setUserAcquired={setUserAcquired}
                    drawerOpen={sideDrawerOpen}
                    handleLightModeChange={(value) => handleLightModeChange()}
                    handleInputFromMainSearch={handleInputFromMainSearch}
                    showSnackMessage={showSnackMessage}
                    snackMessage={snackMessage}
                  />
                }
              />
              <Route
                path="/home"
                element={
                  <HomeMain
                    searchText={searchText}
                    setSearchText={setSearchText}
                    loading={loading}
                    setLoading={setLoading}
                    userAcquired={userAcquired}
                    setUserAcquired={setUserAcquired}
                    drawerOpen={sideDrawerOpen}
                    handleLightModeChange={(value) => handleLightModeChange()}
                    handleInputFromMainSearch={handleInputFromMainSearch}
                    showSnackMessage={showSnackMessage}
                    snackMessage={snackMessage}
                  />
                }
              />
              <Route
                path="/about"
                element={
                  <About
                    handleLightModeChange={(value) => handleLightModeChange()}
                  />
                }
              />
              <Route
                path="/feedback"
                element={
                  <Feedback
                    handleLightModeChange={(value) => handleLightModeChange()}
                  />
                }
              />
            </Routes>
          </main>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
