import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppbarMain from '../components/Appbar';

const Heading = styled(Typography)(({ theme }) => ({
  
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'left',
  width: "100%"
}));

const Feedback = () => {
  return (
    <>
      <CssBaseline/>
      <AppbarMain />
      <StyledGrid container spacing={2}>
        <Grid item xs={11} sx={{width: '100%'}}>
          <Item>
            <Heading variant='h1'>Feedback</Heading>
            <Typography variant='body2' sx={{textAlign: 'left', paddingTop: 1}}>
              Please fill the form with your feedback.
            </Typography>
          </Item>
        </Grid>
      </StyledGrid>
    </>
  )
}

export default Feedback