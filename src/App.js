import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboardpage from './pages/Dashboardpage';
import  CoinPage from './pages/Coin';
import ComparePage from './pages/ComparePage';
import Watchlist from './pages/WatchList';





function App() {
  return (
    <div className="App">
    <Routes>
       <Route path="/" element={<Homepage/>} />
      <Route path="/Dashboard" element={<Dashboardpage/>} />
      <Route path="/coin/:id" element={< CoinPage/>} />
      <Route path="/Compare" element={<ComparePage/>} /> 
      <Route path="/Watchlist" element={<Watchlist />} />
    </Routes>
    </div>
  );
}

export default App;
