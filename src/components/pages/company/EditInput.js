import React from "react";
import firebase from '../../../Firebase'

export const EditInput = ({ owner }) => {
  const [headerOwner, setHeaderOwner] = React.useState(owner.headerOwner);

  const onUpdate = () => {
    const db = firebase.firestore()
    db.collection('owner').doc(owner.id).set({...owner, headerOwner})
  }

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('owner').doc(owner.id).delete()
  }

  return (
    <>
      <input
        value={owner.headerOwner}
        onChange={e => {
            setHeaderOwner(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDelete}>Delete</button>
    </>
  );
};