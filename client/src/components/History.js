import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  width: "calc(80vw - 240px)",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "100%",
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "left",
  width: "100%",
}));

const History = (props) => {
  const [pageData, setPageData] = useState([...props.data]);

  const valueFormatter = (value) => `${value}hrs (${(value/24).toFixed(2)} days)`;
  const chartSetting = {
    yAxis: [
      {
        label: "Hours watched",
      },
    ],
    series: [
      { dataKey: "hours_watched", label: "Hours watched", valueFormatter },
    ],
    height: 350,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-16px)",
      },
      [`& .${axisClasses.directionY}`]: {
        transform: "translateX(55px)",
      },
    },
  };

  return (
    <>
      <StyledGrid container spacing={2}>
        <Grid item xs={12}>
          <ChartContainer sx={{whiteSpace: 'pre'}}>
            <BarChart
              dataset={pageData}
              yAxis={[{ dataKey: "hours_watched" }]}
              xAxis={[{ scaleType: "band", dataKey: "year" }]}
              {...chartSetting}
            />
          </ChartContainer>
        </Grid>
        <Grid style={{ marginLeft: "auto" }}></Grid>
      </StyledGrid>
    </>
  );
};

export default History;
