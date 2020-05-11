import React, { Component } from 'react'
import './AddFolder.css'
import config from '../config';
import ApiContext from '../ApiContext';

class AddFolder extends Component {
  handleAddFolder = folderName => {
    const bodyContent = {
      name: folderName
    }
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bodyContent)
    }
    fetch(config.API_ENDPOINT + '/folders', options)
      .then(rsp => {
        if (!rsp.ok) throw new Error('Whoops')
        else return rsp.json()
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.push(`/`);
      })
      .catch(e => {
        console.log(e)
      })
  }
  render() {
    return (
      <div className='addFolder'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleAddFolder(e.target.folderName.value)
          }}
        >
          <label
            htmlFor='folderName'
          >
            Name
         </label>
          <input
            type='text'
            id='folderName'
            required
          >
          </input>
          <input id="folder-submit" type='submit' value='Add Folder'></input>
        </form>
      </div>
    );
  }
}
AddFolder.contextType = ApiContext
export default AddFolder;