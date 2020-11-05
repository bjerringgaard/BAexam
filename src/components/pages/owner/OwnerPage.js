import React from 'react';
import './OwnerPage.scss';
import firebase from '../../../Firebase'

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
const onCreate = () => {
    const db = firebase.firestore()
    db.collection('owner').add({
        headerOwner: newOwnerHeader
    })
}

  return (
      <div className="grid-x main-area">
          <div className="cell auto admin-component">
              <input value={newOwnerHeader} onChange={(e) => setnewOwnerHeader(e.target.value)} /><br /><br />
              <div className="button" onClick={onCreate}>Tilføj Header</div>
              <h1>OwnerPage</h1>
              {/* Mapper igennem indholdet af owners fra firebase */}
              {owner.map(owners =>(
                  <p key={owners.headerOwner}>{owners.headerOwner}</p>
              ))}
          </div>
      </div>
  );
}

export default OwnerPage;
