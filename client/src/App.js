import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Countries from './components/Country/countries.jsx';


function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Routes>
        <Route path='/home' element={<Countries />}  />
      </Routes>
    </div>
  );
}

export default App;
