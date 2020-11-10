import React from 'react';
import './UserPage.scss';

function UserEdit() {
  return (
    <div className="grid-x main-area">
      <div className="cell auto admin-component">
        <div className="edit-banner">              
          <div id="logo">
            <img src="http://placekitten.com/200/200" alt=""/>
            <button>EDIT PICTURE</button>
          </div>
        </div>

        <div className="edit-main">
          <form action="">
            <label for="fName">First Name</label>
            <input type="text" name="fName" />
            
            <label for="lName">Last Name</label>
            <input type="text" name="lName" />

            <label for="company">Company</label>
            <input type="text" name="company" />
            
            <input type="submit" value="Submit" />
          </form>

          <div id="edit-password">
            <hr/>
            <h2>Password</h2>
            <p>You can set a perment password if you dont want to use logincodes </p>
            <button>Reset Password</button>
          </div>

          <div id="edit-logout">
            <hr/>
            <h2>Logout</h2>
            <p>You will be logged out of all current devices </p>
            <button>Logout</button>
          </div>

          <div id="edit-delete">
            <hr/>
            <h2>Danger Zone</h2>
            <p>Permanently delete my account</p>
            <button>Delete Account</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserEdit;
