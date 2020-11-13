import React, {useContext} from 'react';
import './Admin.scss';
import firebase from '../../Firebase'
import { useAuth } from "../../Auth";
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';

function Admin() { 

    const {currentUser} = useAuth();

  return (

      <div className="admin-component main-area">

      <div className="grid-x">
          <div className="cell auto">
              <h1>Admin Panel</h1>
              <p className="welcome">Velkommen <strong>{currentUser.email}</strong></p>
              <p>Fusce molestie vestibulum ligula id facilisis. Mauris dapibus neque a neque eleifend, ac egestas lectus vestibulum. Praesent id lobortis odio. Donec suscipit massa sed elit consectetur efficitur. Vestibulum suscipit lacinia eros, eu imperdiet ex ultrices eu. Mauris ligula dolor, imperdiet et eleifend quis, viverra ut eros. Fusce ac magna tortor. Nulla quis accumsan tellus, et elementum odio. Cras finibus, turpis eu semper pharetra, justo elit gravida magna, eu convallis velit dui sit amet turpis. Donec posuere tristique sapien ac pulvinar. Pellentesque ut congue nulla. Pellentesque vel interdum sem.</p>
              <button onClick={() => firebase.auth().signOut()}>Sign Out</button>  
          </div>
    </div>

    <div className="grid-x admin-panel">
        <div className="cell small-6">Users</div>
            <div className="cell small-6">Owners</div>
            <div className="grid-x admin-panel__content">
                <div className="cell small-6">
                    <ul>
                        <li>Bruger 1</li>
                        <li>Bruger 1</li>
                        <li>Bruger 1</li>
                    </ul>
                </div>
            <div className="cell small-6">

                <div className="grid-x">
                    <div className="cell auto">Bruger 1</div>
                    <div className="cell auto icons"><RiDeleteBinLine /> <FiRefreshCw /></div>
                </div>
            </div>
        </div>
    </div>


      </div>

  

   
  );
}

export default Admin;
