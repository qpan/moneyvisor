// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import logo from './logo.svg';
import './App.css';

import React from 'react';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Accounts from './pages/Accounts';
import NoPage from './pages/NoPage';

import {
  Grid,
  Box,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import { MenuBook, Insights, Work } from '@mui/icons-material';


function App() {
  const routeMaps = [
    '/',
    '/stats',
    '/accounts'
  ];
  const location = useLocation();
  const [value, setValue] = React.useState(routeMaps.indexOf(location.pathname));
  const navigate = useNavigate();

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className='App'>
      <Grid align="center">
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              navigate(routeMaps[newValue]);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<MenuBook />} />
            <BottomNavigationAction label="Favorites" icon={<Insights />} />
            <BottomNavigationAction label="Nearby" icon={<Work />} />
          </BottomNavigation>
        </Box>
      </Grid>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/stats" element={ <Stats/>} />
        <Route path="/accounts" element={ <Accounts/> } />
        <Route path="*" element={ <NoPage/> } />
      </Routes>
    </div>
  );
}

export default App;
