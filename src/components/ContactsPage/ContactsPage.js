import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import Contact from '../Contact/Contact';

class ContactsPage extends React.Component {
  state = {
    filter: '',
    filter_type: 'contact_name'
  }

  static contextType = MovingdayContext

  componentDidMount() {
    this.context.clearError()
  }
  
  handleChangeType = ev => {
    this.setState({ filter_type: ev.target.value })
  }

  handleChangeFilter = ev => {
    this.setState({ filter: ev.target.value })
  }

  render() {
    const contacts = this.state.filter
      ? this.context.contacts.filter(contact => (
        contact[this.state.filter_type] && contact[this.state.filter_type].toLowerCase().includes(this.state.filter.toLowerCase())
      ))
      : this.context.contacts

    const { error } = this.context

    return (
      <section className='contacts page'>
        <header>
          <h2>
            Contacts
          </h2>
        </header>
        {error && <p>{error}</p>}
        <label htmlFor='filter'>Filter</label>{' '}
        <input type='text' name='filter' id='filter' onChange={this.handleChangeFilter} />
        <br />
        <div className='unit'>
          <input type='radio' name='filter_type' id='contact_name' value='contact_name' checked={this.state.filter_type === 'contact_name'} onChange={this.handleChangeType} />
          <label htmlFor='contact_name'>Name</label>
        </div>
        {' '}
        <div className='unit'>
          <input type='radio' name='filter_type' id='contact_phone' value='contact_phone' checked={this.state.filter_type === 'contact_phone'} onChange={this.handleChangeType} />
          <label htmlFor='contact_phone'>Phone Number</label>
        </div>
        {' '}
        <div className='unit'>
          <input type='radio' name='filter_type' id='contact_email' value='contact_email' checked={this.state.filter_type === 'contact_email'} onChange={this.handleChangeType} />
          <label htmlFor='contact_email'>Email Address</label>
        </div>
        {' '}
        <div className='unit'>
          <input type='radio' name='filter_type' id='contact_notes' value='contact_notes' checked={this.state.filter_type === 'contact_notes'} onChange={this.handleChangeType} />
          <label htmlFor='contact_notes'>Notes</label>
        </div>
        <ul className='contacts-list'>
          {contacts.map(contact =>
            <Contact key={contact.id} contact={contact} history={this.props.history} />
          )}
        </ul>
        <button type='button' onClick={e => this.props.history.push('/contactform')}>New Contact</button>
      </section>
    )
  }
}

export default withRouter(ContactsPage);