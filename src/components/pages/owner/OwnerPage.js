import React from 'react';
import './OwnerPage.scss';
import firebase from '../../../Firebase'
import { EditInput } from "./EditInput";
import {Link} from 'react-router-dom';
function OwnerPage() {

// State fra React Hooks   
const [owner, setOwner] = React.useState([])
const [newOwnerHeader, setnewOwnerHeader] = React.useState([])

React.useEffect(() => {
 // Henter data fra vores collection owner på firebase ved hjælp af UseEffect
    const db = firebase.firestore();
    // Onsnapshot gør det bliver opdateret automatiosk på siden
    return db.collection('owner').onSnapshot((snapshot) => {
    const ownerData = [];
    snapshot.forEach(doc => ownerData.push(({...doc.data(), id: doc.id })));
        setOwner(ownerData);
    });
},[]); 

// Tilføjer til Collection Owner
const onCreate = (e) => {
    e.preventDefault()
    const db = firebase.firestore()
    db.collection('owner').add({
        headerOwner: newOwnerHeader
    })
    .then (() =>{
        setnewOwnerHeader('')
    })
}


  return (
    <div className="grid-x main-area">
        <div className="cell auto admin-component">
            <ul>
            <input
                value={newOwnerHeader}
                onChange={e => setnewOwnerHeader(e.target.value)}
            />
            <button onClick={onCreate}>Create</button>
            {owner.map(owner => (
                <li key={owner.OwnerHeader}>
                <EditInput owner={owner} />
                </li>
            ))}
            </ul>   
        {/* Mapper igennem indholdet af owners fra firebase */}
            {owner.map(owners =>(
              <div>
            <p key={owners.headerOwner}>{owners.headerOwner}</p>
            </div>
            ))}

            <div className="ownerPage-banner">
              <div className="ownerPage-banner__logo">
                <img src="http://placekitten.com/200/200" alt=""/>
              </div>
              <div>
                <h1>COMPANY NAME</h1>
              </div>
            </div>
            <Link to="/ownerEdit"><p className="ownerPage-addContent">TILFØJ INDHOLD</p></Link>

              <div className="ownerPage-messe">
                <div className="ownerPage-messe__action">
                  <h5>MESSE TITEL</h5>
                  <p>NUM</p>
                  <p>...</p>
                </div>

                <div className="ownerPage-item">
                    <div className="ownerPage-item__info">
                      <h5>TITLE</h5>
                      <p>TEXT</p>
                    </div>
                    <div className="ownerPage-itemAction">
                      <div className="ownerPage-itemAction__bookmark"><p>BOOKMARK</p></div>
                      <div className="ownerPage-itemAction__doctype"><p>DOCTYPE</p></div>
                    </div>

                    <hr/>

                    <div className="ownerPage-comment">
                      <div className="ownerPage-comment__profileimg">
                        <img src="http://placekitten.com/50/50" alt=""/>
                      </div>
                        <form action="">
                          <input type="text" placeholder="Tilføj en kommentar..."/>
                          <input type="submit"/>
                        </form>
                    </div>
                </div>   
              </div>
        </div>
    </div>
  );
}
export default OwnerPage;