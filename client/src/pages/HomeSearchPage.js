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
      
    const StyledPaper = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main
    }));

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

const HomeSearchPage = (props) => {
    const [barText, setBarText] = React.useState("");
    const [chipSelection, setChipSelection] = useState({
        "lvh": false,
        "recommendations": false,
        "history": false,
        "episodic": false
    })
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Likes & Hate vs Others', type: "lvh" },
        { key: 1, label: 'Recommendations', type: "recommendations"  },
        { key: 2, label: 'Historic stats', type: "history"  },
        { key: 3, label: 'Episode trends', type: "episodic"  },
      ]);

    const submitHandler = (e) => {
        e.preventDefault();
        props.handleSearchTextChange(barText);
    }

    const handleOptionSelectChange = (type) => () => {
        const bool = !chipSelection[type];
        const newObj = {...chipSelection};
        newObj[type] = bool;
        setChipSelection({...newObj});
            console.log(chipSelection);
    };

    const SelectionLabel = styled(Typography)(({ theme }) => ({
        color: 'white',
        fontSize: '14px',
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1),
      }));

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
            <StyledPaper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 1,
                    m: 0,
                }}
                component="ul"
                >
                <SelectionLabel>Output:</SelectionLabel>
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
            </StyledPaper>
      </StyledGrid>

    </>
  )
}

export default HomeSearchPage