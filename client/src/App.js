import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

//pages
import Home from './pages/Home.js';
import About from './pages/About.js';
import AppbarMain from './components/Appbar.js';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1800,
    },
  },
  palette: {
    background: {
      default: "#282c34"
    },
    primary: {
      main: "#315E8B",
      dark: '#002884',
      contrastText: "#fff"
    },
    secondary: {
      main: "#5aa2a2",
    },
    positive: {
      main: green[800],
    },
    text: {
      primary: "#ffffff"
    }
  },
  typography: {
    h1: {
      fontSize: 36,
      fontWeight: 800,
    },
    h5: {
      padding: 4,
      color: "#000",
      fontSize: 16,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontStyle: 'bold',
      fontSize: 16,
      fontWeight: 600,
    },
    fontFamily: "Roboto",
    color: '#fff'
  },
  color: '#fff'
});

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <ThemeProvider theme={theme}>
      <AppbarMain />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </main>
      </ThemeProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
