import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import HomeLoaded from "../components/Home/HomeLoaded";
import HomeSearchPage from "../components/Home/HomeSearchPage";
import axios from "axios";
import testData from "../config/test_data";
import Footer from "../components/Footer";
import Snackbar from "@mui/material/Snackbar";
import { Helmet } from "react-helmet-async";
import CssBaseline from "@mui/material/CssBaseline";

const LoadingText = styled(Typography)(({ theme }) => ({
  color: "white",
  fontSize: "16px",
  marginTop: "15px",
}));

const HomeMain = ({
  searchText,
  setSearchText,
  loading,
  setLoading,
  userAcquired,
  setUserAcquired,
  handleLightModeChange,
  handleInputFromMainSearch,
  showSnackMessage,
  snackMessage,
}) => {
  // const [searchText, setSearchText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const [mainDataLoaded, setMainDataLoaded] = useState(false);
  const [profileDataLoaded, setProfileDataLoaded] = useState(false);
  const [showLoadError, setShowLoadError] = useState(false);
  const [apiLoadProgress, setAPILoadProgress] = useState(0);
  const [loadError, setLoadError] = useState({
    message: "",
  });

  const [mainDataError, setMainDataError] = useState(null);
  const [profileDataError, setProfileDataError] = useState(null);

  const [mainData, setMainData] = useState({
    data: [],
    count: 0,
  });
  const [profileData, setProfileData] = useState({});
  // const [mainData, setMainData] = useState({...testData});      // temp test data

  // const handleInputFromMainSearch = (text) => {
  //   if (!loading) {
  //     setSearchText(text);
  //   }
  // };

  const clearLocalStorage = () => {
    console.log("CLEARED LOCAL DATA!");
    localStorage.clear();
  };

  const retrieveDataFromLocal = () => {
    console.log("retrieving localStorage data");
    const storedMain = localStorage.getItem(`${searchText}_main`);
    const storedProfile = localStorage.getItem(`${searchText}_profile`);
    setMainData(JSON.parse(storedMain));
    setProfileData(JSON.parse(storedProfile));
    setUserAcquired(true);
  };

  useEffect(() => {
    if (searchText === "") {
      const lastUser = localStorage.getItem("lastuser");
      if (lastUser != null) {
        setSearchText(lastUser);
      }
    }
  }, []);

  useEffect(() => {
    if (searchText !== "" && !loading) {
      async function fetchData() {
        setLoaded(false);
        setLoading(true);
        setUserAcquired(false);
        localStorage.setItem("lastuser", searchText);
        const queryParams = searchText;

        if (
          localStorage.getItem(`${queryParams}_main`) != null ||
          localStorage.getItem(`${queryParams}_profile`) != null
        ) {
          retrieveDataFromLocal();
        } else {
          console.log("fetching API data");
          let totalBytes = 0;
          setLoadingAPI(true);

          try {
            const responseData = await axios
              .get(`${process.env.REACT_APP_API_URL}/v1/lvh/${queryParams}`, {
                onDownloadProgress: (progressEvent) => {
                  console.log(progressEvent);
                  totalBytes += progressEvent.total;
                  let percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setAPILoadProgress(apiLoadProgress + percentCompleted / 2);
                  console.log("%1: " + percentCompleted);
                },
              })
              .then((res) => setMainData(res.data))
              .catch((error) => {
                setMainDataError(error);
                setLoading(false);
                setLoadingAPI(false);
                console.log("Main API Error:", error);
              });

            const profileResponseData = await axios
              .get(
                `${process.env.REACT_APP_API_URL}/v1/profile/users/${queryParams}`,
                {
                  onDownloadProgress: (progressEvent) => {
                    totalBytes += progressEvent.total;
                    let percentCompleted = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setAPILoadProgress(apiLoadProgress + percentCompleted / 2);
                  },
                }
              )
              .then((res) => setProfileData(res.data))
              .catch((error) => {
                setProfileDataError(error);
                setLoading(false);
                setLoadingAPI(false);
                console.log("Profile API Error:", error);
              });

            setTimeout(() => {
              setLoading(false);
            }, 200);
            setLoaded(true);
            setUserAcquired(true);
            setLoadingAPI(false);
          } catch (error) {
            if (error === null) {
              setLoadError({
                message: "Unknown error",
              });
            } else {
              setLoadError(error);
              console.log(loadError);
              setShowLoadError(true);
              clearLocalStorage();
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

  // useEffect(() => {
  //   if(loadingAPI){
  //     async function getAPILoadProgress() {
  //       const progress = await axios
  //         .get("process.env.REACT_APP_API_URL}/v1/lvh/_loadprogress")
  //         .then((res) => setAPILoadProgress(res.data.progress));
  //         console.log(progress);
  //     }

  //     getAPILoadProgress();
  //     const interval = setInterval(() => getAPILoadProgress(), 2500);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [loadingAPI]);

  useEffect(() => {
    if (localStorage.getItem(`${searchText}_main`) === null) {
      if (searchText != "" && searchText != null) {
        localStorage.setItem(`${searchText}_main`, JSON.stringify(mainData));
        setMainDataLoaded(true);
      }
    } else {
      console.log("set false 2");
      setMainDataLoaded(true);
    }
  }, [mainData]);

  useEffect(() => {
    if (localStorage.getItem(`${searchText}_profile`) === null) {
      if (searchText != "" && searchText != null) {
        localStorage.setItem(
          `${searchText}_profile`,
          JSON.stringify(profileData)
        );
        setProfileDataLoaded(true);
      }
    } else {
      setProfileDataLoaded(true);
    }
  }, [profileData]);

  useEffect(() => {
    if (mainDataLoaded || profileDataLoaded) {
      setLoaded(true);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, [mainDataLoaded, profileDataLoaded]);

  const handleUserForget = () => {
    setSearchText("");
  };

  const HomeComponent = () => {
    if (loading || !userAcquired) {
      return (
        <>
          <HomeSearchPage
            handleInputFromMainSearch={(value) =>
              handleInputFromMainSearch(value)
            }
            error={loadError}
            showError={mainDataError && profileDataError}     //show error only if both api fails
            loading={loading}
            userAcquired={userAcquired}
            loaded={loaded}
            progress={apiLoadProgress}
          />
          <Snackbar
            open={showSnackMessage}
            autoHideDuration={6000}
            message={snackMessage}
          />
        </>
      );
    } else {
      if (loaded) {
        return (
          <HomeLoaded
            // handleInputFromMainSearch={handleInputFromMainSearch}
            lvhAnimeArray={mainData}
            profileData={profileData}
          />
        );
      }
    }
  };
  return (
    <>
      <CssBaseline />
      <Helmet>
        <title>Aniview - Home</title>
        <meta
          name="description"
          content="Aniview is a MyAnimeList.net companion which fetches and shows your MAL anime stats and curated recommendations."
        ></meta>
        <link rel="canonical" href="/home" />
      </Helmet>
      <Box sx={{ display: "flex" }}>
        <HomeComponent />
      </Box>
      <Footer />
    </>
  );
};

export default HomeMain;
