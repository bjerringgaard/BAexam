import React, {useState, useEffect} from 'react'
import firebase from '../../Firebase'

export default function TestingFirebase() {
  
    const [notes, setNotes] = useState([])
    const [newOwnerHeader, setnewOwnerHeader] = React.useState([])

    useEffect(() =>{
        const unsubscribe = firebase
        .firestore()
        .collection('notes')
        .onSnapshot((snapshot) => {
            const newNotes = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))
            setNotes(newNotes)
        })
        return () => unsubscribe
    },[])


    // Tilføjer til Collection Owner
const onCreate = (e) => {
    e.preventDefault()
    const db = firebase.firestore()
    db.collection('spell').add({
        name: newOwnerHeader
    })
    .then (() =>{
        setnewOwnerHeader('')
    })
}

    const deleteItem = (uid) => {
        firebase
          .firestore()
          .collection("notes")
          .doc(uid)
          .delete()
          console.log(uid)
    } 

const db = firebase.firestore();
var user = firebase.auth().currentUser;
const [messeData, setMesseData] = React.useState([]);
const [company, setCompany] = React.useState([]);

React.useEffect(() => {
  const messeDeltager = firebase
  db
  .collection('messe')
  .where('deltager', 'array-contains', 'egeteknik')
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

React.useEffect(() => {
  const unsubscribe = firebase
  db
  .collection('items')
  .where('companyID', '==', 'egeteknik')
  .onSnapshot((snapshot) => {
    const company = snapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
    }))
    setCompany(company)
  })
  return () => unsubscribe
},[])


    return (

<div>
      
      <div>
      {user ? messeData.map( messe => (
        <div className="ownerPage-header">
          <h1>{messe.messeTitle}</h1>
          {company.map(item => ( item.messeID == messe.messeID ? 
            <h2>{item.itemTitle}</h2> : 
            ''
          ))}
        </div>
      )) : 'DU SKAL LOGGE IND !!!!! WHY NOT'}
      </div>



      
        <div>
        <input
            value={newOwnerHeader}
            onChange={e => setnewOwnerHeader(e.target.value)}
            />
        <button onClick={onCreate}>Create</button>

        {notes.map(note => (
                <div key={note.id}>
                <p> {note.itemDesc}</p>
                <button onClick={() => deleteItem(note.id)}>Delete</button>
                </div>
            ))}
        </div>
      
      </div>
    );
}
