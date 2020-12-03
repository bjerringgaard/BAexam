import React from 'react';
import {useParams} from 'react-router-dom';
import firebase from '../../../Firebase';

export const Item = ({messe}) => {
  const [title, setTitle] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [fileType, setFileType] = React.useState([]);
  const types = ['application/pdf']

  const [hidden, setHidden] = React.useState(true);
  
  const [file, setFile] = React.useState(null);
  const [url, setUrl] = React.useState(null); 
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState(null);

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

  // Add to db
  const addItem = (messe) => {

    db
    .collection('items')
    .add({
      companyID: companyID,
      itemTitle: title,
      itemDesc: desc,
      itemFileType: fileType,
      messeID: messe,
      url: url
    })
    .then (() => {
      setTitle('')
      setDesc('')
      setFileType('')
    })
  }

  return (
    <div className="ownerEdit-addItem">
      <form id={messe.messeID}>
        <label>Title</label>
        <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        />
        <label>Description</label>
        <input
        value={desc}
        onChange={e => setDesc(e.target.value)}
        />
        <label>File</label>
        <input
        value={fileType}
        onChange={e => setFileType(e.target.value)}
        />
        <input type="file" onChange={fileUpload} />
        { error && <div className="error">{ error }</div>}
        <br/>
        {hidden ? '' : <button type="button" onClick={() => addItem(messe.messeID)}>Create</button>}
      </form>
    </div>
    );
};

