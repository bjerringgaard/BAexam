import React, { useCallback } from 'react';
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
        const { email, password, fname, adresse, companyID, cvr, phone, desc, logo } = event.target.elements;
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
            history.push('/admin');

        }
        catch (error) {
            alert(error);
        }
    }, [history]);

return (
    <div>
        <h1>Tilføj Firma</h1>
        <form onSubmit={handleSignUp}>
            
                <div className="grid-x grid-margin-x create-owner">
                    <div className="cell small-6">
                        <span class="label">Email</span>
                        <input type="email" name="email" />
                    </div>
                    <div className="cell small-6">
                        <span class="label">Password</span>
                        <input type="password" name="password" />
                    </div>
                    <div className="cell small-6">
                        <span class="label">Firma Navn</span>
                        <input
                            type="text"
                            name="fname"
                            value={fname}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="cell small-6">
                        <span class="label">Adresse</span>
                        <input
                            type="text"
                            name="adresse"
                            value={adresse}
                            onChange={e => setAdresse(e.target.value)}
                        />
                    </div>
                    <div className="cell small-6">
                        <span class="label">Company ID (URL)</span>
                        <input
                            type="text"
                            name="companyID"
                            value={companyID}
                            onChange={e => setCompanyID(e.target.value)}
                        />
                    </div>
                    <div className="cell small-6">
                        <span class="label">CVR</span>
                        <input
                            type="text"
                            name="cvr"
                            value={cvr}
                            onChange={e => setCvr(e.target.value)}
                        />
                    </div>
                    <div className="cell small-6">
                        <span class="label">Telefon</span>
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="cell small-6">
                        <span class="label">Beskrivelse</span>
                        <input
                            type="text"
                            name="desc"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="cell small-6">
                        <span class="label">Logo</span>
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