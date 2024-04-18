import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppbarMain from '../components/Appbar';
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

const FormStyledContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'left',
}));

const Feedback = (props) => {
  return (
    <>
      <CssBaseline/>
      <AppbarMain handleLightModeChange={(value) => props.handleLightModeChange(value)}/>
      <StyledGrid container spacing={2}>
        <Grid item xs={11} sx={{width: '100%'}}>
          <Item>
            <Heading variant='h1'>Feedback</Heading>
            <Typography variant='body2' sx={{textAlign: 'left', paddingTop: 1}}>
              Please fill the form with your feedback.
            </Typography>
              <FormStyledContainer elevation={3}>
              <Box sx={{ padding: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700
                    }}
                  >
                    Name
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: 700
                    }}
                  >
                    Message
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    required
                    id="outlined-multiline-static"
                    label="Your message..."
                    multiline
                    fullWidth
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
              </Box>
            </FormStyledContainer>
          </Item>
        </Grid>
      </StyledGrid>
    </>
  )
}

export default Feedback