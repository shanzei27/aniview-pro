import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LikeVsHateItem from './LikeVsHateItem'
import { styled } from '@mui/material/styles';
import AppPagination from '../pagination';

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: 'calc(80vw - 240px)',
}));

const LikeVsHateRow = (props) => {
  const [pageData, setPageData] = useState([...props.data["data"]]);
  console.log(pageData);
  return (
   <>
   <Grid container spacing={2}>
        {pageData != undefined &&
          
           pageData.map((animeItem, i) => {
            //console.log(animeItem)
              return (
                <Grid item xs={6} lg={4} xl={3} key={i}>
                  <Item key={i}><LikeVsHateItem data = {animeItem} type={props.type}/></Item>
                </Grid>
              )
            })
        }
    </Grid>
    <Box sx={{display:'flex', direction: 'column', justifyContent: 'center', width: `calc(100vw - 240` }}>
      <AppPagination data={props.data} setPageData={(d) => setPageData(d)} getData={props.getData}/>
    </Box>
   </>
  )
}

export default LikeVsHateRow