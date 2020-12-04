import React, {useState, useEffect} from 'react'
import './Admin.scss';
import {Redirect} from 'react-router-dom';
import firebase from '../../../Firebase'
//import { useAuth } from "../../Auth";
import AdminView from './AdminView';
import CreateOwner from './CreateOwner';
import CreateExpo from './CreateExpo';
//import { firestore } from 'firebase';

function Admin() { 

//const {currentUser} = useAuth();
var user = firebase.auth().currentUser;
    const [accounts, setAccounts] = useState([])
    useEffect(() =>{
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection('accounts').where('id', '==', user.uid).get()
            setAccounts(data.docs.map(doc => ({...doc.data(), id: doc.id, id:user.uid, email: user.email})))
        }
    fetchData()
    },[])

  return (
 
    <div className="admin-component main-area">
        <div className="grid-x">
            <div className="cell auto">
            <p className="admin-component__welcome">
                <div>
                <div className="cell small-10">
                    </div>
                    {accounts.map(account => (
                        <>
                        <div className="cell small-10" key={account.id}>Velkommen: <strong>{account.name}</strong></div>
                        </>
                    ))}    
                <div>
                </div>
                </div>
            </p>                       
            </div>
            <div className="cell auto admin-component__sign-out">
                <button onClick={() => firebase.auth().signOut()}>Sign Out</button>  
            </div>
    </div>
    <h1>Admin Panel</h1>
    {/* Tjekker om du er logget ind som admin eller ej */}
    {accounts.map(account => ( 
        <>                   
    {account.admin === true ? <><AdminView /><CreateOwner /><CreateExpo/></> : <Redirect to="/userpage" />}
        </>
    ))}    
    </div>

  );
                    
}

export default Admin;
