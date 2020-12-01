import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import {Link} from 'react-router-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Login.scss';
import firebase from '../../Firebase'
import { AuthContext } from "../../Auth";
import { firestore } from "firebase";

const Login = ({ history }) => {

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/userpage");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);



  if (currentUser) {
    return <Redirect to="/userpage" />;
  }

  return (
    <div className="grid-x main-area">
      <div className="cell auto admin-component">
          <div className="login-banner">              
            <h1>PROJEKT NAVN</h1>
            <h3>Login</h3>
            <div className="login-banner__logo">
              <img src="http://placekitten.com/200/200" alt=""/>
            </div>
          </div>
          
        <form onSubmit={handleLogin}>
          <div className="login-form">
            <label for="email">Email</label>
            <input name="email" type="email" placeholder="Email" />
            
            <label for="password">Password</label>
            <input name="password" type="password" placeholder="Password" />
            
            <input type="submit" value="Submit" />
            <div className="login-form__bottom-text">
              <p>Ingen Konto? <Link to="/signUp">Opret bruger her</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
