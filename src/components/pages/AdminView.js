import React, {useState, useEffect} from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';
import { BsPersonPlus } from 'react-icons/bs';
import firebase from '../../Firebase'

export default function AdminView() {

    const [accounts, setAccounts] = useState([])

    useEffect(() =>{
        firebase
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
        
    },[])


    return (
        <div>
       
             
        <div>
        <div className="grid-x admin-panel">
        <div className="cell small-6 admin-panel__header">
            <div class="grid-x">
                <div className="cell small-6 admin-panel__text">Users</div>
                <div className="cell small-6 admin-panel__create"><BsPersonPlus /></div>
            </div>
        </div>
            <div className="cell small-6 admin-panel__header">
            <div class="grid-x">
                <div className="cell small-6 admin-panel__text">Owner</div>
                <div className="cell small-6 admin-panel__create"><BsPersonPlus /></div>
            </div>
            </div>
            <div className="grid-x admin-panel__content">
                <div className="cell small-6 admin-panel__owners">
                    <div className="grid-x admin-panel__information">
                    {accounts.map(account => (
                        <div key={account.id}>
                            <div className="cell small-12">{account.name} <RiDeleteBinLine /> <FiRefreshCw /></div><br></br>
                        </div>
                        ))}
                    </div>
                </div>
            <div className="cell small-6 admin-panel__users">
                <div className="grid-x admin-panel__information">
                    <div className="cell auto">Owner 1</div>
                    <div className="cell auto icons"><RiDeleteBinLine /> <FiRefreshCw /></div>
                </div>
                <div className="grid-x admin-panel__information">
                    <div className="cell auto">Owner 2</div>
                    <div className="cell auto icons"><RiDeleteBinLine /> <FiRefreshCw /></div>
                </div>
            </div>
        </div>
        </div>
        </div>

            


        </div>
    )
}
