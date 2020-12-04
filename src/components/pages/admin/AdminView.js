import React, {useState, useEffect} from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';
//import { FiRefreshCw } from 'react-icons/fi';
import { BiLinkExternal } from 'react-icons/bi';
import firebase from '../../../Firebase'
//import { useAuth } from "../../Auth";
import {Link} from 'react-router-dom';

export default function AdminView() {

    const [accounts, setAccounts] = useState([])
    useEffect(() =>{
        const unsubscribe = firebase
        .firestore()
        .collection('accounts')
        .where('company', '==', true)
        .onSnapshot((snapshot) => {
            const newAccount = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))
            setAccounts(newAccount)
        })
        return () => unsubscribe
    },[])

    const [users, setUsers] = useState([])
    useEffect(() =>{
        const unsubscribe = firebase
        .firestore()
        .collection('accounts')
        .where('user', '==', true)
        .onSnapshot((snapshot) => {
            const newUser = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))
            setUsers(newUser)
        })
        return () => unsubscribe
    },[])


  return (
    <div className="comp-wrapper">
      <div className="grid-x admin-panel">
        <div className="cell small-12 medium-6 admin-panel__owners">
          <div className="cell small-6 admin-panel__owners-title"><h1>Firmaer</h1></div>
            {accounts.map(account => (
            <div className="grid-x admin-panel__information" key={account.id}>
              <div className="cell small-10">{account.name}</div>
              <div className="cell auto icons"><Link className="cell user-information__text-blue" to={"company/" + account.companyID} ><BiLinkExternal /></Link></div>
            </div>
            ))}
        </div>
        
        <div className="cell small-12 medium-6 admin-panel__users">
          <div className="cell small-6 admin-panel__users-title"><h1>Brugere</h1></div>
            {users.map(user => (
            <div className="grid-x admin-panel__information" key={user.id}>
              <div className="cell small-10">{user.name}</div>
              <div className="cell auto icons"></div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};
