import React from 'react';
import { Link } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ListsApiService from '../../services/lists-api-service';
import TokenService from '../../services/token-service';

class List extends React.Component {
  static contextType = MovingdayContext;

  handleDelete = () => {
    ListsApiService.deleteList(this.props.list.id)
      .then(this.context.deleteList(this.props.list.id))
      .catch(res => {
        if (res.error === 'Unauthorized request') {
          TokenService.clearAuthToken();
          this.context.onLogOut();
          this.context.setError(res.error);
          this.props.history.push('/');
        } else {
          this.context.setError(res.error);
        }
      });
  }

  render() {
    return (
      <li className="list">
        <h3>
          <Link to={`/lists/${this.props.list.id}`}>
            {this.props.list.list_name}
          </Link>
        </h3>
        <button type="button" onClick={e => this.props.history.push(`/listform/${this.props.list.id}`)}>Edit</button>
        <button type="button" onClick={this.handleDelete}>Delete</button>
      </li>
    )
  }
}

export default List;