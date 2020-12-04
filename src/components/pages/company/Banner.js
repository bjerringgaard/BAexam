import React, {useState} from 'react'
import './CompanyPage.scss';
import {Link, useParams} from 'react-router-dom';
import firebase from '../../../Firebase'
import { useAuth } from "../../../Auth";

import { BsPencil } from 'react-icons/bs';

import { Messe } from './Messe';
import { Item } from './Item';


function Banner() {
  const db = firebase.firestore().collection('accounts');
  const { companyID } = useParams();
  const { currentUser } = useAuth();

  const [companyData, setCompanyData] = React.useState([]);
  const [hiddenMesse, setHiddenMesse] = useState(true);
  const [hiddenItem, setHiddenItem] = useState(true);

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
        <div className="grid-x ownerPage-banner">
          <div className="cell small-12 large-2 ownerPage-banner__logo">
            <img src={account.logo} alt=""/>
          </div>

          <div className="cell small-12 large-10 ownerPage-banner__text">
            <h1>{account.name}</h1>
            <p>{account.desc}</p>
            <div className="infolinks">
              { currentUser.uid !== account.id ? <Link className="contact-link" to={"mailto:" + account.contactemail}>Contact us</Link> : '' }
            </div>
          </div>
        </div>
        <div className=" grid-x grid-margin-x ownerPage-header__bigBtn">
          { currentUser.uid === account.id ? <div className="cell small-12 medium-6"><Link onClick={() => setHiddenMesse(false)}><p>MESSE ADMINISTRATION</p></Link></div> : '' }
          { currentUser.uid === account.id ? <div className="cell small-12 medium-6"><Link onClick={() => setHiddenItem(false)}><p>TILFØJ INDHOLD</p></Link></div> : '' }
        </div>
        {hiddenMesse ? '' :  <div className="modal"><div className="modal-content"><Messe /><button className="closeMesse" type="button" onClick={() => setHiddenMesse(true)}>Luk</button></div></div>}
        {hiddenItem ? '' :  <div className="modal"><div className="modal-content"><Item/><button className="close" type="button" onClick={() => setHiddenItem(true)}>Annuller</button></div></div>  }

      </div>
    ))}
    </div>
  );
}

export default Banner;
