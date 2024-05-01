import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

//pages
import HomeMain from './pages/HomeMain.js';
import About from './pages/About.js';
import Feedback from './pages/Feedback.js';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#282c34",
    },
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#00989B",
    },
    positive: {
      main: green[800],
    },
  },
  typography: {
    lead: {
      fontSize: 48,
      fontWeight: 600,
    },
    h1: {
      fontSize: 36,
      fontWeight: 600,
    },
    h2: {
  
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
    body1Dark: {
      fontWeight: 600,
      color: "#000",
    },
    body2: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'bold',
      fontSize: 16,
      fontWeight: 600,
    },
  },

});

const lightTheme = createTheme({
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
    mode: 'light',
    background: {
      default: "#fff",
      dark: "#282c34"
    },
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#00989B",
    },
    positive: {
      main: green[800],
    },
    text: {
     // primary: "#ffffff",     ???
      dark: "#000"
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
    h2: {

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
    body1Dark: {
      fontWeight: 600,
      color: "#000",
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
  },
});

function App() {
  const [light, setLight] = useState(false);

  const handleLightModeChange = (value) => {
    setLight(prevMode => !prevMode);
  }

  return (
    <BrowserRouter>
    <div className='App'>
      <ThemeProvider theme={light ? lightTheme : darkTheme}>      
      <main>
        <Routes>
          <Route path="/" element={<HomeMain handleLightModeChange={(value) => handleLightModeChange()}/>} />
          <Route path="/home" element={<HomeMain handleLightModeChange={(value) => handleLightModeChange()}/>} />
          <Route path="/about" element={<About handleLightModeChange={(value) => handleLightModeChange()}/>} />
          <Route path="/feedback" element={<Feedback handleLightModeChange={(value) => handleLightModeChange()}/>} />
        </Routes>
      </main>
      </ThemeProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
