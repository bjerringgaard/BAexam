import React from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';
import Navigator from './Navigation';


function Header() {
  return (
      <div className="grid-x header">
          <div className="cell small-12 medium-6 header__logo"><Link to="/userpage"><p className="header__logo">Codename IXPO</p></Link></div>
          <div className="cell small-12 medium-6">
              <Navigator />
          </div>
      </div>
  );
}

export default Header;
