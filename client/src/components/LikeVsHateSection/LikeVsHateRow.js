import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LikeVsHateItem from './LikeVsHateItem'
import { styled } from '@mui/material/styles';
import AppPagination from '../pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  width: 'calc(80vw - 240px)',
}));

const LikeVsHateRow = (props) => {
  const [pageData, setPageData] = useState([...props.data["data"]]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [sort, setSort] = React.useState('A-B');
  const theme = useTheme

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
   <>
  <Grid container justifyContent="flex-end">
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={sort}
            defaultValue={'A-B'}
            onChange={handleChange}
          >
            <MenuItem value={10}>A-B</MenuItem>
            <MenuItem value={20}>Diff</MenuItem>
          </Select>
        </FormControl>
        </Grid>
   <Grid container spacing={2}>
   
        {pageData != undefined &&
          
          paginatedData.map((animeItem, i) => {
            //console.log(animeItem)
              return (
                <Grid item xs={12} sm={10} md={4} xl={3} key={i}>
                  <Item key={i}><LikeVsHateItem data = {animeItem} type={props.type}/></Item>
                </Grid>
              )
            })
        }
    </Grid>
    <Box sx={{display:'flex', direction: 'column', justifyContent: 'center', width: `calc(100vw - 240` }}>
      <AppPagination data={props.data} setPageData={(d) => setPaginatedData(d)} getData={props.getData}/>
    </Box>
   </>
  )
}

export default LikeVsHateRow