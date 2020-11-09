import React from 'react';
import {Link} from 'react-router-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Login.scss';
//import HomePage from './components/pages/Home';

function Login() {
  return (
      <div className="grid-x main-area">
          <div className="cell auto login-form">
            <form>
              <div className="banner">              
                <h1>PROJEKT NAVN</h1>
                <h3>Login</h3>
                  <div id="logo">
                    <img src="http://placekitten.com/200/200" alt=""/>
                  </div>
              </div>
              <div id="form">
                <label for="email">Email</label>
                <input type="text" name="email" />
                
                <label for="password">Password</label>
                <input type="text" name="password" />
                
                <input type="submit" value="Submit" />
                <div id="bottom-text">
                  <p>Ingen Konto? <Link to="/login">Opret bruger her</Link></p>
                  <p>Vil du vide mere om os? <Link to="/about">Klik her</Link></p>
                </div>
              </div>
            </form>
          </div>
      </div>
  );
}

export default Login;
