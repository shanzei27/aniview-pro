import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

//pages
import HomeMain from './pages/HomeMain.js';
import About from './pages/About.js';
import Feedback from './pages/Feedback.js';

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
      dark: '#333366',
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
    lead: {
      fontSize: 48,
      fontWeight: 600,
    },
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
      fontWeight: 600,
    },
    body2: {
      fontWeight: 500,
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
      <main>
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/home" element={<HomeMain />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>
      </ThemeProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
