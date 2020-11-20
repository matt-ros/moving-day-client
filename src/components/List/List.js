import React from 'react';
import { Link } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ListsApiService from '../../services/lists-api-service';

class List extends React.Component {
  static contextType = MovingdayContext

  handleDelete = () => {
    ListsApiService.deleteList(this.props.list.id)
      .then(this.context.deleteList(this.props.list.id))
  }

  render() {
    return (
      <li>
        <h3>
          <Link to={`/lists/${this.props.list.id}`}>
            {this.props.list.list_name}
          </Link>
        </h3>
        <button type='button' onClick={e => this.props.history.push(`/listform/${this.props.list.id}`)}>Edit</button>
        <button type='button' onClick={this.handleDelete}>Delete</button>
      </li>
    )
  }
}

export default List;