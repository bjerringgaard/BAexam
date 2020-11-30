import React, {useCallback} from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../Firebase'

const CreateOwner = ({ history }) => {
    const [fname, setName] = React.useState([]);
    const [adresse, setAdresse] = React.useState([]);
    const [companyID, setCompanyID] = React.useState([]);
    const [cvr, setCvr] = React.useState([]);
    const [phone, setPhone] = React.useState([]);
    const [desc, setDesc] = React.useState([]);
    const [logo, setLogo] = React.useState([]);
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password, fname, adresse, companyID, cvr, phone, desc, logo} = event.target.elements;
        const db = firebase.firestore()
        const user = firebase.auth()
        try {
            await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(cred => {
                db.collection('accounts').doc(cred.user.uid).set({
                  admin: false,
                  company: true,
                  fname: fname.value,
                  adresse: adresse.value,
                  companyID: companyID.value,
                  cvr: cvr.value,
                  phone: phone.value,
                  desc: desc.value,
                  logo: logo.value,
                  userID: cred.user.uid
                })
              })
            history.push ('/admin');
        
        }
        catch (error) {
            alert(error);
        }
    }, [history]);
    return (
        <div>
        <h1>Create Owner Component</h1>
        <form onSubmit={handleSignUp}>
              <div id="form">
              <h1>Sign Up Page</h1>
                <label for="email">Email</label>
                <input type="email" name="email" />
                
                <label for="password">Password</label>
                <input type="password" name="password" />

                <label for="Navn">Navn</label>
                <input 
                    type="text"
                    name="fname"
                    value={fname}
                    onChange={e => setName(e.target.value)} 
                />
                <label for="Adresse">Adresse</label>
                <input 
                    type="text"
                    name="adresse"
                    value={adresse}
                    onChange={e => setAdresse(e.target.value)} 
                />
                <label for="companyID">companyID</label>
                <input 
                    type="text"
                    name="companyID"
                    value={companyID}
                    onChange={e => setCompanyID(e.target.value)} 
                />
                <label for="cvr">CVR</label>
                <input 
                    type="text"
                    name="cvr"
                    value={cvr}
                    onChange={e => setCvr(e.target.value)} 
                />
                <label for="phone">phone</label>
                <input 
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)} 
                />
                <label for="desc">Beskrivelse</label>
                <input 
                    type="text"
                    name="desc"
                    value={desc}
                    onChange={e => setDesc(e.target.value)} 
                />
                <label for="desc">Logo</label>
                <input 
                    type="text"
                    name="logo"
                    value={logo}
                    onChange={e => setLogo(e.target.value)} 
                />
                
                <input type="submit" value="Sign Up" />
              </div>
            </form>
        </div>
    )
}

export default withRouter (CreateOwner);