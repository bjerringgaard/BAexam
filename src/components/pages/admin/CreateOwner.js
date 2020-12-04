import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../../Firebase'

const CreateOwner = ({ history }) => {
    const [name, setName] = React.useState([]);
    const [adresse, setAdresse] = React.useState([]);
    const [companyID, setCompanyID] = React.useState([]);
    const [cvr, setCvr] = React.useState([]);
    const [phone, setPhone] = React.useState([]);
    const [desc, setDesc] = React.useState([]);
    const [logo, setLogo] = React.useState([]);
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password, name, adresse, companyID, cvr, phone, desc, logo } = event.target.elements;
        const db = firebase.firestore()
        //const user = firebase.auth()
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(cred => {
                    db.collection('accounts').doc(cred.user.uid).set({
                        admin: false,
                        company: true,
                        name: name.value,
                        adresse: adresse.value,
                        companyID: companyID.value,
                        cvr: cvr.value,
                        phone: phone.value,
                        desc: desc.value,
                        logo: logo.value,
                        id: cred.user.uid
                    })
                })
            history.push('/admin');

        }
        catch (error) {
            alert(error);
        }
    }, [history]);

return (
    <div className="comp-wrapper">
        <h1>Tilføj Firma</h1>
        <form onSubmit={handleSignUp}>
            
                <div className="grid-x grid-margin-x create-owner">
                    <div className="cell small-12 medium-6">
                        <label>Email</label>
                        <input type="email" name="email" />
                    </div>
                    <div className="cell small-12 medium-6">
                        <label>Password</label>
                        <input type="password" name="password" />
                    </div>
                    <div className="cell small-12 medium-6">
                        <label>Firma Navn</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="cell small-12 medium-6">
                        <label>Adresse</label>
                        <input
                            type="text"
                            name="adresse"
                            value={adresse}
                            onChange={e => setAdresse(e.target.value)}
                        />
                    </div>
                    <div className="cell small-12 medium-6">
                        <label>Company ID (URL)</label>
                        <input
                            type="text"
                            name="companyID"
                            value={companyID}
                            onChange={e => setCompanyID(e.target.value)}
                        />
                    </div>
                    <div className="cell small-12 medium-6">
                        <label>CVR</label>
                        <input
                            type="text"
                            name="cvr"
                            value={cvr}
                            onChange={e => setCvr(e.target.value)}
                        />
                    </div>
                    <div className="cell small-12 medium-6">
                        <label>Telefon</label>
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="cell small-12 medium-6">
                        <label>Beskrivelse</label>
                        <input
                            type="text"
                            name="desc"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="cell small-12 medium-6">
                        <label>Logo</label>
                        <input
                            type="text"
                            name="logo"
                            value={logo}
                            onChange={e => setLogo(e.target.value)}
                        />
                    </div>
                </div>
            <button type="submit" value="Sign Up">Tilføj Firma Her</button>
        </form>
    </div>
)
}

export default withRouter(CreateOwner);