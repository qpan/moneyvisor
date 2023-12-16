// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import {
  values
} from 'lodash';
import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { routeMaps } from './routes';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Accounts from './pages/Accounts';
import NoPage from './pages/NoPage';
import {
  Grid,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Divider
} from '@mui/material';
import { MenuBook, Insights, Work } from '@mui/icons-material';

function App() {
  const routeLists = values(routeMaps);
  const location = useLocation();
  const [value, setValue] = React.useState(routeLists.indexOf(location.pathname));
  const navigate = useNavigate();

  return (
    <div className='App'>
      <Grid align="center">
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              navigate(routeLists[newValue]);
            }}
          >
            <BottomNavigationAction label="Transactions" icon={<MenuBook />} />
            <BottomNavigationAction label="Stats" icon={<Insights />} />
            <BottomNavigationAction label="Accounts" icon={<Work />} />
          </BottomNavigation>
        </Box>
      </Grid>
      <Divider light />
      <main>
        <Routes>
          <Route path={routeMaps.home} element={ <Home/> } />
          <Route path={routeMaps.stats} element={ <Stats/>} />
          <Route path={routeMaps.accounts} element={ <Accounts/> } />
          <Route path="*" element={ <NoPage/> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
