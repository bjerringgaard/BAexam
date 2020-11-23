import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { Redirect } from "react-router";
import firebase from '../../../Firebase'
import { useAuth } from "../../../Auth";

import CompanyPage_Banner from './CompanyPage_Banner';

import './CompanyPage.scss';
import { BsFileEarmarkPlus, BsTrash, BsBookmark } from 'react-icons/bs';
import { FiRefreshCw } from 'react-icons/fi';
import { AiOutlineSend } from 'react-icons/ai';

function CompanyPage() {
  const db = firebase.firestore();
  const { currentUser } = useAuth();

  const [company, setCompany] = React.useState([]);
  const [companyData, setCompanyData] = React.useState([]);
  const { companyID } = useParams();

  const [title, setTitle] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [file, setFile] = React.useState([]);
  const [messe, setMesse] = React.useState([]);
  

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
    const addItem = (e) => {
      e.preventDefault()
      db
      .collection('items')
      .add({
        companyID: companyID,
        emailID: currentUser.email,
        itemTitle: title,
        itemDesc: desc,
        itemFile: file,
        messeID: messe,
      })
      .then (() => {
        setTitle('')
        setDesc('')
        setFile('')
        setMesse('')
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
    <div className="cell auto admin-component">
      <CompanyPage_Banner />

      <div className="ownerPage-messe">
        <div className="ownerPage-messe__action">
          <h2>MESSE TITEL</h2>
          <p>NUM</p>
          <div className="right"> 
            { currentUser ?  <Link to="/company/egeteknik"><p className="refreshButton"><BsFileEarmarkPlus /></p></Link> : '' }
            { currentUser ?  <Link to="/company/egeteknik"><p className="deleteButton"><BsTrash/></p></Link> : '' }
          </div>
        </div>

        {company.map(companies =>(
          <div key={companies.id} className="ownerPage-item">
            <div className="ownerPage-itemAction">
              <div className="ownerPage-itemAction__doctype">
                <p className={companies.itemFile}>{companies.itemFile}</p>
              </div>
              <div className="ownerPage-item__actions">
                { currentUser.email == companies.emailID ? <button className="refreshButton"><p><FiRefreshCw /></p></button> : '' }
                { currentUser.email == companies.emailID ? <button className="deleteButton" onClick={() => deleteItem(companies.id)}><p><BsTrash/></p></button> : '' }
              </div>
            </div>
            <div className="ownerPage-item__info">
              <h5>{companies.itemTitle}</h5>
              <p>{companies.itemDesc}</p>
            </div>
            
            
            { currentUser.email == companies.emailID ? '' :
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
        ))}

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
            <label>Messe</label>
            <input
            value={messe}
            onChange={e => setMesse(e.target.value)}
            />
            <br/>
            <br/>
            <button onClick={addItem}>Create</button>
          </form>
        </div>   
      </div>
    </div>
  </div>
  );
}
export default CompanyPage;
