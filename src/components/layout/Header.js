import React from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';
import Logo from'../../assets/IXPOlogoblue.svg';
import Navigator from './Navigation';


function Header() {
  return (
      <div className="grid-x header">
          <div className="cell small-12 medium-2 header__logo"><Link to="/userpage"><img src={Logo} alt="React Logo" className="logosvg" /></Link></div>
          <div className="cell small-12 medium-10">
              <Navigator />
          </div>
      </div>
  );
}

export default Header;
