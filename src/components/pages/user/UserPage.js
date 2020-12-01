import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import './UserPage.scss';
import firebase from '../../../Firebase'
import {UserUpdate} from './UserUpdate'
import { FiLogOut } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';

function UserPage() {

  var user = firebase.auth().currentUser;

    // VIRKER SJOVT NOK HER MEN IKKE ANDRE STEDER
    // .doc(user.uid).get().then(doc =>{
    //     console.log("First Name: " + doc.data().fname)
    //     console.log("Email: " + user.email)
    // })

    // USER INFORMATION
    const [accounts, setAccounts] = useState([])
    useEffect(() =>{
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection('accounts').where('id', '==', user.uid).get()
            setAccounts(data.docs.map(doc => ({...doc.data(), id: doc.id, id:user.uid, email: user.email})))
        }

    fetchData()
    },[])

    // USER NOTES
    const [notes, setNotes] = useState([])
    useEffect(() =>{
        const unsubscribe = firebase
        .firestore()
        .collection('notes')
        .where('id', '==', user.uid)
        .onSnapshot((snapshot) => {
            const newNote = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))
            setNotes(newNote)
        })
        return () => unsubscribe
    },[])


  return (
<div className="user-component main-area">
    

  <div className="grid-x user-information">
  
  {accounts.map(account => (
    <div className="cell small-10" key={account.id}>
    
      <div className="cell"><h1>{account.name}</h1></div>
      <div className="cell user-information__text">{account.email}</div>
      <Link className="cell user-information__text-blue" to={"company/" + account.companyID} >Go til Company page</Link>
      <div className="cell user-information__text"><BiEdit /></div>
      {/* <input
        value={account.fname}
        onChange={e => {
          setAccounts(e.target.value);
        }}
      /> */}
      <UserUpdate spell={account} />
    </div>
    ))}
    <div className="cell small-2 user-information__logout"> <button className="user-information__button-text" onClick={() => firebase.auth().signOut()}>Logud <FiLogOut /></button> </div>

    
  </div>
  <h1>Bookmarks</h1>
  {notes.map(note => (
    <div className="grid-x user-bookmarks">
    
    <div className="cell small-12 user-bookmarks__titel">
    <div className="grid-x">
      <div className="cell small-10 "><h2>{note.itemTitle}</h2></div>
      <div className="cell small-2 user-bookmarks__delete"><h2><RiDeleteBinLine /></h2></div>
      </div>  
    </div>
    <div className="cell small-12 user-bookmarks__text"><span>Format:</span><br />{note.itemFile}</div>
    <div className="cell small-12 user-bookmarks__text"><span>Firma skal lige ændres i DBEN :</span><br />{note.itemDesc}</div>
    <div className="cell small-12 user-bookmarks__text"><span>Description:</span><br />{note.itemDesc}</div>
    <div className="cell small-12 user-bookmarks__comment "><span>Kommentar :</span><br />{note.userNote}</div>
    
    </div>
    ))}
  </div>
  );
}

export default UserPage;
