import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Grow from "@mui/material/Grow";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { config } from "../../config/config";

const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: 10,
  display: "flex",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.common.black, 0.2)
      : alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.common.black, 0.25)
        : alpha(theme.palette.common.white, 0.3),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {},
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  transition: theme.transitions.create("width"),
  width: `calc(100% - ${theme.spacing(5)})`,
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "85vh",
  backgroundColor: "#315E8B",
  backgroundImage: `radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,152,155,1) 0.1%, rgba(0,94,120,1) 94.2% )`,
}));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const LoadingText = styled(Typography)(({ theme }) => ({
  color: "white",
  fontSize: "16px",
  marginTop: "15px",
}));

const getRandomCoverImage = () => {
  return config["cover_images"][
    Math.floor(Math.random() * config["cover_images"].length)
  ];
};

const HomeSearchPage = (props) => {
  const [coverImage, setCoverImage] = useState("");
  const [barText, setBarText] = useState("");
  const [errorBannerHeight, setErrorBannerHeight] = useState(0);
  const errorRef = React.useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    props.handleInputFromMainSearch(barText);
  };

  useEffect(() => {
    setCoverImage(getRandomCoverImage());
  }, []);

  useEffect(() => {
    if (props.showError) {
      setErrorBannerHeight("fit-content");
    } else {
      setTimeout(() => {
        setErrorBannerHeight(0);
      }, "1000");
    }
  }, [props.showError]);

  return (
    <>
      <CssBaseline />

      {!props.loaded && props.loading && (
        <StyledGrid container spacing={{ xs: 0, md: 2, lg: 4 }}>
          <Grid item xs={10}>
            <Item>
              {/* <Loader color="#36d7b7" /> */}
              <Box sx={{ width: "50%" }}>
                <LinearProgress
                  color="secondary"
                  variant="determinate"
                  value={props.progress}
                />
              </Box>
              <LoadingText>This will take a minute</LoadingText>
            </Item>
          </Grid>
        </StyledGrid>
      )}

      {!props.loading && (
        <StyledGrid container spacing={{ xs: 0, md: 2, lg: 4 }}>
          <Grid
            sx={{ height: { xs: "50%", sm: "100%" }, width: "100%" }}
            item
            xs={12}
            sm={5.5}
          >
            <Item sx={{ marginTop: { xs: 5 } }}>
              <Typography variant="lead" sx={{ paddingBottom: 2 }}>
                Enter MyAnimeList username
              </Typography>
              <Typography variant="body1">
                Aniview is a MyAnimeList.net companion which fetches and shows
                your MAL anime stats and curated recommendations.
              </Typography>
            </Item>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderRightWidth: 2,
              boxShadow: "0 1em 0em -1em  #00ecbc",
              transform: `rotate(-8deg)`,
            }}
          />
          <Grid
            sx={{ height: { xs: "50%", sm: "100%" } }}
            item
            xs={12}
            sm={5.5}
          >
            <Item>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    position: "absolute",
                    objectFit: "cover",
                    height: "175px",
                    bottom: 55,
                    right: 0,
                    display: { xs: "none", sm: "block" },
                  }}
                  alt={coverImage}
                  src={coverImage}
                />
                <Search
                  ref={errorRef}
                  component="form"
                  onSubmit={submitHandler}
                  sx={{
                    width: { xs: "100%" },
                  }}
                >
                  <StyledTextField
                    placeholder="MAL username to load…"
                    inputProps={{ "aria-label": "search" }}
                    value={props.searchText}
                    sx={{
                      "& fieldset": { border: "none" },
                    }}
                    onChange={(e) => {
                      setBarText(e.target.value);
                    }}
                    variant="outlined"
                  />
                  <IconButton type="submit" variant="contained">
                    <SearchIcon sx={{ height: "100%", color: "white" }} />
                  </IconButton>
                </Search>
                <Grow in={props.showError} container={errorRef.current}>
                  <Alert
                    style={{
                      position: "absolute",
                      bottom: -75,
                      width: "40%",
                      height: errorBannerHeight,
                      transition: `max-height 0.5s ease-out`,
                      maxHeight: errorBannerHeight,
                    }}
                    severity="error"
                  >
                    {props.error.message}. Please try later.
                  </Alert>
                </Grow>
              </Box>
            </Item>
          </Grid>
        </StyledGrid>
      )}
    </>
  );
};

export default HomeSearchPage;
