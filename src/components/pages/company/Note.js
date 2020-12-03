import React, {useState} from 'react';
import firebase from '../../../Firebase'
import {Link, useParams} from 'react-router-dom';
import { useAuth } from "../../../Auth";

import {BsBookmark } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';


export const Note = ({items}) => {
  const db = firebase.firestore();
  const { currentUser } = useAuth();
  const [note, setNote] = useState([]);
  const { companyID } = useParams();

  // Add Note
  const addNote = (title, desc, fileType, url, messe) => {
    db
    .collection('notes')
    .add({
      itemTitle: title,
      itemDesc: desc,
      itemFileType: fileType,
      messeID: messe,
      noteID: currentUser.uid,
      userNote: note,
      companyID: companyID,
      url: url,
    })
    .then (() => {
      setNote('')
    })
  }

  // Add Bookmark
  const addBookmark = (title, desc, fileType, url, messe) => {
    db
    .collection('notes')
    .add({
      itemTitle: title,
      itemDesc: desc,
      itemFileType: fileType,
      messeID: messe,
      noteID: currentUser.uid,
      companyID: companyID,
      url: url,
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
              <Link onClick={() => addNote(items.itemTitle, items.itemDesc, items.itemFileType, items.url, items.messeID)}><p className="refreshButton"><AiOutlineSend/></p></Link>
              <Link onClick={() => addBookmark(items.itemTitle, items.itemDesc, items.itemFileType, items.url, items.messeID)}><p className="refreshButton"><BsBookmark /></p></Link>
            </form>
          </div>
        </div>
  );
};
