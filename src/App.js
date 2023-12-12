// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Accounts from './pages/Accounts';
import NoPage from './pages/NoPage';

function App() {
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
      <div>App</div>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="stats" element={ <Stats/>} />
        <Route path="accounts" element={ <Accounts/> } />
        <Route path="*" element={ <NoPage/> } />
      </Routes>
    </div>
  );
}

export default App;
