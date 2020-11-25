import React, { useContext } from "react";
import firebase from '../../../Firebase'
import { AuthContext } from "../../../Auth";

export const UserUpdate = ({ spell }) => {
    

const { currentUser } = useContext(AuthContext);  
const [email, setEmail] = React.useState(spell.email);
const [fname, setName] = React.useState(spell.fname);

  const onUpdate = () => {
    const db = firebase.firestore()
    db.collection('accounts').doc(spell.uid).set({...spell, email, fname})
  }

  return (
    <>
      <input
        defaultValue={currentUser.email}
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <input
        value={fname}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Update</button>

    </>
  );
};