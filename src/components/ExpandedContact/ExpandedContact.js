import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ContactsApiService from '../../services/contacts-api-service';

class ExpandedContact extends React.Component {
  static contextType = MovingdayContext;

  componentDidMount() {
    this.context.clearError();
  }

  handleDelete = () => {
    const contactId = this.props.match.params.contact_id;
    ContactsApiService.deleteContact(contactId)
      .then(this.context.deleteContact(this.props.match.params.contact_id))
      .then(this.props.history.push('/contacts'))
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
    // eslint-disable-next-line
    const contact = this.context.contacts.find(contact => contact.id == this.props.match.params.contact_id);
    if (!contact) {
      return <Redirect to="/contacts" />
    }

    const { error } = this.context;

    return (
      <section>
        <div className="contact">
          <header>
            <h2>{contact.contact_name}</h2>
          </header>
          {error && <p>{error}</p>}
          {contact.contact_phone && <p><strong>Phone Number: </strong>{contact.contact_phone}</p>}
          {contact.contact_email && <p><strong>Email Address: </strong>{contact.contact_email}</p>}
          {contact.contact_notes && <p><strong>Notes: </strong>{contact.contact_notes}</p>}
          <button type="button" onClick={e => this.props.history.push(`/contactform/${contact.id}`)}>Edit</button>
          <button type="button" onClick={this.handleDelete}>Delete</button>
          <button type="button" onClick={this.props.history.goBack}>Go Back</button>
        </div>
      </section>
    );
  }
}

export default withRouter(ExpandedContact);