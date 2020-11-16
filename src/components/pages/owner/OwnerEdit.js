import React from 'react';
import {Link, useParams} from 'react-router-dom';
import firebase from '../../../Firebase'
import './OwnerPage.scss';

function OwnerEdit() {
  const db = firebase.firestore().collection('items');

  const [company, setCompany] = React.useState([]);
  const { companyURL } = useParams();

  const [title, setTitle] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [file, setFile] = React.useState([]);
  const [messe, setMesse] = React.useState([]);

  // Read Item
  React.useEffect(() => {
    const unsubscribe = firebase
    db
    .where('companyID', '==', companyURL)
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
        companyID: companyURL,
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
              <div className="ownerPage-banner">
                <div className="ownerPage-banner__logo">
                  <img src="data:image/png;base64,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" alt=""/>
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
                  <h6>TILFØJ INDHOLD</h6>
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
