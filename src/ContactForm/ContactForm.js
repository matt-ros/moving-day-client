import React from 'react';

class ContactForm extends React.Component {
  handleSubmitContact = e => {
    e.preventDefault();
    console.log('submit contact')
    const { contact_name, contact_phone, contact_email, contact_notes } = e.target;
    contact_name.value = '';
    contact_phone.value = '';
    contact_email.value = '';
    contact_notes.value = '';
  }

  render() {
    return (
      <>
        <header role="banner">
          <h1>Create/Edit Contact</h1>
        </header>
        <section>
          <form id='contact_form' onSubmit={this.handleSubmitContact}>
            <div>
              <label htmlFor="contact_name">Contact Name</label>
              <input type="text" name="contact_name" id="contact_name" placeholder="Steve" />
            </div>
            <div>
              <label htmlFor="contact_phone">Phone Number</label>
              <input type="tel" name="contact_phone" id="contact_phone" placeholder="123-456-7890" />
            </div>
            <div>
              <label htmlFor="contact_email">Email Address</label>
              <input type="text" name="contact_email" id="contact_email" placeholder="steve@gmail.com" />
            </div>
            <div>
              <label htmlFor="contact_notes">Notes</label>
              <textarea name="contact_notes" id="contact_notes" />
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