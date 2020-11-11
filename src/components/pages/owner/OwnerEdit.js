import React from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../../Firebase'
import './OwnerPage.scss';

function OwnerEdit() {

  const [company, setCompany] = React.useState([]);
  //const [loading, setLoading] = React.useState(false);

  const ref = firebase.firestore().collection('items');

  function getCompany() {
    //setLoading(true);
    ref.where('companyID', '==', 'egeteknik').onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setCompany(items);
        //setLoading(false);
      });
  }

  React.useEffect(() => {
    getCompany();
  }, []);

  return (
      <div className="grid-x main-area">
          <div className="cell auto admin-component">
              <div className="ownerPage-banner">
                <div className="ownerPage-banner__logo">
                  <img src="http://placekitten.com/200/200" alt=""/>
                </div>
                <div>
                  <h1>USERNAME</h1>
                  <h3>COMPANY NAME</h3>
                </div>
              </div>
              <Link to="/ownerpage"><p className="ownerPage-addContent">SE SOM BRUGER</p></Link>

              <div className="ownerEdit-addMesse">
                <h5>TILFØJ MESSE</h5>
              </div>

              <div className="ownerPage-messe">
                <div className="ownerPage-messe__action">
                  <h5>MESSE TITEL</h5>
                  <p>NUM</p>
                  <p>...</p>
                </div>

                <div className="ownerPage-item">
                    <div className="ownerPage-item__info">
                      <h5>TITLE</h5>
                      <p>TEXT</p>
                    </div>
                    <div className="ownerPage-itemAction">
                      <div className="ownerPage-itemAction__bookmark"><p>BOOKMARK</p></div>
                      <div className="ownerPage-itemAction__doctype"><p>DOCTYPE</p></div>
                    </div>

                    <hr/>

                    <div className="ownerPage-comment">
                      <div className="ownerPage-comment__profileimg">
                        <img src="http://placekitten.com/50/50" alt=""/>
                      </div>
                        <form action="">
                          <input type="text" placeholder="Tilføj en kommentar..."/>
                          <input type="submit"/>
                        </form>
                    </div>
                </div>
                <div className="ownerEdit-addItem">
                  <h6>TILFØJ INDHOLD</h6>
                </div>   
              </div>

            {company.map(companies =>(
              <p key={companies.id}>{companies.itemTitle}</p>
            ))}

          </div>
      </div>
  );
}

export default OwnerEdit;
