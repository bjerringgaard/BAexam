import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { Redirect } from "react-router";
import firebase from '../../../Firebase'
import { useAuth } from "../../../Auth";

import CompanyPage_Banner from './CompanyPage_Banner';
import AddItem from './AddItem';

import './CompanyPage.scss';
import { BsFileEarmarkPlus, BsTrash, BsBookmark } from 'react-icons/bs';
import { FiRefreshCw } from 'react-icons/fi';
import { AiOutlineSend } from 'react-icons/ai';

function CompanyPage() {
  const db = firebase.firestore();
  const { currentUser } = useAuth();

  const [hidden, setHidden] = React.useState(true);

  const [company, setCompany] = React.useState([]);
  const [companyData, setCompanyData] = React.useState([]);
  const [messeData, setMesseData] = React.useState([]);
  const { companyID } = useParams();

  const [title, setTitle] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [file, setFile] = React.useState([]);

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

    // Add item
    const addItem = (messeID) => {
      db
      .collection('items')
      .add({
        companyID: companyID,
        itemTitle: title,
        itemDesc: desc,
        itemFile: file,
        messeID: messeID,
      })
      .then (() => {
        setTitle('')
        setDesc('')
        setFile('')
      })
    }

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
        <div key={account.id} className="cell auto admin-component">
          <CompanyPage_Banner />

          {hidden ? '' : 
          <div className="ownerEdit-addItem">
            <form>
              <label>Title</label>
              <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              />
              <label>Description</label>
              <input
              value={desc}
              onChange={e => setDesc(e.target.value)}
              />
              <label>File</label>
              <input
              value={file}
              onChange={e => setFile(e.target.value)}
              />
              <br/>
              <br/>
              <button onClick={() => setHidden(true)}>Hide</button>
            </form>
          </div>  
          }
  
          {messeData.map (messe => (
          <div key={messe.id} className="ownerPage-messe" >
            <div className="ownerPage-messe__action">
              <h2>{messe.messeTitle}</h2>
              <div className="right"> 
                { currentUser.email == account.email ?  <Link onClick={() => setHidden(false)}><p className="refreshButton">Show</p></Link> : '' }
                { currentUser.email == account.email ?  <Link onClick={() => addItem(messe.messeID)}><p className="refreshButton"><BsFileEarmarkPlus /></p></Link> : '' }
                { currentUser.email == account.email ?  <Link to="/company/egeteknik"><p className="deleteButton"><BsTrash/></p></Link> : '' }
              </div>
            </div>
  
            {company.map(items =>( items.messeID == messe.messeID ?
              <div key={items.id} className="ownerPage-item">
                <div className="ownerPage-itemAction">
                  <div className="ownerPage-itemAction__doctype">
                    <p className={items.itemFile}>{items.itemFile}</p>
                  </div>
                  <div className="ownerPage-item__actions">
                    { currentUser.email == account.email ? <button className="refreshButton"><p><FiRefreshCw /></p></button> : '' }
                    { currentUser.email == account.email ? <button className="deleteButton" onClick={() => deleteItem(items.id)}><p><BsTrash/></p></button> : '' }
                  </div>
                </div>
                <div className="ownerPage-item__info">
                  <h5>{items.itemTitle}</h5>
                  <p>{items.itemDesc}</p>
                </div>
                
                { currentUser.email == account.email ? '' :
                <div>
                  <hr/>
                  <div className="ownerPage-item-comment">
                    <div className="ownerPage-item-comment__profileimg">
                      <img src="http://placekitten.com/50/50" alt=""/>
                    </div>
  
                    <form>
                      <input type="text" placeholder="Skriv en kommentar..."/>
                      <button type="submit"><AiOutlineSend/></button>
                      <button><BsBookmark /></button>
                    </form>
                  </div>
                </div>
                }
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
