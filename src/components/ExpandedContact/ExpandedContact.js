import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';

class ExpandedContact extends React.Component {
  static contextType = MovingdayContext

  render() {
    // eslint-disable-next-line
    const contact = this.context.contacts.find(contact => contact.id == this.props.match.params.contact_id)
    return (
      <section>
        <header>
          <h2>{contact.name}</h2>
        </header>
        <p>Name: {contact.name}</p>
        {contact.phone && <p>Phone Number: {contact.phone}</p>}
        {contact.email && <p>Email Address: {contact.email}</p>}
        {contact.notes && <p>Notes: {contact.notes}</p>}
        <button type='button' onClick={e => this.props.history.push('/contactform')}>Edit</button>
        <button type='button'>Delete</button>
        <button type='button' onClick={this.props.history.goBack}>Go Back</button>
      </section>
    )
  }
}

export default withRouter(ExpandedContact);