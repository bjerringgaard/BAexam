import React, {useState, useEffect} from 'react'
import firebase from '../../Firebase'

export default function TestingFirebase() {
    const [spells, setSpells] = useState([])
    const [newOwnerHeader, setnewOwnerHeader] = React.useState([])

    useEffect(() =>{
        const unsubscribe = firebase
        .firestore()
        .collection('spell')
        .onSnapshot((snapshot) => {
            const newSpells = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data()
            }))
            setSpells(newSpells)
        })
        return () => unsubscribe
    },[])


    // Tilføjer til Collection Owner
const onCreate = (e) => {
    e.preventDefault()
    const db = firebase.firestore()
    db.collection('spell').add({
        name: newOwnerHeader
    })
    .then (() =>{
        setnewOwnerHeader('')
    })
}

    const deleteItem = (id) => {
        firebase
          .firestore()
          .collection("spell")
          .doc(id)
          .delete()
    }

    return (
        <div>
        <input
            value={newOwnerHeader}
            onChange={e => setnewOwnerHeader(e.target.value)}
            />
        <button onClick={onCreate}>Create</button>

        {spells.map(spell => (
                <div key={spells.id}>
                <p> {spell.name}</p>
                <button onClick={() => deleteItem(spell.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}
