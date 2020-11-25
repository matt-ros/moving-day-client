import React from 'react';
import { Link } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import BoxesApiService from '../../services/boxes-api-service';

class Box extends React.Component {
  static contextType = MovingdayContext

  handleDelete = () => {
    BoxesApiService.deleteBox(this.props.box.id)
      .then(this.context.deleteBox(this.props.box.id))
      .catch(res => this.context.setError(res.error))
  }

  render() {
    return (
      <li className='box'>
        <h3>
          <Link to={`/boxes/${this.props.box.id}`}>
            {this.props.box.box_name}
          </Link>
        </h3>
        <button type='button' onClick={e => this.props.history.push(`/boxform/${this.props.box.id}`)}>Edit</button>
        <button type='button' onClick={this.handleDelete}>Delete</button>
      </li>
    )
  }
}

export default Box;