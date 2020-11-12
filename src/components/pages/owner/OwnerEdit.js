import React from 'react';
import {Link, useParams} from 'react-router-dom';
import firebase from '../../../Firebase'
import './OwnerPage.scss';

function OwnerEdit() {
  const [company, setCompany] = React.useState([]);
  const { companyURL } = useParams();

  React.useEffect(() => {
    // Database med Collection navn Items
    const db = firebase.firestore().collection('items');

    // Sortere igennem "items" efter firma ider = Egeteknik (Snapshot for Auto update på siden)
    return db.where('companyID', '==', companyURL).onSnapshot((snapshot) => {
      // Starter Array Items (Empty) hvor efetr vi looper igennem og tilføjerdata til vores state. 
      const items = [];
      snapshot.forEach((doc) => {items.push(doc.data())});
        setCompany(items);
      });
    },[]); 

  return (
      <div className="grid-x main-area">
          <div className="cell auto admin-component">
              <div className="ownerPage-banner">
                <div className="ownerPage-banner__logo">
                  <img src="http://placekitten.com/200/200" alt=""/>
                </div>
                <div>
                  <h1>{companyURL}</h1>
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

                {company.map(companies =>(
                  <div key={companies.id} className="ownerPage-item">
                    <div className="ownerPage-itemAction">
                      <div className="ownerPage-itemAction__doctype">
                        <p className={companies.itemFile}>{companies.itemFile}</p>
                      </div>
                    </div>
                      <div className="ownerPage-item__info">
                        <h5>{companies.itemTitle}</h5>
                        <p>{companies.itemDesc}</p>
                      </div>
                    </div>
                  ))}

                <div className="ownerEdit-addItem">
                  <h6>TILFØJ INDHOLD</h6>
                </div>   
              </div>
          </div>
      </div>
  );
}

export default OwnerEdit;
