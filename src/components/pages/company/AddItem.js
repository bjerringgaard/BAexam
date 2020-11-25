import React from 'react'
import {Link, useParams} from 'react-router-dom';
import { Redirect } from "react-router";
import firebase from '../../../Firebase'
import { useAuth } from "../../../Auth";

function AddItem() {
  const [title, setTitle] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [file, setFile] = React.useState([]);
  const [messe, setMesse] = React.useState([]);
  const db = firebase.firestore();
  const { companyID } = useParams();


  // Add item
  const addItem = () => {
    db
    .collection('items')
    .add({
      companyID: companyID,
      itemTitle: title,
      itemDesc: desc,
      itemFile: file,
      messeID: 'agromek2020',
    })
    .then (() => {
      setTitle('')
      setDesc('')
      setFile('')
    })
  }

  return (
  <div className="ownerEdit-addItem">
    <form>
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
      <button onClick={addItem}>Create</button>
    </form>
  </div>
  )
}
export default AddItem;
