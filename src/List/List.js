import React from 'react';
import { Link } from 'react-router-dom';

class List extends React.Component {
  render() {
    return (
      <li>
        <h3>
          <Link to={`/lists/${this.props.list.id}`}>
            {this.props.list.name}
          </Link>
        </h3>
        <button type='button'>Edit</button>
        <button type='button'>Delete</button>
      </li>
    )
  }
}

export default List;