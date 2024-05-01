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
  const [mainData, setMainData] = useState({
    // !! TESTING WITH MOCK DATA / SWITCH BACK TO API !!
    data: [],
    count: 0,
  });
  const [profileData, setProfileData] = useState({});
  // const [mainData, setMainData] = useState({...testData});      // temp test data

  const handleInputFromMainSearch = (text) => {
    if (!loading) {
      setSearchText(text);
    }
  };

  useEffect(() => {
    
    if(searchText === ""){
      const lastUser = localStorage.getItem("lastuser");
      if(lastUser != null){
        setSearchText(lastUser);
      }
    }
  }, [])

  useEffect(() => {
    
    // !! below hits the MAL API for profile data | temporarily replaced with testData in config.js for testing !!    
    if (searchText != "" && !loading) {
      async function fetchData() {
        setLoading(true);
        setUserAcquired(false);
        localStorage.setItem("lastuser", searchText);
        //   const url = require("url");
        const queryParams = searchText;
        // const params = new URLSearchParams(queryParams);
        if (
          localStorage.getItem(`${queryParams}_main`) != null ||
          localStorage.getItem(`${queryParams}_main`) != null
        ) {
          console.log("retrieving localStorage data");

          const storedMain = localStorage.getItem(`${queryParams}_main`);
          const storedProfile = localStorage.getItem(`${queryParams}_profile`);

          console.log(storedMain);
          setMainData(JSON.parse(storedMain));
          setProfileData(JSON.parse(storedProfile));

          setTimeout(() => {
            setLoading(false);
            setUserAcquired(true);
          }, 500);
        } else {
          console.log("fetching API data");

          try {
            const responseData = await axios
              .get(`${process.env.REACT_APP_API_URL}/v1/lvh/${queryParams}`)
              .then((res) => setMainData(res.data));
            const profileResponseData = await axios
              .get(`${process.env.REACT_APP_API_URL}/v1/profile/users/${queryParams}`)
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

              console.log(loadError);
              setShowLoadError(true);
              setLoading(false);

              setTimeout(() => {
                setShowLoadError(false);
                setUserAcquired(false);
                setSearchText("");
              }, 5000);
            }
          }
        }
      }

      if (searchText) fetchData();
    }
  }, [searchText]);

  useEffect(() => {
    if(searchText != "" && searchText != null){
      localStorage.setItem(`${searchText}_main`, JSON.stringify(mainData));
      console.log(mainData);
    }
  }, [mainData]);

  useEffect(() => {
    if(searchText != "" && searchText != null){
      localStorage.setItem(`${searchText}_profile`, JSON.stringify(profileData));
      console.log(profileData);
    }
  }, [profileData]);

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
          lvhAnimeArray={mainData}
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
