import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppbarMain from '../components/Appbar';
import textUtils from "../utils/textUtils";

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

const About = (props) => {
  return (
    <>
      <CssBaseline/>
      <AppbarMain handleLightModeChange={(value) => props.handleLightModeChange(value)}/>
      <StyledGrid container spacing={2}>
        <Grid item xs={11} sx={{width: '100%'}}>
          <Item>
            <Heading variant='h1'>About</Heading>
            <Typography variant='body2' sx={{textAlign: 'left', paddingTop: 1}}>
              {textUtils.about}
            </Typography>
          </Item>
          <Item>
            <Heading variant='h1'>Contact</Heading>
            <Typography variant='body2' sx={{textAlign: 'left', paddingTop: 1}}>
              Email: aniview [at] shanjei.com
            </Typography>
          </Item>
        </Grid>
      </StyledGrid>
    </>
  )
}

export default About