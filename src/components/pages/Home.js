import React from 'react';
import ExpoItems from '../layout/ExpoItems';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Home.scss';
//import HomePage from './components/pages/Home';

function Home() {
  return (
      <div className="grid-x containerHome">
          <div className="cell"><p>HOME</p></div>
          <div className="cell">
            <ExpoItems />
          </div>
          
      </div>
  );
}

export default Home;
