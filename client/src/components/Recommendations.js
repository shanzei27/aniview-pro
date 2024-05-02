import React from 'react'
import RecommendItem from './Recommendations/RecommendAnimeItem'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    width: "calc(80vw - 240px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

const Recommendations = (props) => {
  return (
    <>
     <Grid container spacing={2}>
        {props.data.r1 != undefined &&
          props.data.r1.map((animeItem, i) => {
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
                <RecommendItem data={ animeItem }/>
                </Item>
              </Grid>
            );
          })}
      </Grid>
        
    </>
  )
}

export default Recommendations