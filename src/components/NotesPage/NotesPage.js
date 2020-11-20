import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import UsersApiService from '../../services/users-api-service';

class NotesPage extends React.Component {
  state = {
    notes: ''
  }

  static contextType = MovingdayContext

  componentDidMount() {
    this.context.clearError()
    this.setState({ notes: this.context.user.notes })
  }

  handleChange = ev => {
    this.setState({ notes: ev.target.value })
  }

  handleUpdateNotes = e => {
    e.preventDefault();
    this.context.clearError()
    UsersApiService.patchUser({ notes: this.state.notes })
      .then(this.context.updateUser({ notes: this.state.notes }))
      .catch(res => this.context.setError(res.error))
  }

  render() {
    const { error } = this.context
    return (
      <section className='notes page'>
        <h2>
          Notes
        </h2>
        <p>{this.context.user.notes}</p>
        {error && <p>{error}</p>}
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