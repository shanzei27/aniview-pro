import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import { openInNewTab } from '../utils/utils';

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

  const BodyContainerTop = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'left',
    width: "40vw",
    height: "35vh",
    backgroundColor: "#53565c"
  }));

const Profile = (props) => {
  const [pageData, setPageData] = useState({...props.data});
  const [paginatedData, setPaginatedData] = useState([]);


  const userImage = (
    <Link onClick={() => openInNewTab(pageData.profile_url)}>
    <CardMedia
      component="img"
      sx={{ width: "45vh", cursor:'pointer' }}
      image={pageData.image_url}
      alt={pageData.username}
    />
   </Link>
)

  return (
   <>
   <StyledGrid container spacing={2}>
        <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <Box style={{ height: '10vh'}}>
                <Typography variant='h2'>{pageData.username}</Typography>
            </Box>
            <BodyContainerTop>
                <Box style={{display: 'flex', justifyContent:'space-between', padding: '10px', width: '100%'}}>
                   <Typography variant='body1'>Total completed: {pageData.top_row["total_completed"]}</Typography>
                   <Typography variant='body1'>Total watchtime: {pageData.top_row["total_watchtime"]}</Typography>
                   <Typography variant='body1'>Total completed: {pageData.top_row["mean_score"]}</Typography>
                </Box>
            </BodyContainerTop>
        </Grid>
        <Grid style={{ marginLeft: 'auto' }}>
            {userImage}
        </Grid>
    </StyledGrid>
   </>
  )
}

export default Profile