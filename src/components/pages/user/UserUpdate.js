import React, { useRef, useState } from "react";
import firebase from '../../../Firebase'
import { useAuth  } from "../../../Auth";
import { useHistory } from "react-router-dom"
export const UserUpdate = ({ spell }) => {
    
const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()
const { currentUser, updatePassword, updateEmail } = useAuth()
const history = useHistory()
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
const [name, setName] = React.useState(spell.name);
const [adresse, setAdresse] = React.useState(spell.adresse);
const [cvr, setCvr] = React.useState(spell.cvr);
const [desc, setDesc] = React.useState(spell.desc);
const [phone, setPhone] = React.useState(spell.phone);
const [logo, setLogo] = React.useState(spell.logo);

  const onUpdate = () => {
    const db = firebase.firestore()
    const promises = []
 
    db.collection('accounts').doc(spell.id).set({...spell, name, adresse, cvr, desc, phone, logo})
    if (emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value))
      }
      if (passwordRef.current.value) {
        promises.push(updatePassword(passwordRef.current.value))
      }


    Promise.all(promises)
    .then(() => {
      history.push("/userpage")
    })
    .catch(() => {
      setError("Failed to update account")
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const onUpdateUser = () => {
    const db = firebase.firestore()
    const promises = []
 
    db.collection('accounts').doc(spell.id).set({...spell, name})
    if (emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value))
      }
      if (passwordRef.current.value) {
        promises.push(updatePassword(passwordRef.current.value))
      }


    Promise.all(promises)
    .then(() => {
      history.push("/userpage")
    })
    .catch(() => {
      setError("Failed to update account")
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
  {/* Viser forskellige redigering muligheder alt efter om det en bruger eller et Company */}
  {spell.company === false ? 
      <div>
      <span className="label">Email</span>
      <input
      id="email"
      type="hidden"
      ref={emailRef}
      required
      defaultValue={currentUser.email}
      />
      <input
        id="Disabled"
        type="email"
        defaultValue={currentUser.email}
        disabled
      />

      <span className="label">Adgangskode</span>
      <input
      id="password"
      type="password"
      ref={passwordRef}
      placeholder="Efterlad blank for at beholde din nuværende kode"
      />
      <span className="label">Adgangskode Igen</span>
      <input
      id="password-confirm"
      type="password"
      ref={passwordConfirmRef}
      placeholder="Efterlad blank for at beholde din nuværende kode"
      />
      <span className="label">Bruger Navn</span>
      <input
        value={name}
        type="text"
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <button onClick={onUpdateUser}>Opdater</button>
      </div>

      :

      <div>
      <span className="label">Email</span>

      <input
      id="email"
      type="hidden"
      ref={emailRef}
      required
      defaultValue={currentUser.email}
      />
      <input
        id="Disabled"
        type="email"
        defaultValue={currentUser.email}
        disabled
      />

      <span className="label">Password</span>
      <input
      id="password"
      type="password"
      ref={passwordRef}
      placeholder="Efterlad blank for at beholde din nuværende kode"
      />
      <span className="label">Password</span>
      <input
      id="password-confirm"
      type="password"
      ref={passwordConfirmRef}
      placeholder="Efterlad blank for at beholde din nuværende kode"
      />
      <span className="label">Bruger Navn</span>
      <input
        value={name}
        type="text"
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <span className="label">Adresse</span>
      <input
        value={adresse}
        type="text"
        onChange={e => {
          setAdresse(e.target.value);
        }}
      />
      <span className="label">CVR</span>
      <input
        value={cvr}
        type="text"
        onChange={e => {
          setCvr(e.target.value);
        }}
      />
      <span className="label">Beskrivelse</span>
      <input
        value={desc}
        type="text"
        onChange={e => {
          setDesc(e.target.value);
        }}
      />
      <span className="label">Telefon</span>
      <input
        value={phone}
        type="text"
        onChange={e => {
          setPhone(e.target.value);
        }}
      />
      <span className="label">Logo</span>
      <input
        value={logo}
        type="text"
        onChange={e => {
          setLogo(e.target.value);
        }}
      />
      <button onClick={onUpdate}>Opdater</button>
      </div>
      }      
      
    </>
  );
};

