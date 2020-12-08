import React, {useCallback} from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import firebase from '../../Firebase'
//import {Link} from 'react-router-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Login.scss';
//import HomePage from './components/pages/Home';

const SignUp = ({ history }) => {
    const [name, setName] = React.useState([]);

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password, name} = event.target.elements;
        const db = firebase.firestore()
        //const user = firebase.auth()
        try {
            await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(cred => {
                db.collection('accounts').doc(cred.user.uid).set({
                  admin: false,
                  company: false,
                  user: true,
                  id: cred.user.uid,
                  name: name.value,
                })
              })
            history.push ('/userpage');
        }
        catch (error) {
            alert(error);
        }
    }, [history]);

  return (
    <div className="grid-x login main-area">
      <div className="cell">
        <div className="login__banner">              
          <h1>Registrer</h1>
          <p>Opret en konto for at få adgang til IXPO</p>
        </div>

        <div className="login__form">
          <form onSubmit={handleSignUp}>

              <label for="brugernavn">Brugernavn</label>
              <input 
                type="text" 
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            
              <label for="email">Email</label>
              <input type="email" name="email" />
              
              <label for="password">Adgangskode</label>
              <input type="password" name="password" />
              
              <input type="submit" value="Registrer" />
              <div className="login__form-bottom-text">
                <p>Har du allerede en konto? <Link to="/login">login her</Link></p>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter (SignUp);
