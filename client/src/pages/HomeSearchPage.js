import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import PulseLoader from "react-spinners/PulseLoader";
import { light } from '@mui/material/styles/createPalette';

const Search = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.mode === "light" ? alpha(theme.palette.common.black, 0.2) : alpha(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: theme.palette.mode === "light" ? alpha(theme.palette.common.black, 0.25) : alpha(theme.palette.common.white, 0.3),
    },
    width: "100%",
    [theme.breakpoints.up('sm')]: {
     
    },
  }));

const StyledTextField = styled(TextField)(({ theme }) => ({
      transition: theme.transitions.create('width'),
      width: `calc(100% - ${theme.spacing(5)})`,
  }));
    
    const StyledGrid = styled(Grid)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }));

    const Item = styled(Box)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%"
      }));
      
    const StyledPaper = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        borderRadius: 10,
        width: "60%",
        display: 'flex',
        direction: "column",
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        [theme.breakpoints.down('md')]: {
          width: "100%",
        },
    }));

    const LoadingText = styled(Typography)(({ theme }) => ({
      color: 'white',
      fontSize: '16px',
      marginTop: '15px'
    }));

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));
    
    const SelectionLabel = styled(Typography)(({ theme }) => ({
      color: 'white',
      fontSize: '14px',
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    }));
    
    const TimeEstimateText = styled(Typography)(({ theme }) => ({
      fontSize: '14px',
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    }));

const HomeSearchPage = (props) => {
    const [barText, setBarText] = useState("");
    const [errorBannerHeight, setErrorBannerHeight] = useState(0);
    const errorRef = React.useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
        props.handleInputFromMainSearch(barText);
    }

    useEffect( () => {
      if(props.showError){
        setErrorBannerHeight("100%")
      } else {
        setTimeout(() => {
          setErrorBannerHeight(0);
        }, "1000");
      }
    }, [props.showError]);

  return (
    <>
    <CssBaseline/>

    <StyledGrid container spacing={{xs: 0, md: 2, lg: 4}}>
        {props.loading &&
        <Grid item xs={10}>
          <Item>
            <PulseLoader color="#36d7b7" />
            <LoadingText>This will take a few seconds</LoadingText>
          </Item>
        </Grid>
        }       
         {!props.loading &&
              <Grid item xs={12} sm={10}>
                    <Item>
                      <Typography variant='lead'>Enter MyAnimeList username</Typography>  
                    </Item>
                    <Item><Typography variant='body1'>Aniview Pro is a MyAnimeList.net companion which fetches and shows your anime stats and recommendations.</Typography></Item>
        
                    <Item>
                            <Search ref={errorRef}  
                              component="form"
                              onSubmit={submitHandler}    
                              sx={{
                              width: {xs: "100%", md: "60%"}
                              }}>              
                                <StyledTextField
                                placeholder="MAL username to load…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={props.searchText}
                                sx={{
                                  "& fieldset": { border: 'none' },
                                }}
                                onChange={(e) => {
                                    setBarText(e.target.value);
                                }}
                                variant="outlined"
                                />
                                <IconButton 
                                type="submit"
                                variant="contained"
                            >
                            <SearchIcon sx={{height: "100%", color: 'white'}}/>
                            </IconButton>
                            </Search>
                        <Grow in={props.showError} container={errorRef.current}>
                          <Alert style={{width: "40%", height: errorBannerHeight, transition: `max-height 0.5s ease-out`, maxHeight: errorBannerHeight }} severity="error">
                            {props.error.message}. Please try later.
                          </Alert>
                        </Grow>
                    </Item>
              </Grid>
        }
      </StyledGrid>

    </>
  )
}

export default HomeSearchPage