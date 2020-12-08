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
    <div className="grid-x login main-area">
      <div className="cell auto">
          <div className="login__banner">              
            <h1>LOGIN</h1>
            <p>Velkommen! Login for at få adgang til IXPO.</p>
          </div>

          <div className="login__form">
            <form onSubmit={handleLogin}>
              <label for="email">Email</label>
              <input name="email" type="email"/>
              
              <label for="password">Adgangskode</label>
              <input name="password" type="password"/>
              
              <input type="submit" value="Login"/>
              <div className="login__form-bottom-text">
                <p>Ingen Konto? <Link to="/signUp">Opret bruger her</Link></p>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
