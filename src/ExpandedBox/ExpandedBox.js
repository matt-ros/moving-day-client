import React from 'react';
import { withRouter } from 'react-router-dom';

class ExpandedBox extends React.Component {
  render() {
    const inventory = this.props.box.inventory.map((item, index) =>
      <li key={index}>
        {item}
      </li>
    )
    return (
      <section>
        <header>
          <h2>{this.props.box.name}</h2>
        </header>
        <p>Name: {this.props.box.name}</p>
        {this.props.box.destination && <p>Destination: {this.props.box.destination}</p>}
        {this.props.box.transport && <p>Transport Location: {this.props.box.transport}</p>}
        {this.props.box.notes && <p>Notes: {this.props.box.notes}</p>}
        <h3>Inventory</h3>
        {this.props.box.inventory[0] && 
          <ul>
            {inventory}
          </ul>
        }
        <button type='button'>Edit</button>
        <button type='button'>Delete</button>
        <button type='button' onClick={this.props.history.goBack}>Go Back</button>
      </section>
    )
  }
}

export default withRouter(ExpandedBox);