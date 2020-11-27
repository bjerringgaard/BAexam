import React from 'react'
import {useParams, Link} from 'react-router-dom';
import firebase from '../../../Firebase'

export const Item = ({messe}) => {
  const [title, setTitle] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [file, setFile] = React.useState([]);

  const db = firebase.firestore();
  const { companyID } = useParams();


  // Add item
  const addItem = (messe) => {
    db
    .collection('items')
    .add({
      companyID: companyID,
      itemTitle: title,
      itemDesc: desc,
      itemFile: file,
      messeID: messe,
    })
    .then (() => {
      setTitle('')
      setDesc('')
      setFile('')
    })
  }

  return (
  <div className="ownerEdit-addItem">
    <form id={messe.messeID}>
      <label>Title</label>
      <input
      value={title}
      onChange={e => setTitle(e.target.value)}
      />
      <label>Description</label>
      <input
      value={desc}
      onChange={e => setDesc(e.target.value)}
      />
      <label>File</label>
      <input
      value={file}
      onChange={e => setFile(e.target.value)}
      />
      <br/>
      <Link onClick={() => addItem(messe.messeID)}>Create</Link>
    </form>
  </div>
  );
};
