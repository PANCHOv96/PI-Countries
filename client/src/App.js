import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Countries from './components/Country/countries.jsx';
import CountryID from './components/CountryID/CountryID.jsx';
import Activity from './components/Activity/Activity.jsx';
//import Filters from './components/Filters/Filters.jsx';
import Main from './components/Main/Main.jsx';

function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      {/* <Filters/> */}
      <Routes>
        <Route exact path='/' element={<Main />}/>
        <Route exact path='/home' element={<Countries />}  />
        <Route exact path='/home/:idPais' element={<CountryID />}  />
        <Route exact path='/activity' element={<Activity />}  />
      </Routes>
    </div>
  );
}

export default App;
