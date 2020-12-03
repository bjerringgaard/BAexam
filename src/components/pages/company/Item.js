import React from 'react';
import {useParams} from 'react-router-dom';
import firebase from '../../../Firebase';

export const Item = () => {
  const [title, setTitle] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [messe, setMesse] = React.useState([]);
  const types = ['application/pdf']

  const [hidden, setHidden] = React.useState(true);
  
  const [file, setFile] = React.useState(null);
  const [url, setUrl] = React.useState(null); 
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState(null);
  
  const [messeData, setMesseData] = React.useState([]);

  const db = firebase.firestore();
  const { companyID } = useParams();

  // File Upload
  const fileUpload = (e) => {
    let file = e.target.files[0];

    if (file && types.includes(file.type)) {
      setFile(file);
      setError('');

      const storageRef = firebase.storage().ref('files/' + file.name);

      let uploadTask = storageRef.put(file)

      uploadTask.on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
      }, (error) => {
        setError(error);
      }, async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url)
        console.log('file: ', url)
        setHidden(false)
      })
    }
    else {
      setFile(null);
      setError('File not Supported')
    }
  }

  // Read Messe
  React.useEffect(() => {
    const messeDeltager = firebase
    db
    .collection('messe')
    .where('deltager', 'array-contains', companyID)
    .onSnapshot((snapshot) => {
      const messeData = snapshot
      .docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setMesseData(messeData)
    })
    return () => messeDeltager
  },[])

  // Add to db
  const addItem = () => {
    db
    .collection('items')
    .add({
      companyID: companyID,
      itemTitle: title,
      itemDesc: desc,
      url: url,
      messeID: messe,
    })
    .then (() => {
      setTitle('')
      setDesc('')
    })
  }

  return (
        <div className="ownerEdit-addItem">
          <h4>Tilføj indhold</h4>
          <form>
            <label>Messe</label>
              <select onChange={e => setMesse(e.target.value)}>
              <option value='null'>Vælg venligst</option>
                {messeData.map (messe => (
                  <option value={messe.messeID}>{messe.messeTitle}</option>
                ))}
              </select>

            <label>Title</label>
            <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            />

            <label>Description</label>
            <input
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            />

            <input type="file" onChange={fileUpload} />
            { error && <div className="error">{ error }</div>}
            <br/>
            {hidden ? <button type="button" className="disabled">Ingen fil</button> : <button className="active" type="button" onClick={() => addItem()}>Tilføj</button>}
          </form>
        </div>
    );
};

