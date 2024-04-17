import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: 'calc(80vw - 240px)',
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  }));

  const ChartContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'left',
    width: "100%",
    backgroundColor: "#fff"
  }));

const History = (props) => {
  const [pageData, setPageData] = useState([...props.data]);
  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: 'Jan',
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: 'Fev',
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: 'Mar',
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: 'Apr',
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: 'May',
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      seoul: 144,
      month: 'June',
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      seoul: 319,
      month: 'July',
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      seoul: 249,
      month: 'Aug',
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      seoul: 131,
      month: 'Sept',
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      seoul: 55,
      month: 'Oct',
    },
    {
      london: 67,
      paris: 64,
      newYork: 76,
      seoul: 48,
      month: 'Nov',
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      seoul: 25,
      month: 'Dec',
    },
  ];

  const valueFormatter = (value) => `${value}mm`;
  const chartSetting = {
    yAxis: [
      {
        label: 'Hours watched',
      },
    ],
    series: [{ dataKey: 'hours_watched', label: 'Hours watched', valueFormatter }],
    height: 350,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-16px)',
      },
      [`& .${axisClasses.directionY}`]: {
        transform: 'translateX(55px)',
      },
    },
  };

  return (
   <>  
   <ChartContainer>
    <BarChart
                  dataset={pageData}
                  yAxis={[
                    {dataKey: 'hours_watched'}
                  ]}
                  xAxis={[
                    { scaleType: 'band', dataKey: 'year' },
                  ]}
                  {...chartSetting}
            />
    </ChartContainer>
   {/* <StyledGrid container spacing={2}>
        <Grid>
          
        </Grid>
        <Grid style={{ marginLeft: 'auto' }}>
           
        </Grid>
    </StyledGrid> */}
   </>
  )
}

export default History