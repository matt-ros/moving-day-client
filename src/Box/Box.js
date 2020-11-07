import React from 'react';
import { Link } from 'react-router-dom';

class Box extends React.Component {
  render() {
    return (
      <li>
        <h3>
          <Link to={`/boxes/${this.props.box.id}`}>
            {this.props.box.name}
          </Link>
        </h3>
        <button type='button'>Edit</button>
        <button type='button'>Delete</button>
      </li>
    )
  }
}

export default Box;