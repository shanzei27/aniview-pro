import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import textUtils from "../utils/textUtils";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { config } from "../config/config";
import Tooltip from "@mui/material/Tooltip";

const Heading = styled(Typography)(({ theme }) => ({}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  width: "fit-content",
  height: "45px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    background: theme.palette.primary.light,
  },
}));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "left",
  width: "100%",
}));

const About = (props) => {
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <StyledGrid container spacing={2}>
        <Grid item xs={11} sx={{ width: "100%" }}>
          <Item>
            <Heading variant="h1">About</Heading>
            <Typography
              variant="body2"
              sx={{ textAlign: "left", paddingTop: 1 }}
            >
              {textUtils.about}
            </Typography>
          </Item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Github repository of the site">
              <StyledButton
                href="https://github.com/shanzei27/aniview-pro"
                variant="body2"
                underline="none"
              >
                <GitHubIcon />
                <Typography>{"\u00A0"}Github</Typography>
              </StyledButton>
            </Tooltip>
            <Tooltip title="Jikan API for MAL">
              <StyledButton
                href="https://jikan.moe/"
                variant="body2"
                underline="none"
              >
                <Box
                  component="img"
                  sx={{
                    height: 20,
                    width: 20,
                  }}
                  alt="Jikan"
                  src="https://jikan.moe/assets/images/logo/jikan.logo.png"
                />
                <Typography>{"\u00A0"}Jikan API</Typography>
              </StyledButton>
            </Tooltip>
          </Box>
          <Item>
            <Heading variant="h1">Privacy policy</Heading>
            <Typography
              variant="body2"
              sx={{ textAlign: "left", paddingTop: 1 }}
            >
              {textUtils.privacy}
            </Typography>
          </Item>
          <Item>
            <Heading variant="h1">Contact</Heading>
            <Typography
              variant="body2"
              sx={{ textAlign: "left", paddingTop: 1 }}
            >
              Email: aniview [at] shanjei.com
            </Typography>
          </Item>
        </Grid>
      </StyledGrid>
    </>
  );
};

export default About;
