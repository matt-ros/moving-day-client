import React from 'react';
import { withRouter } from 'react-router-dom';

class NotesPage extends React.Component {
  handleUpdateNotes = e => {
    e.preventDefault();
    console.log('submit notes ' + e.target.notes.value)
  }

  render() {
    return (
      <section className='notes page'>
        <h2>
          Notes
        </h2>
        <p>{this.props.notes}</p>
        <form id='note_form' onSubmit={this.handleUpdateNotes}>
          <textarea id='notes' name='notes' cols='30' rows='5' defaultValue={this.props.notes} />
          <br />
          <button type='submit' form='note_form'>Update</button>
        </form>
      </section>
    )
  }
}

export default withRouter(NotesPage);