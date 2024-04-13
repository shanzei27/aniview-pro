import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

const Search = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

const StyledTextField = styled(TextField)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(2, 2, 2, 0),
      // vertical padding + font size from searchIcon
      paddingRight: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },}));
    
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
      
const HomeSearchPage = (props) => {
    const [barText, setBarText] = React.useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        props.handleSearchTextChange(barText);
    }

  return (
    <>
    <CssBaseline/>

    <StyledGrid container spacing={5}>
            <Grid item xs={12}>
            <Item><Typography variant='h1'>Enter MAL Username to search</Typography></Item>
            </Grid>
            <Grid item xs={12} style={{paddingLeft: 0, paddingRight: 0}}>
            <Item style={{width: '100%', height: "100%"}}>
                <form onSubmit={submitHandler}>
                    <Search>
                        <StyledTextField
                        placeholder="Search and load profile…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={props.searchText}
                        onChange={(e) => {
                            setBarText(e.target.value);
                        }}
                        variant="outlined"
                        />
                        <IconButton  sx={{width: '10%', height: "100%"}}
                        type="submit"
                        variant="contained"
                    >
                        <SearchIcon sx={{height: "100%"}}/>
                    </IconButton>
                    </Search>
                </form>
            </Item>
            </Grid>
      </StyledGrid>

    </>
  )
}

export default HomeSearchPage