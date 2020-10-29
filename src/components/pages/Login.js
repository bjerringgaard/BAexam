import React from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Login.scss';
//import HomePage from './components/pages/Home';

function Login() {
  return (
      <div className="grid-x footer">
          <div className="cell auto">
            <form>
              <label>
              Navn
              <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
      </div>
  );
}

export default Login;
