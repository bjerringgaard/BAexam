import React, { useState } from 'react'
import {useParams, Link} from 'react-router-dom';
import firebase from '../../../Firebase'

export const Messe = () => {
  const [messeListeData, setMesseListeData] = useState([]);

  const db = firebase.firestore();
  const { companyID } = useParams();

  // Read Messer 
  React.useEffect(() =>{
    const messeListe = firebase
    db
    .collection('messe')
    .onSnapshot((snapshot) => {
      const messeListeData = snapshot
      .docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setMesseListeData(messeListeData)
    })
    return () => messeListe
  })

  // Add Messe
  const addMesse = (id) => {
    db
    .collection('messe')
    .doc(id)
    .update({
      deltager: firebase.firestore.FieldValue.arrayUnion(companyID)
  });  
  }

  const deleteMesse = (id) => {
    db
    .collection('messe')
    .doc(id)
    .update({
      deltager: firebase.firestore.FieldValue.arrayRemove(companyID)
    });
  }

  return (
  <div>
    <ul>
      {messeListeData.map(messe => (
        <div>
          <li >{messe.messeTitle}</li>
          <Link onClick={() => addMesse(messe.id)}>TILFØJ </Link> 
          <Link onClick={() => deleteMesse(messe.id)}> DELETE</Link> 
        </div>
        

      ))}
    </ul> 
  </div>
  );
};
