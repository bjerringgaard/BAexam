import React, { useState } from 'react'
import {useParams} from 'react-router-dom';
import firebase from '../../../Firebase'
import { BsTrash, BsFileEarmarkPlus } from 'react-icons/bs';

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
  <div className="messeModal">
    <h4>Administrer Messer</h4>
    <ul>
      {messeListeData.map(messe => (
        <div>
          <div className="grid-x" > 
            <div className="cell small-6">
              <li >{messe.messeTitle}</li>
            </div>
            <div className="action cell small-6">
              <button type="button" onClick={() => addMesse(messe.id)}><BsFileEarmarkPlus/> </button> 
              <button type="button" onClick={() => deleteMesse(messe.id)}><BsTrash/></button> 
            </div>
          </div>
          <hr/>
        </div>
      ))}
    </ul> 
  </div>
  );
};
