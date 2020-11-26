import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import List from '../List/List';

class ListsPage extends React.Component {
  static contextType = MovingdayContext;

  componentDidMount() {
    this.context.clearError();
  }
  
  render() {
    const { error } = this.context;
    
    return (
      <section className="lists page">
        <h2>
          To-Do Lists
        </h2>
        {error && <p>{error}</p>}
        <ul className="lists-list">
          {this.context.lists.map(list =>
            <List key={list.id} list={list} history={this.props.history} />
          )}
        </ul>
        <button type="button" onClick={e => this.props.history.push('/listform')}>New List</button>
      </section>
    );
  }
}

export default withRouter(ListsPage);