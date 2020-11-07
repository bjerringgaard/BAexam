import React from 'react';
import './OwnerPage.scss';
import firebase from '../../../Firebase'
import { EditInput } from "./EditInput";
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
            <p key={owners.headerOwner}>{owners.headerOwner}</p>
            ))}
        </div>
    </div>
  );
}
export default OwnerPage;
