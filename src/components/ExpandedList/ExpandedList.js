import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';

class ExpandedList extends React.Component {
static contextType = MovingdayContext

  render() {
    // eslint-disable-next-line
    const list = this.context.lists.find(list => list.id == this.props.match.params.list_id)
    const items = Object.entries(list.list_items).map((item, index) =>
      <li key={index}>
        {item}
      </li>
    )
    return (
      <section>
        <header>
          <h2>{list.list_name}</h2>
        </header>
        <ul>
          {items}
        </ul>
        <button type='button' onClick={e => this.props.history.push('/listform')}>Edit</button>
        <button type='button'>Delete</button>
        <button type='button' onClick={this.props.history.goBack}>Go Back</button>
      </section>
    )
  }
}

export default withRouter(ExpandedList);