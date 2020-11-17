import React from 'react';
import { withRouter } from 'react-router-dom';
import UsersApiService from '../../services/users-api-service';

class NotesPage extends React.Component {
  state = {
    notes: ''
  }

  handleChange = (e) => {
    this.setState({ notes: e.target.value })
  }

  handleUpdateNotes = e => {
    e.preventDefault();
    UsersApiService.patchUser({ notes: this.state.notes })
      .then(this.props.updateUser({ notes: this.state.notes }))
  }

  render() {
    return (
      <section className='notes page'>
        <h2>
          Notes
        </h2>
        <p>{this.props.notes}</p>
        <form id='note_form' onSubmit={this.handleUpdateNotes}>
          <textarea id='notes' name='notes' cols='30' rows='5' defaultValue={this.props.notes} onChange={this.handleChange} />
          <br />
          <button type='submit' form='note_form'>Update</button>
        </form>
      </section>
    )
  }
}

export default withRouter(NotesPage);