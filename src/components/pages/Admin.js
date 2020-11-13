import React, {useContext} from 'react';
import './Admin.scss';
import firebase from '../../Firebase'
import { useAuth } from "../../Auth";
import AdminView from './AdminView';

function Admin() { 
    const {currentUser} = useAuth();

  return (
    <div className="admin-component main-area">
        <div className="grid-x">
            <div className="cell auto">
                <p className="admin-component__welcome">Velkommen <strong>{currentUser.email}</strong></p>  
            </div>
            <div className="cell auto admin-component__sign-out">
                <button onClick={() => firebase.auth().signOut()}>Sign Out</button>  
            </div>
    </div>
    <h1>Admin Panel</h1>
        <AdminView />
     </div>
  );
}

export default Admin;
