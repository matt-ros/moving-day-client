import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ContactsApiService from '../../services/contacts-api-service';
import TokenService from '../../services/token-service';

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
  
  findNextId = (index) => {
    const nextIndex = (index === this.context.contacts.length - 1) ? 0 : index + 1;
    return this.context.contacts[nextIndex].id;
  }

  findPrevId = (index) => {
    const prevIndex = (index === 0) ? this.context.contacts.length - 1 : index - 1;
    return this.context.contacts[prevIndex].id;
  }

  render() {
    // eslint-disable-next-line
    const contactIndex = this.context.contacts.findIndex(contact => contact.id == this.props.match.params.contact_id);
    if (contactIndex === -1) {
      return <Redirect to="/contacts" />
    }

    const contact = this.context.contacts[contactIndex];
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
          <br />
          <button type="button" onClick={e => this.props.history.push(`/contacts/${this.findPrevId(contactIndex)}`)}>Previous</button>
          <button type="button" onClick={e => this.props.history.push('/contacts')}>Go Back</button>
          <button type="button" onClick={e => this.props.history.push(`/contacts/${this.findNextId(contactIndex)}`)}>Next</button>
        </div>
      </section>
    );
  }
}

export default withRouter(ExpandedContact);
