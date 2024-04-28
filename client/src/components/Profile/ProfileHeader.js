import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Grid, Typography, dividerClasses } from "@mui/material";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia";
import { openInNewTab } from "../../utils/utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GradeIcon from "@mui/icons-material/Grade";
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

const StatContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  width: "180px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "60px",
  backgroundColor: "#121212",
  marginLeft: theme.spacing(1),
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "84vw",
}));

const ProgressLine = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  width: "100%",
  borderRadius: 5,
  backgroundColor: "#2c3495", //521f95
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: `linear-gradient(to right, #007adf 0%, #00ecbc 100%);`,
  },
}));

const ProfileHeader = ({ pageData }) => {
  const userImage = (
    <Link onClick={() => openInNewTab(pageData.profile_url)}>
      <CardMedia
        component="img"
        style={{ display: "block", height: `min(20vw, 100%)`, cursor: "pointer" }}
        image={pageData.image_url}
        alt={pageData.username}
      />
    </Link>
  );

  return (
    <>
      <StyledGrid container spacing={2} alignItems="stretch">
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",

          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "62vw",
              height: "100%",
            }}
          >
            <Box
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box style={{ height: "80px" }}>
                <Typography variant="h2">{pageData.username}</Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <StatContainer
                  style={{
                    backgroundColor: "#5aa2a2",
                  }}
                >
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
                <StatContainer
                  style={{
                    backgroundColor: "#5aa2a2",
                  }}
                >
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
                    {pageData.top_row["days_watched"]}
                  </Typography>
                </StatContainer>
                <StatContainer
                  style={{
                    backgroundColor: "#5aa2a2",
                  }}
                >
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
              </Box>
            </Box>
            <BodyContainerTop variant="outlined">
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  width: "50%",
                }}
              >
                {pageData.recent_activity.map((item) => (
                  <Box
                    sx={{
                      width: "100%",
                      height: "45px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "left",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      <b>{item.name}</b> ({item.progress}/{item.total_episodes})
                    </Typography>
                    <ProgressLine
                      variant="determinate"
                      value={(item.progress / item.total_episodes) * 100}
                    />
                  </Box>
                ))}
              </Box>
            </BodyContainerTop>
          </Grid>
          <Grid sx={{margin: 'auto'}} >{userImage}</Grid>
        </Box>
      </StyledGrid>
    </>
  );
};

export default ProfileHeader;
