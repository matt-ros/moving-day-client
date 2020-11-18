import React from 'react';
import { Link } from 'react-router-dom';

class Contact extends React.Component {
  render() {
    return (
      <li>
        <h3>
          <Link to={`/contacts/${this.props.contact.id}`}>
            {this.props.contact.contact_name}
          </Link>
        </h3>
        <button type='button' onClick={e => this.props.history.push('/contactform')}>Edit</button>
        <button type='button'>Delete</button>
      </li>
    )
  }
}

export default Contact;