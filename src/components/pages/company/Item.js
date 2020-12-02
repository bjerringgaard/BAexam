import React from 'react'
import {useParams, Link} from 'react-router-dom';
import firebase from '../../../Firebase'

export const Item = ({messe}) => {
  const [title, setTitle] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [fileType, setFileType] = React.useState([]);

  const db = firebase.firestore();
  const { companyID } = useParams();

  // file uploader
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);
  const types = ['application/pdf']

  const fileHandler = (e) => {
    let selected = e.target.files[0];
    console.log(selected);

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    }
    else {
      setFile(null);
      setError('File not Supported')
    }
  }

  // Add item
  const addItem = (messe) => {

    db
    .collection('items')
    .add({
      companyID: companyID,
      itemTitle: title,
      itemDesc: desc,
      itemFileType: fileType,
      messeID: messe,
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
      <input type="file" onChange={fileHandler} />
      <div className="output">
        {error && <div className="error"> { error } </div> }
        {file && <div className="error"> { file.name } </div> }
      </div>
      <br/>
      <Link onClick={() => addItem(messe.messeID)}>Create</Link>
    </form>
  </div>
  );
};
