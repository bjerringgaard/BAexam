import React from 'react';
import {Link, useParams} from 'react-router-dom';
import firebase from '../../../Firebase'
import './OwnerPage.scss';

import { BsFileEarmarkPlus, BsTrash } from 'react-icons/bs';

import OwnerEdit_Banner from './OwnerEdit_Banner';

function OwnerEdit() {
  const db = firebase.firestore().collection('items');

  const [company, setCompany] = React.useState([]);
  const { companyID } = useParams();

  const [title, setTitle] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [file, setFile] = React.useState([]);
  const [messe, setMesse] = React.useState([]);

  // Read Item
  React.useEffect(() => {
    const unsubscribe = firebase
    db
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
      db.add({
        companyID: companyID,
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
      .doc(id)
      .delete()
    }


  return (
      <div className="grid-x main-area">
          <div className="cell auto admin-component">
              <OwnerEdit_Banner />

              <div className="ownerPage-messe">
                <div className="ownerPage-messe__action">
                  <h2>MESSE TITEL</h2>
                  <p>NUM</p>
                  <div className="right"> 
                    <p><BsTrash/></p>
                    <p><BsFileEarmarkPlus /></p>
                  </div>
                </div>

                {company.map(companies =>(
                  <div key={companies.id} className="ownerPage-item">
                    <div className="ownerPage-itemAction">
                      <div className="ownerPage-itemAction__doctype">
                        <p className={companies.itemFile}>{companies.itemFile}</p>
                      </div>
                      {/*<button onClick={deleteItem}>{companies.id}</button>*/}
                      <button onClick={() => deleteItem(companies.id)}>Delete</button>
                    </div>
                      <div className="ownerPage-item__info">
                        <h5>{companies.itemTitle}</h5>
                        <p>{companies.itemDesc}</p>
                      </div>
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

export default OwnerEdit;
