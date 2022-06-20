import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header.jsx';
import Home from './components/Home/Home.jsx';
import CountryID from './components/CountryID/CountryID.jsx';
import Activity from './components/Activity/Activity.jsx';
import Main from './components/Main/Main.jsx';
import MsjAlert from './components/MsjAlert/MsjAlert.jsx';

function App() {
  return (
    <div className="App">
      <Header/> 
      <Routes>
        <Route exact path='/' element={<Main />}/> 
        <Route path='/home' element={<Home/>}  />
        <Route exact path='/home/:idPais' element={<CountryID />}  />
        <Route exact path='/activity' element={<Activity />}  /> 
      </Routes>
      <MsjAlert/>
    </div>
  );
}

export default App;
