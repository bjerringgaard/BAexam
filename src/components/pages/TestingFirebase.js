import React, {useState, useEffect} from 'react'
import firebase from '../../Firebase'

export default function TestingFirebase() {
  /*
    const [spells, setSpells] = useState([])
    const [newOwnerHeader, setnewOwnerHeader] = React.useState([])

    useEffect(() =>{
        const unsubscribe = firebase
        .firestore()
        .collection('spell')
        .onSnapshot((snapshot) => {
            const newSpells = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))
            setSpells(newSpells)
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

    const deleteItem = (id) => {
        firebase
          .firestore()
          .collection("spell")
          .doc(id)
          .delete()
    } */ 

const db = firebase.firestore();
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
  .where('messeID', '==', 'agromek2020')
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
      {messeData.map( messe => (
        <div className="ownerPage-header">
          <h1>{messe.messeTitle}</h1>
          {company.map(item =>(
            <h2>{item.itemTitle}</h2>
          ))}
        </div>
      ))}
      </div>



      /*
        <div>
        <input
            value={newOwnerHeader}
            onChange={e => setnewOwnerHeader(e.target.value)}
            />
        <button onClick={onCreate}>Create</button>

        {spells.map(spell => (
                <div key={spells.id}>
                <p> {spell.name}</p>
                <button onClick={() => deleteItem(spell.id)}>Delete</button>
                </div>
            ))}
        </div>
        */
      
    );
}
