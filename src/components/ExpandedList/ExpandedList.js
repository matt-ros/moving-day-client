import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ListsApiService from '../../services/lists-api-service';

class ExpandedList extends React.Component {
  static contextType = MovingdayContext

  componentDidMount() {
    this.context.clearError()
  }

  handleDeleteList = () => {
    const listId = this.props.match.params.list_id
    ListsApiService.deleteList(listId)
      .then(this.context.deleteList(this.props.match.params.list_id))
      .then(this.props.history.push('/lists'))
      .catch(res => this.context.setError(res.error))
  }

  handleDeleteItem = item => {
    // eslint-disable-next-line
    const list = this.context.lists.find(list => list.id == this.props.match.params.list_id)
    delete list.list_items[item]
    ListsApiService.patchList(list.id, { list_items: list.list_items })
      .then(this.context.updateList(list.id, { list_items: list.list_items }))
      .catch(res => this.context.setError(res.error))
  }

  handleClickChecked = item => {
    // eslint-disable-next-line
    const list = this.context.lists.find(list => list.id == this.props.match.params.list_id)
    list.list_items[item] = !list.list_items[item]
    ListsApiService.patchList(list.id, { list_items: list.list_items })
      .then(this.context.updateList(list.id, { list_items: list.list_items }))
  }

  render() {
    // eslint-disable-next-line
    const list = this.context.lists.find(list => list.id == this.props.match.params.list_id)
    if (!list) {
      return <Redirect to='/lists' />
    }
    
    const items = (list.list_items)
      ? Object.entries(list.list_items).map(([key, value], index) =>
          <li key={index} className={value ? 'checked' : ''}>
            {key}
            <div className='buttons'>
              <button type='button' onClick={e => this.handleClickChecked(key)}>{value ? 'Uncheck' : 'Check'}</button>
              <button type='button' onClick={e => this.handleDeleteItem(key)}>Delete</button>
            </div>
          </li>
        )
      : null
    const { error } = this.context

    return (
      <section>
        <div className='exp list'>
          <header>
            <h2>{list.list_name}</h2>
          </header>
          {error && <p>{error}</p>}
          <h3>List Items</h3>
          {items.length > 0 ? <ul>{items}</ul> : <p>None</p>}
          <button type='button' onClick={e => this.props.history.push(`/listform/${list.id}`)}>Edit</button>
          <button type='button' onClick={this.handleDeleteList}>Delete</button>
          <button type='button' onClick={this.props.history.goBack}>Go Back</button>
        </div>
      </section>
    )
  }
}

export default withRouter(ExpandedList);