import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppbarMain from "../components/Appbar";
import HomeLoaded from "./HomeLoaded";
import HomeSearchPage from "./HomeSearchPage";
import axios from "axios";
import testData from "../config/test_data";

const HomeMain = (props) => {
  const [userAquired, setUserAcquired] = useState(false); // !! TESTING = TRUE / SWITCH BACK TO FALSE !!
  const [sideDrawerOpen, setSideDrawerOpen] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoadError, setShowLoadError] = useState(false);
  const [loadError, setLoadError] = useState({
    message: "",
  });
  const [responseData, setResponseData] = useState({
    // !! TESTING WITH MOCK DATA / SWITCH BACK TO API !!
    data: [],
    count: 0,
  });
  const [profileData, setProfileData] = useState({});
  // const [responseData, setResponseData] = useState({...testData});      // temp test data

  const handleInputFromMainSearch = (text) => {
    if (!loading) {
      setSearchText(text);
    }
  };

  useEffect(() => {
    // !! below hits the MAL API for profile data | temporarily replaced with testData in config.js for testing !!

    if (searchText != "" && !loading) {
      async function fetchData() {
        setLoading(true);
        setUserAcquired(false);
        //   const url = require("url");
        const queryParams = searchText;
        // const params = new URLSearchParams(queryParams);
        try {
          const responseData = await axios
            .get(`http://localhost:9000/v1/testAPI/${queryParams}`)
            .then((res) => setResponseData(res.data));
          const profileResponseData = await axios
            .get(`http://localhost:9000/v1/profile/users/${queryParams}`)
            .then((res) => setProfileData(res.data));
          setLoading(false);
          setUserAcquired(true);
        } catch (error) {
          if (error === null) {
            setLoadError({
              message: "Unknown error",
            });
          } else {
            setLoadError(error);
          }

          console.log(loadError);
          setShowLoadError(true);
          setLoading(false);

          setTimeout(() => {
            setShowLoadError(false);
            setUserAcquired(false);
          }, 5000);
        }
      }

      if (searchText) fetchData();
    }
  }, [searchText]);

  const handleDrawerOpen = () => {
    setSideDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setSideDrawerOpen(false);
  };

  const HomeComponent = () => {
    if (userAquired) {
      return (
        <HomeLoaded
          handleInputFromMainSearch={handleInputFromMainSearch}
          lvhAnimeArray={responseData}
          profileData={profileData}
          loading={loading}
        />
      );
    } else {
      return (
        <HomeSearchPage
          handleInputFromMainSearch={handleInputFromMainSearch}
          error={loadError}
          showError={showLoadError}
          loading={loading}
        />
      );
    }
  };
  return (
    <>
      <AppbarMain
        handleLightModeChange={(value) => props.handleLightModeChange(value)}
        handleInputFromMainSearch={handleInputFromMainSearch}
        userAcquired={userAquired}
        drawerOpen={sideDrawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Box sx={{ display: "flex" }}>
        <HomeComponent />
      </Box>
    </>
  );
};

export default HomeMain;
