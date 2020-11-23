import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom';
import './UserPage.scss';
import firebase from '../../../Firebase'
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
    const [accounts, setAccounts] = useState([])
    useEffect(() =>{
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection('accounts').where('userID', '==', user.uid).get()
            setAccounts(data.docs.map(doc => ({...doc.data(), id: doc.id, uid:user.uid, email: user.email})))
        }

    fetchData()
    },[])
   

  return (
<div className="user-component main-area">
  <div className="grid-x user-information">
  {accounts.map(account => (
    <div className="cell small-10" key={account.id}>
      <div className="cell"><h1>{account.fname}</h1></div>
      <div className="cell user-information__text-blue">{account.username ? account.username : '@intet brugernavn'}</div>
      <div className="cell user-information__text">{account.email}</div>
      <div className="cell user-information__text"><BiEdit /></div>
    </div>
    ))}
    <div className="cell small-2 user-information__logout"> <button className="user-information__button-text" onClick={() => firebase.auth().signOut()}>Logud <FiLogOut /></button> </div>

  </div>
  <h1>Bookmarks</h1>
    <div className="grid-x user-bookmarks">
    <div className="cell small-12 user-bookmarks__titel">
    <div className="grid-x">
      <div className="cell small-10 "><h2>Vi søger udvikler</h2></div>
      <div className="cell small-2 user-bookmarks__delete"><h2><RiDeleteBinLine /></h2></div>
      </div>  
    </div>
    <div className="cell small-12 user-bookmarks__text"><span>Format:</span><br />PDF</div>
    <div className="cell small-12 user-bookmarks__text"><span>Firma :</span><br />Egeteknik</div>
    <div className="cell small-12 user-bookmarks__comment "><span>Kommentar :</span><br />De virker som en god virksomhed, her vil jeg gerne søge job.</div>
    </div>
  </div>
  );
}

export default UserPage;
