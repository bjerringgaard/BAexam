import React from 'react'

function CompanyPage_AddItem() {
  return (
  <div className="ownerEdit-addItem">
    <form>
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
      value={file}
      onChange={e => setFile(e.target.value)}
      />
      <label>Messe</label>
      <input
      value={messe}
      onChange={e => setMesse(e.target.value)}
      />
      <br/>
      <br/>
      <button onClick={addItem}>Create</button>
    </form>
  </div>
  )
}
export default CompanyPage_AddItem;
