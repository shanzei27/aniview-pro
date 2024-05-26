import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LikeVsHateItem from "./LikeVsHateItem";
import { styled } from "@mui/material/styles";
import AppPagination from "../pagination";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  width: "calc(80vw - 240px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const LikeVsHateRow = (props) => {
  const [pageData, setPageData] = useState([...props.data["data"]]);
  const [paginatedData, setPaginatedData] = useState([]);

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: {xs: "100%", sm: "70vh"},
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={2}>
            {pageData != undefined &&
              paginatedData.map((animeItem, i) => {
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
                      <LikeVsHateItem data={animeItem} type={props.type} />
                    </Item>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <AppPagination
            data={props.data}
            setPageData={(d) => setPaginatedData(d)}
            getData={props.getData}
          />
        </Box>
      </Box>
    </>
  );
};

export default LikeVsHateRow;
