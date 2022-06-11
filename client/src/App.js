import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import CountryID from './components/CountryID/CountryID.jsx';
import Activity from './components/Activity/Activity.jsx';
import Main from './components/Main/Main.jsx';
import MsjError from './components/MsjError/MsjError';

function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Routes>
        <Route exact path='/' element={<Main />}/>
        <Route exact path='/home' element={<Home />}  />
        <Route exact path='/home/:idPais' element={<CountryID />}  />
        <Route exact path='/activity' element={<Activity />}  />
      </Routes>
      <MsjError/>
    </div>
  );
}

export default App;
