import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from "react-router";
import firebase from '../../../Firebase'
import { useAuth } from "../../../Auth";

import Banner from './Banner';
import {Note} from './Note';
import {Item} from './Item';

import './CompanyPage.scss';
import { BsFileEarmarkPlus, BsTrash} from 'react-icons/bs';
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
            {hidden ? '' : 
              <div>
              <Item messe={messe} />
              <button type="button" onClick={() => setHidden(true)}>Close</button>
              </div>
            }
            <div className="ownerPage-messe__action">
              <h2>{messe.messeTitle}</h2>
              <div className="right"> 
                { currentUser.uid === account.id ?  <button type="button" onClick={() => setHidden(false)}><p className="refreshButton"><BsFileEarmarkPlus /></p></button> : '' }
                { currentUser.uid === account.id ?  <button type="button" to="/company/egeteknik"><p className="deleteButton"><BsTrash/></p></button> : '' }
              </div>
            </div>
  
            {company.map(items => ( items.messeID === messe.messeID ?
              <div key={items.id} className="ownerPage-item">
                <div className="ownerPage-itemAction">
                  <div className="ownerPage-itemAction__doctype">
                    <p className={items.itemFileType}>{items.itemFileType}</p>
                  </div>
                  <a href={items.url} target="_blank">Download</a>
                  <div className="ownerPage-item__actions">
                    { currentUser.uid === account.id ? <button className="refreshButton"><p><FiRefreshCw /></p></button> : '' }
                    { currentUser.uid === account.id ? <button className="deleteButton" onClick={() => deleteItem(items.id)}><p><BsTrash/></p></button> : '' }
                  </div>
                </div>
                <div className="ownerPage-item__info">
                  <h5>{items.itemTitle}</h5>
                  <p>{items.itemDesc}</p>
                </div>
                { currentUser.uid !== account.id ? <Note items={items}/> : '' }
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
