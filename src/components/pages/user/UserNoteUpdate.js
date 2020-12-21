import React from "react";
import firebase from '../../../Firebase'

export const UserNoteUpdate = ({ notes }) => {
    const [userNote, setUserNote] = React.useState(notes.userNote);
  
    const onUpdate = () => {
      const db = firebase.firestore()
      db.collection('notes').doc(notes.id).set({...notes, userNote})
    }
  
  
    return (
      <div className="update-note">
        <input
          type="text" 
          value={userNote}
          onChange={e => {
            setUserNote(e.target.value);
          }}
        />
        <button onClick={onUpdate}>Opdater din note</button>
       </div>
    );
  };