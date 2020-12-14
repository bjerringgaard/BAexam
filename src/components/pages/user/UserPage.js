import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom';
import './UserPage.scss';
import firebase from '../../../Firebase'
import {UserUpdate} from './UserUpdate'
import { UserNoteUpdate } from "./UserNoteUpdate";
import { FiLogOut } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';
import { BsDownload } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineCloseSquare } from 'react-icons/ai';


function UserPage() {

  var user = firebase.auth().currentUser;
    const [showResults, setShowResults] = useState(false)
    const onClick = () => setShowResults(true)
    const onClose = () => setShowResults(false)

    // USER INFORMATION NEW WAY
    const [accounts, setAccounts] = useState([])
    useEffect(() =>{
        const unsubscribe = firebase
        .firestore()
        .collection('accounts')
        .where('id', '==', user.uid)
        .onSnapshot((snapshot) => {
            const newUser = snapshot.docs.map((doc) =>({
                  id: doc.id, 
                  id:user.uid, 
                  email: user.email,
                ...doc.data()
            }))
            setAccounts(newUser)
        })
        return () => unsubscribe
    },[])

    // USER NOTES
    const [notes, setNotes] = useState([])
    useEffect(() =>{
        const unsubscribe = firebase
        .firestore()
        .collection('notes')
        .where('noteID', '==', user.uid)
        .orderBy('startedAt', 'desc')
        .onSnapshot((snapshot) => {
            const newNote = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))
            setNotes(newNote)
        })
        return () => unsubscribe
    },[])


   // DELETE USER NOTES
  const deleteItem = (noteID) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(noteID)
      .delete()
      console.log(noteID)
    }

  return (
  <div className="user-component main-area">
    <div className="grid-x user-information">
    {accounts.map(account => ( 
      <div className="cell small-12 medium-10 user-information__profile" key={account.id}>
        <div className="cell"><h1>{account.name}</h1></div>
        <div className="cell user-information__text">{user.email}</div>
        {account.company === true ? <Link className="cell user-information__text-blue" to={"../company/" + account.companyID} >Go til Company page</Link> : ''}
        {account.admin === true ? <Link className="cell user-information__text-blue" to={"admin/"} >Go til Admin Page</Link> : <Redirect to="/userpage" />}
        <div className="cell user-information__text"><BiEdit onClick={onClick}/> { showResults ? <><AiOutlineCloseSquare onClick={onClose}/>  <UserUpdate spell={account} /></> : '' }</div>
      </div>
      ))}
      <div className="cell small-12 medium-2 user-information__logout"> <button className="user-information__button-text" onClick={() => firebase.auth().signOut()}>Logud <FiLogOut /></button> </div>
    </div>
    <h1>Noter</h1>
        {notes.map(note => (
      <div key={note.id} className="grid-x user-bookmarks">
      <div className="cell small-12 user-bookmarks__titel">
      <div className="grid-x">
        <div className="cell small-10 "><h2>{note.itemTitle}</h2></div>
        <div className="cell small-2 user-bookmarks__delete">
          <h2>
          <BsTrash onClick={() => window.confirm(`Er du sikker på at du vil slette ${note.itemTitle}?`) && deleteItem(note.id)}/>
            </h2>
          </div>
        </div>  
      </div>
      <div className="cell small-12 user-bookmarks__text">
        <span>Firma</span><br />{note.companyName}
      </div>
      <div className="cell small-12 user-bookmarks__text">
        <span>Messe</span><br />{note.messeTitle}
      </div>
      <div className="cell small-12 user-bookmarks__text">
        <span>Beskrivelse</span><br />{note.itemDesc}</div>
        { note.userNote !== null ? <div className="cell small-12 user-bookmarks__comment"><span>Kommentar</span><br />{note.userNote}</div> : ''}
        <UserNoteUpdate notes={note} />
      <div className="cell small-12 user-bookmarks__comment">
        <span>Download</span><br /><a href={note.url} target="blank"><BsDownload /></a></div>
      </div>
      ))}
  </div>
  );
}

export default UserPage;
