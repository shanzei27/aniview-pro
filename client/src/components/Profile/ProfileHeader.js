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

const BodyContainerTop = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "left",
  width: "100%",
  height: "240px",
  backgroundColor: theme.palette.mode === "dark" ? "#53565c" : "darkgrey",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "100%",
  height: "100%",
}));

const ProfileHeader = ({ pageData }) => {
  const userImage = (
    <Link onClick={() => openInNewTab(pageData.profile_url)}>
      <CardMedia
        component="img"
        sx={{ height: "320px", cursor: "pointer" }}
        image={pageData.image_url}
        alt={pageData.username}
      />
    </Link>
  );

  return (
    <>
      <StyledGrid container spacing={2}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "50%",
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
                width: "55%"
              }}
            >
              <Box
                style={{
                  display: "flex",
                }}
              >
                <CheckCircleOutlineIcon />{" "}
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  Total completed: {pageData.top_row["total_completed"]}
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                }}
              >
                <AccessTimeIcon />{" "}
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  Total watchtime: {pageData.top_row["total_watchtime"]}
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                }}
              >
                {" "}
                <GradeIcon />
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  Total completed: {pageData.top_row["mean_score"]}
                </Typography>
              </Box>
            </Box></Box>
          <BodyContainerTop>

            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                width: "100%",
              }}
            ></Box>
          </BodyContainerTop>
        </Grid>
        <Grid style={{ marginLeft: "auto" }}>{userImage}</Grid>
      </StyledGrid>
    </>
  );
};

export default ProfileHeader;
