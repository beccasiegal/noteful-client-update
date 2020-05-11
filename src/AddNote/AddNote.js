import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import './AddNote.css';


class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folder: {
        value: ''
      }
    }
  }
  noteFolderInput=React.createRef();
  validateName = () => {
    const name = this.state.name.value.trim()
    if (name.length === 0) return 'Name cannot be empty'
  }
  validateContent = () => {
    const content = this.state.content.value.trim()
    if (content.length === 0) return 'Did you forget something?'
  }

  handleAddNote = (e) => {
    e.preventDefault();
    const dateAndTime = new Date();

    const bodyContent = {
      note_name: this.state.name.value,
      folderid: this.state.folder.value,
      content: this.state.content.value,
      modified: dateAndTime
    }
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bodyContent)
    }
    fetch(config.API_ENDPOINT + '/notes', options)
      .then(rsp => {
        if (!rsp.ok) console.log(rsp)
        else return rsp.json()
      })
      .then(note => {
        this.context.addNote(note);
        this.props.history.push(`/`);
      })
      .catch(e => {
        console.log(e)
      })
  }

  updateName(name) {
    this.setState({
      name: {
        value: name,
        touched: true
      }
    });
  }

  updateContent(content) {
    this.setState({
      content: {
        value: content,
        touched: true
      }
    });
  }
  updateSelect(folder) {
    this.setState({
      folder: {
        value: folder,
      }
    });

  }

  selectOptions = () => {
    const folderOptions = this.context.folders.map(folder => {
      return (
        <option value={folder.id} key={folder.id}>{folder.folder_name}</option>
      )
    })
    return folderOptions
  }

  render() {
    const nameError = this.validateName()
    const contentError = this.validateContent()
    return (
      <div>
        <form className='addNote' onSubmit={e => this.handleAddNote(e)}>
                    <h2>Add a Note</h2>
                    <label htmlFor='noteName'>Note Name*</label>
                    <input 
                        type='text' 
                        name='noteName' 
                        id='noteName'
                        ref={this.noteNameInput} 
                        onChange={e => this.updateName(e.target.value)}
                        aria-label='Enter name for Note'
                        aria-required='true'
                        aria-describedby='noteNameFeedback'
                    />
            
                    <label htmlFor='noteContent'>Note Content</label>
                    <textarea name='noteContent' id='noteContent' ref={this.noteContentInput}></textarea>
                    <label htmlFor='noteFolder'>Folder</label>
                    <select
                        htmlFor='noteFolder'
                        id='noteFolder'
                        ref={this.noteFolderInput}
                        aria-label='Select a folder to store note'
                        aria-required='false'
                    >
                        {this.props.folders.map (folder=> (
                          <option 
                          key={folder.id} name={folder.id}>
                            {folder.name}
                          </option>

                        ))}
                    </select>
                    <button 
                        type='submit'
                        className='submitButton'
        
                    >
                        Submit
                    </button>
                </form>
      </div>
    );
  }
}
AddNote.contextType = ApiContext
export default AddNote;

//  {this.state.name.touched && (<ValidateError message={this.validateName(this.state.name.value)} />)}