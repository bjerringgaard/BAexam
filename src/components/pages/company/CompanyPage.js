import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from "react-router";
import firebase from '../../../Firebase'
import { useAuth } from "../../../Auth";

import Banner from './Banner';
import {Note} from './Note';

import './CompanyPage.scss';
import { BsTrash, BsDownload} from 'react-icons/bs';
import { FiRefreshCw } from 'react-icons/fi';

function CompanyPage() {
  const db = firebase.firestore();
  const { currentUser } = useAuth();
  const { companyID } = useParams();

  const [company, setCompany] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [messeData, setMesseData] = useState([]);

  const [hidden, setHidden] = useState(true);

  // Read Account
  React.useEffect(() => {  
    const companyInformation = firebase
    db
    .collection('accounts')
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

  //Read Messe
  React.useEffect(() => {
    const messeDeltager = firebase
    db
    .collection('messe')
    .where('deltager', 'array-contains', companyID)
    .onSnapshot((snapshot) => {
      const messeData = snapshot
      .docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setMesseData(messeData)
    })
    return () => messeDeltager
  },[])

  // Read Item
  React.useEffect(() => {
    const unsubscribe = firebase
    db
    .collection('items')
    .where('companyID', '==', companyID)
    .onSnapshot((snapshot) => {
      const company = snapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
      }))
      setCompany(company)
    })
    return () => unsubscribe
  },[])

    // Delete Item
    const deleteItem = (id) => {
      db
      .collection('items')
      .doc(id)
      .delete()
    }

  // Check login
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="grid-x main-area">
      {companyData.map (account => (
        <div key={account.id} className="cell auto">
          <Banner />
          
          {messeData.map (messe => (
          <div key={messe.id} className="ownerPage-messe" >
            <div className="ownerPage-messe__action">
              <h2>{messe.messeTitle}</h2>
            </div>
  
            {company.map(items => ( items.messeID === messe.messeID ?
              <div key={items.id} className="ownerPage-item">
                <div className="grid-x">
                  <div className="cell small-10 ownerPage-item__info">
                    <h5>{items.itemTitle}</h5>
                    <p>{items.itemDesc}</p>
                      <a href={items.url} target="_blank" className="downloadBtn"><BsDownload /><p>Download</p></a>
                  </div>
                  <div className="cell small-2 ownerPage-item__actions">
                    {/* { currentUser.uid === account.id ? <button className="refreshButton"><p><FiRefreshCw /></p></button> : '' } */}
                    { currentUser.uid === account.id ? <button className="deleteButton" onClick={() => window.confirm(`Er du sikker på at du vil slette ${items.itemTitle}?`) && deleteItem(items.id)}><p><BsTrash/></p></button> : '' }
                  </div>
                </div>
                { currentUser.uid !== account.id ? <Note items={items} account={account}/> : '' }
              </div> 
              : ''
              ))}
          </div>
          ))}
        </div>
      ))} 
    </div>
  );
}
export default CompanyPage;
