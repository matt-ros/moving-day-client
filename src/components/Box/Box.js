import React from 'react';
import { Link } from 'react-router-dom';

class Box extends React.Component {
  render() {
    return (
      <li>
        <h3>
          <Link to={`/boxes/${this.props.box.id}`}>
            {this.props.box.box_name}
          </Link>
        </h3>
        <button type='button' onClick={e => this.props.history.push(`/boxform/${this.props.box.id}`)}>Edit</button>
        <button type='button'>Delete</button>
      </li>
    )
  }
}

export default Box;