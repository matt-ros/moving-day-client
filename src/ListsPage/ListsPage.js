import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import List from '../List/List';

class ListsPage extends React.Component {
  render() {
    return (
      <section className='lists page'>
        <h2>
          <Link to={'/lists'}>
            To-Do Lists
          </Link>
        </h2>
        <ul>
          {this.props.lists.map(list =>
            <List key={list.id} list={list} />
          )}
        </ul>
        <button type='button' onClick={e => this.props.history.push('/listform')}>New List</button>
      </section>
    )
  }
}

export default withRouter(ListsPage);