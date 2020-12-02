import React, {useState} from 'react'
import './CompanyPage.scss';
import {Link, useParams} from 'react-router-dom';
import firebase from '../../../Firebase'
import { useAuth } from "../../../Auth";

import { BsPencil } from 'react-icons/bs';

import { Messe } from './Messe';


function Banner() {
  const db = firebase.firestore().collection('accounts');
  const { companyID } = useParams();
  const { currentUser } = useAuth();
  // var user = firebase.auth().currentUser;

  const [companyData, setCompanyData] = React.useState([]);
  const [hidden, setHidden] = useState(true);

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
    {companyData.map(account => (
      <div className="ownerPage-header" key={account.id} >
        <div className="ownerPage-banner">
          <div className="ownerPage-banner__logo">
            <img src={account.logo} alt=""/>
          </div>

          <div className="ownerPage-banner__text">
            <h1>{account.name}</h1>
            <p>{account.desc}</p>
            <div className="infolinks">
              <Link className="contact-link" to={"mailto:" + account.contactemail}>Contact us</Link>
              { currentUser.uid === account.id ? <a>Rediger profil <BsPencil/></a>: ''}
            </div>
          </div>
        </div>
        <div className="ownerPage-header__bigBtn">
          { currentUser.uid === account.id ? <Link onClick={() => setHidden(false)}><p>TILFØJ MESSE</p></Link> : '' }
          { currentUser.uid === account.id ? <Link onClick={() => setHidden(false)}><p>TILFØJ INDHOLD</p></Link> : '' }
        </div>
        {hidden ? '' :  <div><Messe /> <button onClick={() => setHidden(true)}>Close</button></div>  }
      </div>
    ))}
    </div>
  );
}

export default Banner;
