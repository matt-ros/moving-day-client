import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import UsersApiService from '../../services/users-api-service';

class NotesPage extends React.Component {
  state = {
    notes: ''
  }

  static contextType = MovingdayContext

  handleChange = (e) => {
    this.setState({ notes: e.target.value })
  }

  handleUpdateNotes = e => {
    e.preventDefault();
    UsersApiService.patchUser({ notes: this.state.notes })
      .then(this.context.updateUser({ notes: this.state.notes }))
  }

  render() {
    return (
      <section className='notes page'>
        <h2>
          Notes
        </h2>
        <p>{this.context.user.notes}</p>
        <form id='note_form' onSubmit={this.handleUpdateNotes}>
          <textarea id='notes' name='notes' cols='30' rows='5' defaultValue={this.context.user.notes} onChange={this.handleChange} />
          <br />
          <button type='submit' form='note_form'>Update</button>
        </form>
      </section>
    )
  }
}

export default withRouter(NotesPage);