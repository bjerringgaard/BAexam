import React, {useState} from 'react';
import firebase from '../../../Firebase'
import {Link, useParams} from 'react-router-dom';
import { useAuth } from "../../../Auth";

import { BsFileEarmarkPlus, BsBookmark } from 'react-icons/bs';


export const Note = ({items, account}) => {
  const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [note, setNote] = useState([]);
  const { companyID } = useParams();

  // Add Note
  const addNote = (title, desc, url, messe, name) => {
    db
    .collection('notes')
    .add({
      itemTitle: title,
      itemDesc: desc,
      messeID: messe,
      noteID: currentUser.uid,
      userNote: note,
      companyID: companyID,
      url: url,
      companyName: name,
      startedAt: new Date(),
    })
    .then (() => {
      setNote('')
    })
  }

  // Add Bookmark
  const addBookmark = (title, desc, url, messe, name) => {
    db
    .collection('notes')
    .add({
      itemTitle: title,
      itemDesc: desc,
      messeID: messe,
      noteID: currentUser.uid,
      companyID: companyID,
      url: url,
      companyName: name,
      startedAt: new Date(),
      userNote: null,
    })
  }

  return (
        <div>
          <hr/>
          <div className="ownerPage-item-comment">
            <form id={items.id} >
              <input id={items.id} name={items.id} type="text" placeholder="Skriv personlig note..." value={note} onChange={e => setNote(e.target.value)}/>
              <button type="button" onClick={() => addNote(items.itemTitle, items.itemDesc, items.url, items.messeID, account.name)}><p className="refreshButton"><BsFileEarmarkPlus /></p></button>
              <button type="button" onClick={() => addBookmark(items.itemTitle, items.itemDesc, items.url, items.messeID, account.name)}><p className="refreshButton"><BsBookmark /></p></button>
            </form>
          </div>
        </div>
  );
};
