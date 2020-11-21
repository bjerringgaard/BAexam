import React, {useState, useEffect, useContext} from 'react'
import './Admin.scss';
import firebase from '../../Firebase'
import { useAuth } from "../../Auth";
import AdminView from './AdminView';
import CreateOwner from './CreateOwner';
import { firestore } from 'firebase';

function Admin() { 
//const {currentUser} = useAuth();
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
            
            const data = await db.collection('accounts').where('account', '==', 'uid').get()
            
            setAccounts(data.docs.map(doc => ({...doc.data(), id: doc.id, uid:user.uid})))
            
        }
    fetchData()
    },[])
   

  return (
    <div className="admin-component main-area">
        <div className="grid-x">
            <div className="cell auto">
          
   
            <p className="admin-component__welcome">Velkommen <strong>
            {/* {accounts.map(account => (  */}
                <div>
                <div className="cell small-10"><br /><br />
                    </div>
                    
                    {accounts.map(account => (
                        
                        <>
                        <div className="cell small-10" key={account.id}><br /><br />{account.fname} <br /><br /> {account.uid}</div>
                        </>
                        
                        ))}
                     
                        
                <div>
    
                </div>
                </div>
            {/* ))}    */}
            </strong>
            </p>  
   
                                    
            
            </div>
            <div className="cell auto admin-component__sign-out">
                <button onClick={() => firebase.auth().signOut()}>Sign Out</button>  
            </div>
    </div>
    <h1>Admin Panel</h1>
        <AdminView />
        <CreateOwner />
     </div>
  );
}

export default Admin;
