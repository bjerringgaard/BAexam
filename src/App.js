import React from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
//import HomePage from './components/pages/Home';

function App() {
  return (
      <div className="grid-container">
          <div className="grid-x grid-margin-x grid-margin-y">
            <div className="cell small-6 colortest">LEFT</div>
            <div className="cell small-6 colortest">RIGHT</div>
            <div className="cell small-6 colortest">LEFT</div>
            <div className="cell small-6 colortest">RIGHT</div>
          </div>
      </div>
  );
}

export default App;
