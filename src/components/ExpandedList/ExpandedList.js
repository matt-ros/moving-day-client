import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ListsApiService from '../../services/lists-api-service';

class ExpandedList extends React.Component {
  static contextType = MovingdayContext

  handleDeleteList = () => {
    const listId = this.props.match.params.list_id
    ListsApiService.deleteList(listId)
      .then(this.context.deleteList(this.props.match.params.list_id))
      .then(this.props.history.push('/lists'))
  }

  handleDeleteItem = item => {
    // eslint-disable-next-line
    const list = this.context.lists.find(list => list.id == this.props.match.params.list_id)
    delete list.list_items[item]
    ListsApiService.patchList(list.id, { list_items: list.list_items })
      .then(this.context.updateList(list.id, { list_items: list.list_items }))
  }

  handleClickChecked = item => {
    // eslint-disable-next-line
    const list = this.context.lists.find(list => list.id == this.props.match.params.list_id)
    list.list_items[item] ? list.list_items[item] = false : list.list_items[item] = true
    ListsApiService.patchList(list.id, { list_items: list.list_items })
      .then(this.context.updateList(list.id, { list_items: list.list_items }))
  }

  render() {
    // eslint-disable-next-line
    const list = this.context.lists.find(list => list.id == this.props.match.params.list_id)
    const items = Object.entries(list.list_items).map(([key, value], index) =>
      <li key={index} className={value ? 'checked' : ''}>
        {key}
        <button type='button' onClick={e => this.handleClickChecked(key)}>Check Off</button>
        <button type='button' onClick={e => this.handleDeleteItem(key)}>Delete</button>
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
        <button type='button' onClick={this.handleDeleteList}>Delete</button>
        <button type='button' onClick={this.props.history.goBack}>Go Back</button>
      </section>
    )
  }
}

export default withRouter(ExpandedList);