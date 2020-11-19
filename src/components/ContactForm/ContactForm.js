import React from 'react';
import MovingdayContext from '../../context/MovingdayContext';
import ContactsApiService from '../../services/contacts-api-service';

class ContactForm extends React.Component {
  state = {
    contact: {},
    changedFields: new Set()
  }

  static contextType = MovingdayContext

  componentDidMount() {
    if (this.props.match.params.contact_id) {
      // eslint-disable-next-line
      const contact = this.context.contacts.find(contact => contact.id == this.props.match.params.contact_id)
      this.setState({ contact })
    }
    this.context.clearError()
  }

  resetVals = ev => {
    const { contact_name, contact_phone, contact_email, contact_notes } = ev.target
    contact_name.value = ''
    contact_phone.value = ''
    contact_email.value = ''
    contact_notes.value = ''
  }



  handleSubmitContact = ev => {
    ev.preventDefault()
    this.context.clearError()
    const contact = {}
    if (this.state.changedFields.size === 0) {
      return this.context.setError('You must edit at least one field')
    }
    const changedFields = Array.from(this.state.changedFields)
    for (let i = 0; i < changedFields.length; i++) {
      contact[changedFields[i]] = this.state.contact[changedFields[i]]
    }
    (this.props.match.params.contact_id)
      ? ContactsApiService.patchContact(this.props.match.params.contact_id, contact)
          .then(this.context.updateContact(this.props.match.params.contact_id, contact))
          .then(this.resetVals(ev))
          .then(this.props.history.goBack)
          .catch(this.context.setError)
      : ContactsApiService.postContact(contact)
          .then(this.context.addContact)
          .then(this.resetVals(ev))
          .catch(this.context.setError)
  }

  handleChange = ev => {
    const changedFields = this.state.changedFields.add(ev.target.name)
    const newInfo = {}
    newInfo[ev.target.name] = ev.target.value
    const newContact = {
      ...this.state.contact,
      ...newInfo
    }
    this.setState({ contact: newContact, changedFields })
  }

  render() {
    const { contact } = this.state
    const { error } = this.context
    return (
      <>
        <header role="banner">
        <h1>{(this.props.match.params.contact_id) ? 'Edit Contact' : 'Create Contact'}</h1>
        </header>
        <section>
          {error && <p>An error occurred</p>}
          <form id='contact_form' onSubmit={this.handleSubmitContact}>
            <div>
              <label htmlFor="contact_name">Contact Name</label>
              <input type="text" name="contact_name" id="contact_name" placeholder="Steve" onChange={this.handleChange} defaultValue={(Object.entries(contact).length) ? this.state.contact.contact_name : ''} required />
            </div>
            <div>
              <label htmlFor="contact_phone">Phone Number</label>
              <input type="tel" name="contact_phone" id="contact_phone" placeholder="123-456-7890" onChange={this.handleChange} defaultValue={(Object.entries(contact).length) ? this.state.contact.contact_phone : ''} />
            </div>
            <div>
              <label htmlFor="contact_email">Email Address</label>
              <input type="text" name="contact_email" id="contact_email" placeholder="steve@gmail.com" onChange={this.handleChange} defaultValue={(Object.entries(contact).length) ? this.state.contact.contact_email : ''} />
            </div>
            <div>
              <label htmlFor="contact_notes">Notes</label>
              <textarea name="contact_notes" id="contact_notes" onChange={this.handleChange} defaultValue={(Object.entries(contact).length) ? this.state.contact.contact_notes : ''} />
            </div>
          </form>
          <button type="submit" form='contact_form'>Save</button>
          <button type='button' onClick={this.props.history.goBack}>Go Back</button>
        </section>
      </>
    )
  }
}

export default ContactForm;