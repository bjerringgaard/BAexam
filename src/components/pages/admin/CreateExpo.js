import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import firebase from '../../../Firebase';

const CreateExpo = () => {
  const db = firebase.firestore();

  const [messeID, setMesseID] = useState(null);
  const [messeTitle, setMesseTitle] = useState(null);

  // Add to db
  const handleMesse = () => {
    db
    .collection('messe')
    .add({
      messeID: messeID,
      messeTitle: messeTitle,
    })
    .then (() => {
      setMesseTitle('')
      setMesseID('')
    })
  }

  return (
    <div className="create-expo">
    <h1>Tilføj Expo</h1>
    <form>
      <div className="grid-x grid-margin-x create-owner">
        <div className="cell small-6">
          <span class="label">Title</span>
          <input
            type="text" 
            name="messeTitle" 
            value={messeTitle}
            onChange={e => setMesseTitle(e.target.value)}
          />
        </div>
        <div className="cell small-6">
          <span class="label">Id</span>
          <input 
            type="text" 
            name="messeID" 
            value={messeID}
            onChange={e => setMesseID(e.target.value)}
          />
        </div>
      </div>
      <button type="button" onClick={() => handleMesse()}>Tilføj Messe</button>
    </form>
    </div>
  );
};

export default withRouter(CreateExpo);