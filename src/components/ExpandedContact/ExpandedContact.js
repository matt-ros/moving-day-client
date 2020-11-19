import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ContactsApiService from '../../services/contacts-api-service';

class ExpandedContact extends React.Component {
  static contextType = MovingdayContext

  handleDelete = () => {
    const contactId = this.props.match.params.contact_id
    ContactsApiService.deleteContact(contactId)
      .then(this.context.deleteContact(this.props.match.params.contact_id))
      .then(this.props.history.push('/contacts'))
  }

  render() {
    // eslint-disable-next-line
    const contact = this.context.contacts.find(contact => contact.id == this.props.match.params.contact_id)
    return (
      <section>
        <header>
          <h2>{contact.contact_name}</h2>
        </header>
        <p>Name: {contact.contact_name}</p>
        {contact.contact_phone && <p>Phone Number: {contact.contact_phone}</p>}
        {contact.contact_email && <p>Email Address: {contact.contact_email}</p>}
        {contact.contact_notes && <p>Notes: {contact.contact_notes}</p>}
        <button type='button' onClick={e => this.props.history.push(`/contactform/${contact.id}`)}>Edit</button>
        <button type='button' onClick={this.handleDelete}>Delete</button>
        <button type='button' onClick={this.props.history.goBack}>Go Back</button>
      </section>
    )
  }
}

export default withRouter(ExpandedContact);