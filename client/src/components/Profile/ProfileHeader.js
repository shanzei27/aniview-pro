import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Grid, Typography, dividerClasses } from "@mui/material";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import CardMedia from "@mui/material/CardMedia";
import { openInNewTab } from "../../utils/utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GradeIcon from "@mui/icons-material/Grade";
import Fade from "@mui/material/Fade";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BodyContainerTop = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "center",
  width: "100%",
  height: "240px",
  backgroundColor: theme.palette.mode === "dark" ? "#53565c" : "darkgrey",
}));

const BarAnimeName = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  overflow: "hidden",
  color: "#fff",
}));

const BarAnimeScore = styled(Typography)(({ theme }) => ({
  textAlign: "right",
  color: "#fff",
}));

const StatContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  width: "180px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "60px",
  backgroundColor: theme.palette.secondary.main,
  marginLeft: theme.spacing(1),
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

const ProgressLine = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  width: "100%",
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
  backgroundColor: "#2c3495",
  [`& .${linearProgressClasses.bar}`]: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    background: `linear-gradient(to right, #007adf 0%, #00ecbc 100%);`,
  },
}));

const ProfileHeader = ({ pageData }) => {
  //debugger
  const [checked, setChecked] = useState(false); //fade animation

  useEffect(() => {
    setChecked(true);
  }, []);

  const userImage = (
    <Link
      onClick={() =>
        openInNewTab(`https://myanimelist.net/profile/${pageData.username}`)
      }
    >
      <CardMedia
        component="img"
        style={{
          display: "block",
          height: "25%",
          cursor: "pointer",
        }}
        image={pageData.image_url}
        alt={pageData.username}
      />
    </Link>
  );

  return (
    <>
      <Fade in={checked}>
        <StyledGrid container spacing={2}>
          <Grid item xs={10}>
            <Grid
              container
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                marginBottom: "10px",
              }}
            >
              <Grid
                item
                sm={10}
                md={6}
                style={{
                  display: "flex",
                  width: "fit-content",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Link
                  sx={{ textDecoration: "none" }}
                  onClick={() =>
                    openInNewTab(
                      `https://myanimelist.net/profile/${pageData.username}`
                    )
                  }
                >
                  <Box
                    style={{
                      height: "80px",
                      display: "flex",
                      width: "20%",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h2" sx={{ cursor: "pointer" }}>
                      {pageData.username}
                    </Typography>
                    <LaunchIcon
                      sx={{ marginTop: 1, marginLeft: 1, cursor: "pointer" }}
                    />
                  </Box>
                </Link>
              </Grid>
              <Grid
                item
                sm={10}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: { sm: "flex-start", md: "flex-end" },
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Tooltip title="Total animes completed">
                    <StatContainer>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <CheckCircleOutlineIcon />{" "}
                        <Typography variant="body1" sx={{ color: "#fff" }}>
                          Total completed:
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        {pageData.top_row["num_completed"]}
                      </Typography>
                    </StatContainer>
                  </Tooltip>
                  <Tooltip
                    title={(() =>
                      (pageData.top_row["days_watched"] * 24).toFixed(2) +
                      " hours")()}
                  >
                    <StatContainer>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <AccessTimeIcon />{" "}
                        <Typography variant="body1" sx={{ color: "#fff" }}>
                          Total watchtime:
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        {pageData.top_row["days_watched"]} days
                      </Typography>
                    </StatContainer>
                  </Tooltip>
                  <Tooltip title="Your MAL mean score">
                    <StatContainer>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <GradeIcon />{" "}
                        <Typography variant="body1" sx={{ color: "#fff" }}>
                          Mean score:
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        {pageData.top_row["mean_score"]}
                      </Typography>
                    </StatContainer>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                height: "100%",
              }}
            >
              <Grid
                item
                md={12}
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                }}
              >
                <BodyContainerTop variant="outlined">
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "10px",
                      width: "100%",
                    }}
                  >
                    {pageData.recent_activity.map((item) => (
                      <Box
                        key={item.name}
                        sx={{
                          width: { sm: "100%", md: "50%" },
                          height: "45px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          textAlign: "left",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "25px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <BarAnimeName variant="caption">
                            {item.name}{" "}
                          </BarAnimeName>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              borderTopLeftRadius: 8,
                              justifyContent: "flex-end",
                              width: "10%",
                              backgroundColor: "#2c3495",
                              paddingRight: "4px",
                            }}
                          >
                            {" "}
                            <Tooltip title="Episode progress">
                              <BarAnimeScore variant="caption">
                                ({item.progress}/
                                {item.total_episodes === 0
                                  ? "?"
                                  : item.total_episodes}
                                )
                              </BarAnimeScore>{" "}
                            </Tooltip>
                          </Box>
                        </Box>
                        <ProgressLine
                          variant="determinate"
                          value={(item.progress / item.total_episodes) * 100}
                        />
                      </Box>
                    ))}
                  </Box>
                </BodyContainerTop>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            {userImage}
          </Grid>
        </StyledGrid>
      </Fade>
    </>
  );
};

export default ProfileHeader;
