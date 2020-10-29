import React from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Login.scss';
//import HomePage from './components/pages/Home';

function Login() {
  return (
      <div className="grid-x main-area">
          <div className="cell auto login-form">
            <form>
              <h1>Login Form</h1>
              <p>Fusce molestie vestibulum ligula id facilisis. Mauris dapibus neque a neque eleifend, ac egestas lectus vestibulum. Praesent id lobortis odio. Donec suscipit massa sed elit consectetur efficitur. Vestibulum suscipit lacinia eros, eu imperdiet ex ultrices eu. Mauris ligula dolor, imperdiet et eleifend quis, viverra ut eros. Fusce ac magna tortor. Nulla quis accumsan tellus, et elementum odio. Cras finibus, turpis eu semper pharetra, justo elit gravida magna, eu convallis velit dui sit amet turpis. Donec posuere tristique sapien ac pulvinar. Pellentesque ut congue nulla. Pellentesque vel interdum sem.</p>
              <label>
              Navn
              <input type="text" name="name" />
              </label>
              <label>
              Email
              <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
      </div>
  );
}

export default Login;
