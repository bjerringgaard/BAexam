import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom';
import './UserPage.scss';
import firebase from '../../../Firebase'
import {UserUpdate} from './UserUpdate'
import { FiLogOut } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiOutlineCloseSquare } from 'react-icons/ai';


function UserPage() {

  var user = firebase.auth().currentUser;
    // VIRKER SJOVT NOK HER MEN IKKE ANDRE STEDER
    // .doc(user.uid).get().then(doc =>{
    //     console.log("First Name: " + doc.data().fname)
    //     console.log("Email: " + user.email)
    // })

    // VISER REDIGERNG MODAL HVIS MAN CLICKER
    const [showResults, setShowResults] = useState(false)
    const onClick = () => setShowResults(true)
    const onClose = () => setShowResults(false)


    // USER INFORMATION OLD WAY
    // const [accounts, setAccounts] = useState([])
    // useEffect(() => {
    //   const fetchData = async () => {
    //       const db = firebase.firestore()
    //       const data = await db.collection('accounts').where('id', '==', user.uid).get()
    //       setAccounts(data.docs.map(doc => ({...doc.data(), id: doc.id, id:user.uid, email: user.email})))
    //     }     
    // fetchData()
    // },[])

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
      <div className="cell small-10" key={account.id}>
        <div className="cell"><h1>{account.name}</h1></div>
        <div className="cell user-information__text">{user.email}</div>
        {account.company === true ? <Link className="cell user-information__text-blue" to={"../company/" + account.companyID} >Go til Company page</Link> : ''}
        {account.admin === true ? <Link className="cell user-information__text-blue" to={"admin/"} >Go til Admin Page</Link> : <Redirect to="/userpage" />}
        <div className="cell user-information__text"><BiEdit onClick={onClick}/> { showResults ? <><AiOutlineCloseSquare onClick={onClose}/>  <UserUpdate spell={account} /></> : '' }</div>
      </div>
      ))}
      <div className="cell small-2 user-information__logout"> <button className="user-information__button-text" onClick={() => firebase.auth().signOut()}>Logud <FiLogOut /></button> </div>
    </div>
    <h1>Bookmarks</h1>
        {notes.map(note => (
      <div key={note.id} className="grid-x user-bookmarks">
      <div className="cell small-12 user-bookmarks__titel">
      <div className="grid-x">
        <div className="cell small-10 "><h2>{note.itemTitle}</h2></div>
        <div className="cell small-2 user-bookmarks__delete">
          <h2>
          <RiDeleteBinLine onClick={() => window.confirm(`Are you sure you wish to delete ${note.itemTitle}`) && deleteItem(note.id)}/>
            </h2>
          </div>
        </div>  
      </div>
      <div className="cell small-12 user-bookmarks__text"><span>Firma:</span><br />{note.companyName}</div>
      <div className="cell small-12 user-bookmarks__text"><span>Description:</span><br />{note.itemDesc}</div>
      <div className="cell small-12 user-bookmarks__comment "><span>Kommentar :</span><br />{note.userNote}</div>
      <div className="cell small-12 user-bookmarks__comment "><span>Download :</span><br /><a href={note.url} target="blank" >Hent den tilhørende pdf</a></div>
      </div>
      ))}
  </div>
  );
}

export default UserPage;
