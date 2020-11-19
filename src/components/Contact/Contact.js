import React from 'react';
import { Link } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ContactsApiService from '../../services/contacts-api-service';

class Contact extends React.Component {
  static contextType = MovingdayContext

  handleDelete= () => {
    ContactsApiService.deleteContact(this.props.contact.id)
      .then(this.context.deleteContact(this.props.contact.id))
  }
  render() {
    return (
      <li>
        <h3>
          <Link to={`/contacts/${this.props.contact.id}`}>
            {this.props.contact.contact_name}
          </Link>
        </h3>
        <button type='button' onClick={e => this.props.history.push(`/contactform/${this.props.contact.id}`)}>Edit</button>
        <button type='button' onClick={this.handleDelete}>Delete</button>
      </li>
    )
  }
}

export default Contact;