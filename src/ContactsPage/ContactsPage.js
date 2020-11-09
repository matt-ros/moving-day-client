import React from 'react';
import { withRouter } from 'react-router-dom';
import Contact from '../Contact/Contact';

class ContactsPage extends React.Component {
  render() {
    return (
      <section className='contacts page'>
        <header>
          <h2>
            Contacts
          </h2>
        </header>
        <label htmlFor='filter'>Filter</label>{' '}
        <input type='text' name='filter' id='filter' onChange={this.handleChangeFilter} />
        <br />
        <div className='unit'>
          <input type='radio' name='filter_type' id='contact_name' value='name' />
          <label htmlFor='contact_name'>Name</label>
        </div>
        <div className='unit'>
          <input type='radio' name='filter_type' id='contact_phone' value='phone' />
          <label htmlFor='contact_phone'>Phone Number</label>
        </div>
        <div className='unit'>
          <input type='radio' name='filter_type' id='contact_email' value='email' />
          <label htmlFor='contact_email'>Email Address</label>
        </div>
        <div className='unit'>
          <input type='radio' name='filter_type' id='contact_notes' value='notes' />
          <label htmlFor='contact_notes'>Notes</label>
        </div>
        <ul>
          {this.props.contacts.map(contact =>
            <Contact key={contact.id} contact={contact} history={this.props.history} />
          )}
        </ul>
        <button type='button' onClick={e => this.props.history.push('/contactform')}>New Contact</button>
      </section>
    )
  }
}

export default withRouter(ContactsPage);