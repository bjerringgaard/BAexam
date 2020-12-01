import React, {useState} from 'react';
import firebase from '../../../Firebase'
import {Link} from 'react-router-dom';
import { useAuth } from "../../../Auth";

import {BsBookmark } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';

export const Note = ({items}) => {
  const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [note, setNote] = useState([]);

  // Add Note
  const addNote = (title, desc, file, messe) => {
    db
    .collection('notes')
    .add({
      itemTitle: title,
      itemDesc: desc,
      itemFile: file,
      messeID: messe,
      id: currentUser.uid,
      userNote: note,
    })
    .then (() => {
      setNote('')
    })
  }

  // Add Bookmark
  const addBookmark = (title, desc, file, messe) => {
    db
    .collection('notes')
    .add({
      itemTitle: title,
      itemDesc: desc,
      itemFile: file,
      messeID: messe,
      id: currentUser.uid,
    })
  }

  return (
        <div>
          <hr/>
          <div className="ownerPage-item-comment">
            {/*
            <div className="ownerPage-item-comment__profileimg">
              <img src="http://placekitten.com/50/50" alt=""/>
            </div> */}
            <form id={items.id} >
              <input id={items.id} name={items.id} type="text" placeholder="Skriv et personligt notat..." value={note} onChange={e => setNote(e.target.value)}/>
              <Link onClick={() => addNote(items.itemTitle, items.itemDesc, items.itemFile, items.messeID)}><p className="refreshButton"><AiOutlineSend/></p></Link>
              <Link onClick={() => addBookmark(items.itemTitle, items.itemDesc, items.itemFile, items.messeID)}><p className="refreshButton"><BsBookmark /></p></Link>
            </form>
          </div>
        </div>
  );
};
