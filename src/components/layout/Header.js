import React from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Header.scss';
import Navigator from './Navigation';
//import HomePage from './components/pages/Home';

function Header() {
  return (
      <div className="grid-x">
          <div className="cell small-6">HEADER LEFT</div>
          <div className="cell small-6">
              <Navigator />
          </div>
      </div>
  );
}

export default Header;
