import React, { useContext, useRef, useState } from "react";
import firebase from '../../../Firebase'
import { useAuth  } from "../../../Auth";
import { useHistory } from "react-router-dom"
export const UserUpdate = ({ spell }) => {
    
const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()
const { currentUser, updatePassword, updateEmail } = useAuth()
const history = useHistory()
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
const [fname, setName] = React.useState(spell.fname);

  const onUpdate = () => {
    const db = firebase.firestore()
    const promises = []
 
    db.collection('accounts').doc(spell.uid).set({...spell, fname})
    if (emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value))
      }
      if (passwordRef.current.value) {
        promises.push(updatePassword(passwordRef.current.value))
      }


    Promise.all(promises)
    .then(() => {
      history.push("/userpage")
    })
    .catch(() => {
      setError("Failed to update account")
    })
    .finally(() => {
      setLoading(false)
    })
  }




  return (
    <>
      <input
      id="email"
      type="email"
      ref={emailRef}
      required
      defaultValue={currentUser.email}
      />
      <input
      id="password"
      type="password"
      ref={passwordRef}
      placeholder="Leave blank to keep the same"
      />
      <input
      id="password-confirm"
      type="password"
      ref={passwordConfirmRef}
      placeholder="Leave blank to keep the same"
      />
      <input
        value={fname}
        type="text"
        onChange={e => {
          setName(e.target.value);
        }}
      />      
      <button onClick={onUpdate}>Update</button>

    </>
  );
};