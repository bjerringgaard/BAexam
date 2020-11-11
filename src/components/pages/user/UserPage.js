import React from 'react';
import {Link} from 'react-router-dom';
import './UserPage.scss';


function UserPage() {
  return (
  <div className="grclassName-x main-area">
      <div className="cell auto admin-component">
        <div className="userPage-banner">
          <div className="userPage-banner__logo">
            <img src="http://placekitten.com/200/200" alt=""/>
          </div>
          <div>
            <h1>USERNAME</h1>
            <h3>COMPANY NAME</h3>
          </div>
        </div>
        <Link to="/useredit"><p className="userPage-profileSettings">PROFILE SETTINGS</p></Link>
        
        <div className="userPage-messe">
          <h2>MESSE TITLE</h2>

          <div className="userPage-messe__entry">
            <div className="userpage-messe__action">
              <h5>COMPANY NAME</h5>
              <p>NUM</p>
              <p>...</p>
            </div>

            <div className="userPage-items">
              <div className="userPage-items__first-row">
                <div className="userPage-items__doctype"><p>DOCTYPE</p></div>
                <div className="userPage-items__action">
                  <p>COMMENT</p>
                  <p>DELETE</p>
                </div>
              </div>

              <div className="userPage-items__docinfo">
                <h5>TITLE</h5>
                <p>TEXT</p>
                <hr/>
              </div>

              <div className="userPage-comment">
                <div className="userPage-comment__profileimg">
                  <img src="http://placekitten.com/50/50" alt=""/>
                </div>
                  <div className="userPage-comment__info">
                    <div className="userPage-comment__first-row">
                      <p><b>USERNAME</b></p>
                      <p>CommentTime</p>
                    </div>
                    <p>CommentText</p>
                  </div>
              </div>
            </div>

        
            <div className="company-items">
              <div className="first-row">
                <div className="item-doctype"><p>DOCTYPE</p></div>
                <div className="item-action">
                  <p>COMMENT</p>
                  <p>DELETE</p>
                </div>
              </div>

              <div className="item-docinfo">
                <h5>TITLE</h5>
                <p>TEXT</p>
                <hr/>
              </div>

              <div className="item-comment">
                <div className="profileimg">
                  <img src="http://placekitten.com/50/50" alt=""/>
                </div>
                  <div className="comment-info">
                    <div className="first-row">
                      <p><b>USERNAME</b></p>
                      <p>CommentTime</p>
                    </div>
                    <p>CommentText</p>
                  </div>
              </div>
            </div>
          

          </div>
        </div>
      </div>
  </div>
  );
}

export default UserPage;
