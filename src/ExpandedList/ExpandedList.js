import React from 'react';
import { withRouter } from 'react-router-dom';

class ExpandedList extends React.Component {
  render() {
    const items = this.props.list.items.map((item, index) =>
      <li key={index}>
        {item}
      </li>
    )
    return (
      <section>
        <header>
          <h2>{this.props.list.name}</h2>
        </header>
        <ul>
          {items}
        </ul>
        <button type='button'>Edit</button>
        <button type='button'>Delete</button>
        <button type='button' onClick={this.props.history.goBack}>Go Back</button>
      </section>
    )
  }
}

export default withRouter(ExpandedList);