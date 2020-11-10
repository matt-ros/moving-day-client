import React from 'react';
import { withRouter } from 'react-router-dom';

class ExpandedContact extends React.Component {
  render() {
    return (
      <section>
        <header>
          <h2>{this.props.contact.name}</h2>
        </header>
        <p>Name: {this.props.contact.name}</p>
        {this.props.contact.phone && <p>Phone Number: {this.props.contact.phone}</p>}
        {this.props.contact.email && <p>Email Address: {this.props.contact.email}</p>}
        {this.props.contact.notes && <p>Notes: {this.props.contact.notes}</p>}
        <button type='button' onClick={e => this.props.history.push('/contactform')}>Edit</button>
        <button type='button'>Delete</button>
        <button type='button' onClick={this.props.history.goBack}>Go Back</button>
      </section>
    )
  }
}

export default withRouter(ExpandedContact);