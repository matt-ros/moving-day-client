import React from 'react';
import { Redirect } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ContactsApiService from '../../services/contacts-api-service';

class ContactForm extends React.Component {
  state = {
    contact: {},
    changedFields: new Set()
  };

  static contextType = MovingdayContext;

  componentDidMount() {
    if (this.props.match.params.contact_id) {
      // eslint-disable-next-line
      const contact = this.context.contacts.find(contact => contact.id == this.props.match.params.contact_id);
      this.setState({ contact, origContact: contact });
    }
    this.context.clearError();
  }

  resetVals = ev => {
    const { contact_name, contact_phone, contact_email, contact_notes } = ev.target;
    contact_name.value = '';
    contact_phone.value = '';
    contact_email.value = '';
    contact_notes.value = '';
  }

  handleSubmitContact = ev => {
    ev.preventDefault();
    this.context.clearError();
    const contact = {};
    if (this.state.changedFields.size === 0) {
      return this.context.setError('You must edit at least one field');
    }

    const changedFields = Array.from(this.state.changedFields);
    for (let i = 0; i < changedFields.length; i++) {
      contact[changedFields[i]] = this.state.contact[changedFields[i]];
    }

    (this.props.match.params.contact_id)
      ? ContactsApiService.patchContact(this.props.match.params.contact_id, contact)
          .then(this.context.updateContact(this.props.match.params.contact_id, contact))
          .then(this.resetVals(ev))
          .then(this.props.history.goBack)
          .catch(res => {
            if (res.error === 'Unauthorized request') {
              TokenService.clearAuthToken();
              this.context.onLogOut();
              this.context.setError(res.error);
              this.props.history.push('/');
            } else {
              this.context.setError(res.error);
            }
      })
      : ContactsApiService.postContact(contact)
          .then(this.context.addContact)
          .then(this.resetVals(ev))
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

  handleChange = ev => {
    const changedFields = this.state.changedFields.add(ev.target.name);
    const newInfo = {};
    newInfo[ev.target.name] = ev.target.value;
    const newContact = {
      ...this.state.contact,
      ...newInfo
    };
    this.setState({ contact: newContact, changedFields });
  }

  handleFocus = ev => {
    const { origContact } = this.state;
    if (origContact && ev.target.value === origContact[ev.target.name]) {
      ev.target.value = '';
    }
  }

  handleBlur = ev => {
    const { origContact } = this.state;
    if (origContact && ev.target.value === '') {
      ev.target.value = origContact[ev.target.name];
    }
  }

  render() {
    const { contact } = this.state;
    if (!contact) {
      return <Redirect to="/contacts" />
    }

    const { error } = this.context;

    return (
      <>
        <section className="contacts">
          <header role="banner">
            <h1>{(this.props.match.params.contact_id) ? 'Edit Contact' : 'Create Contact'}</h1>
          </header>
          {error && <p>{error}</p>}
          <form className="form" id="contact_form" onSubmit={this.handleSubmitContact}>
            <div>
              <label htmlFor="contact_name">Contact Name</label>
              <input type="text" name="contact_name" id="contact_name" placeholder="Steve" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} defaultValue={(Object.entries(contact).length) ? this.state.contact.contact_name : ''} required />
            </div>
            <div>
              <label htmlFor="contact_phone">Phone Number</label>
              <input type="tel" name="contact_phone" id="contact_phone" placeholder="123-456-7890" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} defaultValue={(Object.entries(contact).length) ? this.state.contact.contact_phone : ''} />
            </div>
            <div>
              <label htmlFor="contact_email">Email Address</label>
              <input type="email" name="contact_email" id="contact_email" placeholder="steve@gmail.com" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} defaultValue={(Object.entries(contact).length) ? this.state.contact.contact_email : ''} />
            </div>
            <div>
              <label htmlFor="contact_notes">Notes</label>
              <input type="text" name="contact_notes" id="contact_notes" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} defaultValue={(Object.entries(contact).length) ? this.state.contact.contact_notes : ''} />
            </div>
          </form>
          <button type="submit" form="contact_form">Save</button>
          <button type="button" onClick={this.props.history.goBack}>Go Back</button>
        </section>
      </>
    );
  }
}

export default ContactForm;