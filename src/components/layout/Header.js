import React from 'react';
import './Header.scss';
import Navigator from './Navigation';


function Header() {
  return (
      <div className="grid-x header">
          <div className="cell small-6 header__logo"><p>The Messe App</p></div>
          <div className="cell small-6">
              <Navigator />
          </div>
      </div>
  );
}

export default Header;
