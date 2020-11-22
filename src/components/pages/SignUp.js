import React, {useCallback} from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../Firebase'
//import {Link} from 'react-router-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Login.scss';
//import HomePage from './components/pages/Home';

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        const db = firebase.firestore()
        const user = firebase.auth()
        try {
            await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(cred => {
                db.collection('accounts').doc(cred.user.uid).set({
                  admin: false,
                  owner: false,
                  userID: cred.user.uid
                })
              })
            history.push ('/admin');
        
        }
        catch (error) {
            alert(error);
        }
    }, [history]);

  return (
      <div className="grid-x main-area">
          <div className="cell auto login-form">
            <form onSubmit={handleSignUp}>
              <div id="form">
              <h1>Sign Up Page</h1>
                <label for="email">Email</label>
                <input type="email" name="email" />
                
                <label for="password">Password</label>
                <input type="password" name="password" />
                
                <input type="submit" value="Sign Up" />
              </div>
            </form>
          </div>
      </div>
  );
}

export default withRouter (SignUp);
