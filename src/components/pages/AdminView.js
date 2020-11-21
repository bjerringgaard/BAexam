import React, {useState, useEffect} from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';
import { BsPersonPlus } from 'react-icons/bs';
import firebase from '../../Firebase'
//import { useAuth } from "../../Auth";

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
        <div>
            <div>
            <div className="grid-x admin-panel">
            <div className="cell small-6 admin-panel__header">
                <div className="grid-x">
                    <div className="cell small-6 admin-panel__text">Users</div>
                    <div className="cell small-6 admin-panel__create"><BsPersonPlus /></div>
                </div>
            </div>
                <div className="cell small-6 admin-panel__header">
                <div className="grid-x">
                    <div className="cell small-6 admin-panel__text">Owner</div>
                    <div className="cell small-6 admin-panel__create"><BsPersonPlus /></div>
                </div>
                </div>
                <div className="grid-x admin-panel__content">

                    <div className="cell small-6 admin-panel__owners">
                    {accounts.map(account => (
                        <div className="grid-x admin-panel__information" key={account.id}>
                                <div className="cell small-10">{account.name}</div>
                                <div className="cell auto icons"><RiDeleteBinLine /> <FiRefreshCw /></div>
                        </div>
                        ))}
                    </div>
                    
                    <div className="cell small-6 admin-panel__users">
                    {users.map(user => (
                        <div className="grid-x admin-panel__information" key={user.id}>
                                <div className="cell small-10">{user.fname}</div>
                                <div className="cell auto icons"><RiDeleteBinLine /> <FiRefreshCw /></div>
                        </div>
                        ))}
                    </div>

            </div>
            </div>
            </div>
        </div>
    )
}
