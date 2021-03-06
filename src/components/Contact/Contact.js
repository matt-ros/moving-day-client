import React from 'react';
import { Link } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ContactsApiService from '../../services/contacts-api-service';
import TokenService from '../../services/token-service';

class Contact extends React.Component {
  static contextType = MovingdayContext;

  handleDelete= () => {
    ContactsApiService.deleteContact(this.props.contact.id)
      .then(this.context.deleteContact(this.props.contact.id))
      .catch(res => {
        if (res.error === 'Unauthorized request') {
          TokenService.clearAuthToken();
          this.context.onLogOut();
          this.context.setError(res.error);
          this.props.history.push('/');
        } else {
          this.context.setError(res.error);
        }
      });
  }
  
  render() {
    return (
      <li className="contact">
        <h3>
          <Link to={`/contacts/${this.props.contact.id}`}>
            {this.props.contact.contact_name}
          </Link>
        </h3>
        <button type="button" onClick={e => this.props.history.push(`/contactform/${this.props.contact.id}`)}>Edit</button>
        <button type="button" onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
}

export default Contact;