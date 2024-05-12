import React from "react";
import RecommendItem from "./Recommendations/RecommendAnimeItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  width: "calc(80vw - 240px)",
  display: "flex",
  alignItems: "left",
  justifyContent: "center",
}));

const HeadingContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  width: "calc(80vw - 240px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
}));

const Recommendations = (props) => {
  return (
    <>
      <Box>
        <HeadingContainer>
          <Typography variant="h3">Recommendations</Typography>
        </HeadingContainer>
        <Grid container spacing={2}>
          {props.data != undefined &&
            props.data.map((animeItem, i) => {
              //console.log(animeItem)
              return (
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  item
                  xs={12}
                  sm={10}
                  md={6}
                  lg={4}
                  xl={3}
                  key={i}
                >
                  <Item key={i}>
                    <RecommendItem data={animeItem} />
                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};

export default Recommendations;
