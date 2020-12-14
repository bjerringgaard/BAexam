import React from "react";
import firebase from '../../../Firebase'

export const UserNoteUpdate = ({ notes }) => {
    const [userNote, setUserNote] = React.useState(notes.userNote);
  
    const onUpdate = () => {
      const db = firebase.firestore()
      db.collection('notes').doc(notes.id).set({...notes, userNote})
    }
  
  
    return (
      <>
        <input
          value={userNote}
          onChange={e => {
            setUserNote(e.target.value);
          }}
        />
        <button onClick={onUpdate}>Opdate din Note</button>
      </>
    );
  };