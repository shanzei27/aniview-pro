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
  
  }));

const History = (props) => {
  const [pageData, setPageData] = useState([...props.data]);

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