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

const Search = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
    const [fetchTimeEstimate,setFetchTimeEstimate] = useState(1.5);
    const [showSelectionWarning, setShowSelectionWarning] = useState(false);
    const [chipSelection, setChipSelection] = useState({
        "lvh": true,
        "recommendations": true,
        "history": true,
    });
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Recommendations', type: 'recommendations' },
        { key: 1, label: 'Likes & Hate vs Others', type: 'lvh'  },
        { key: 2, label: 'Historic stats', type: 'history'  },
      ]);
    const warningRef = React.useRef(null);
    const errorRef = React.useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
        if(Object.values(chipSelection).some(val => val)){
          props.handleInputFromMainSearch(barText, chipSelection);
        } else {
          setShowSelectionWarning(true);
        }
    }

    const handleOptionSelectChange = (type) => () => {
        const bool = !chipSelection[type];
        const newObj = {...chipSelection};
        newObj[type] = bool;
        setChipSelection({...newObj});
        setShowSelectionWarning(false);
    };

    const calculateTimeEstimate = () => {
      let timeEst = 0;
      if(chipSelection["recommendations"]){
        timeEst += 20;
      }
      if(chipSelection["lvh"]){
        timeEst += 60;
      }
      if(chipSelection["history"]){
        timeEst += 20;
      }
      timeEst = (timeEst/60).toFixed(2);
      setFetchTimeEstimate(timeEst);
    }

    useEffect( () => {
      calculateTimeEstimate();
    }, [chipSelection]);

    useEffect( () => {
      if(props.showError){
        setErrorBannerHeight("100%")
      } else {
        setTimeout(() => {
          setErrorBannerHeight(0);
          console.log("height: "+errorBannerHeight)
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
            <LoadingText>This might take about a minute (for a list with 100 titles)</LoadingText>
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
                        <form className="main-search-form" onSubmit={submitHandler} 
                              sx={{
                              width: {xs: "100%", md: "70%"}
                              }}
                        >
                            <Search ref={errorRef}>
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
                        </form>
                        <Grow in={props.showError} container={errorRef.current}>
                          <Alert style={{width: "40%", height: errorBannerHeight, transition: `max-height 0.5s ease-out`, maxHeight: errorBannerHeight }} severity="error">
                            {props.error.message}. Please try later.
                          </Alert>
                        </Grow>
                    </Item>
                    <Item>
                    <StyledPaper component="ul" ref={warningRef}>
                      {/* <Box sx={{display:'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}> */}
                        <SelectionLabel>Selected outputs:</SelectionLabel>
                        {chipData.map((data) => {
                            return (
                            <ListItem key={data.key}>
                                <Chip
                                label={data.label}
                                variant='filled'
                              //  color={chipSelection[data.type] ? {"success"} }
                                
                                style={ chipSelection[data.type] ? { backgroundColor:'#333366' } : {}}
                                onClick ={ handleOptionSelectChange(data.type)}
                                />
                            </ListItem>
                            );
                        })}
                        {/* </Box> */}
                        <Box sx={{display:'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        {fetchTimeEstimate > 0 &&
                          <TimeEstimateText>Estimated process time: {fetchTimeEstimate} minutes</TimeEstimateText>
                        }
                     </Box>
                    </StyledPaper>
                      <Slide in={showSelectionWarning} container={warningRef.current}>
                        <Alert sx={{width: "60%"}} severity="warning" variant="filled">Please select at least one to continue.</Alert>
                      </Slide>
                    </Item>
              </Grid>
        }
      </StyledGrid>

    </>
  )
}

export default HomeSearchPage