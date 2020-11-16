import React from 'react'
import './OwnerPage.scss';
import {Link, useParams} from 'react-router-dom';
import firebase from '../../../Firebase'
import { useAuth } from "../../../Auth";

import { BsPencil } from 'react-icons/bs';


function OwnerEdit_Banner() {
  const db = firebase.firestore().collection('accounts');
  const { companyID } = useParams();
  const { currentUser } = useAuth();

  const [companyData, setCompanyData] = React.useState([]);

  // Read Company Account 
  React.useEffect(() => {  
    const companyInformation = firebase
    db
    .where('companyID', '==', companyID)
    .onSnapshot((snapshot) => {
      const companyData = snapshot
      .docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setCompanyData(companyData)
    })
    return () => companyInformation
  },[])



  return (
    <div>
    {companyData.map(data => (
      <div className="ownerPage-header">
        <div className="ownerPage-banner">
          <div className="ownerPage-banner__logo">
            <img src={data.logo} alt=""/>
          </div>

          <div className="ownerPage-banner__text">
            <h1>{data.name}</h1>
            <p>{data.desc}</p>
            <div className="infolinks">
              <a className="contact-link" href={"mailto:" + data.contactemail}>Contact us</a>
              { currentUser ? <a href={"mailto:" + data.contactemail}>Rediger profil <BsPencil/></a>: ''}
            </div>
          </div>
        </div>
        <div className="ownerPage-header__bigBtn">
          { currentUser ? <Link to="/ownerpage"><p>SE SOM BRUGER</p></Link> : '' }
          { currentUser ? <Link to="/ownerpage"><p>TILFØJ MESSE</p></Link> : '' }
        </div>
      </div>
    ))}
    </div>
  );
}

export default OwnerEdit_Banner;
