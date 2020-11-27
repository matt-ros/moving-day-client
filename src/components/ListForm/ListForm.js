import React from 'react';
import { Redirect } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import ListsApiService from '../../services/lists-api-service';
import TokenService from '../../services/token-service';

class ListForm extends React.Component {
  state = {
    list: {},
    changedFields: new Set()
  };

  static contextType = MovingdayContext;

  componentDidMount() {
    if (this.props.match.params.list_id) {
      // eslint-disable-next-line
      const list = this.context.lists.find(list => list.id == this.props.match.params.list_id);
      this.setState({ list, origList: list });
    }
    this.context.clearError();
  }

  resetVals = ev => {
    const { list_name } = ev.target;
    list_name.value = '';
    this.setState({ list: {}, changedFields: new Set() });
  }

  handleSubmitList = ev => {
    ev.preventDefault();
    this.context.clearError();
    const list = {};
    if (this.state.changedFields.size === 0) {
      return this.context.setError('You must edit at least one field');
    }

    const changedFields = Array.from(this.state.changedFields);
    for (let i = 0; i < changedFields.length; i++) {
      list[changedFields[i]] = this.state.list[changedFields[i]];
    }

    (this.props.match.params.list_id)
      ? ListsApiService.patchList(this.props.match.params.list_id, list)
          .then(this.context.updateList(this.props.match.params.list_id, list))
          .then(this.resetVals(ev))
          .then(this.props.history.goBack)
          .catch(res => {
            if (res.error === 'Unauthorized request') {
              TokenService.clearAuthToken();
              this.context.onLogOut();
              this.context.setError(res.error);
              this.props.history.push('/');
            } else {
              this.context.setError(res.error);
            }
          })
      : ListsApiService.postList(list)
          .then(this.context.addList)
          .then(this.resetVals(ev))
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

  handleSubmitItem = ev => {
    ev.preventDefault();
    const { list_item } = ev.target;
    const newItems = (this.state.list.list_items) ? this.state.list.list_items : {};
    newItems[list_item.value] = false; // default to unchecked
    const changedFields = this.state.changedFields.add('list_items');
    const newList = {
      ...this.state.list,
      list_items: newItems
    };
    this.setState({ list: newList, changedFields });
    list_item.value = '';
  }

  handleChange = ev => {
    const changedFields = this.state.changedFields.add(ev.target.name);
    const newInfo = {};
    newInfo[ev.target.name] = ev.target.value;
    const newList = {
      ...this.state.list,
      ...newInfo
    };
    this.setState({ list: newList, changedFields });
  }

  handleDeleteItem = item => {
    const { list } = this.state;
    delete list.list_items[item];
    const changedFields = this.state.changedFields.add('list_items');
    this.setState({ list, changedFields });
  }

  handleClickChecked = item => {
    const { list } = this.state;
    list.list_items[item] = !list.list_items[item];
    const changedFields = this.state.changedFields.add('list_items');
    this.setState({ list, changedFields });
  }
  
  handleFocus = ev => {
    const { origList } = this.state;
    if (origList && ev.target.value === origList[ev.target.name]) {
      ev.target.value = '';
    }
  }

  handleBlur = ev => {
    const { origList } = this.state;
    if (origList && ev.target.value === '') {
      ev.target.value = origList[ev.target.name];
    }
  }

  render() {
    const { list } = this.state;
    if (!list) {
      return <Redirect to="/lists" />
    }
    
    const items = (list.list_items)
      ? Object.entries(list.list_items).map(([key, value], index) =>
          <li key={index} className={value ? 'checked' : ''}>
            {key}
            <div className="buttons">
              <button type="button" onClick={e => this.handleClickChecked(key)}>{value ? 'Uncheck' : 'Check'}</button>
              <button type="button" onClick={e => this.handleDeleteItem(key)}>Delete</button>
            </div>
          </li>
        )
      : null;

    const { error } = this.context;

    return (
      <>
        <section className="list_form_page">
          <header role="banner">
            <h1>{(this.props.match.params.list_id) ? 'Edit List' : 'Create List'}</h1>
          </header>
        {error && <p>{error}</p>}
          <div className="list_form_container">
            <form className="form" id="list_form" onSubmit={this.handleSubmitList}>
              <div>
                <label htmlFor="list_name">List Name</label>
                <input type="text" name="list_name" id="list_name" placeholder="Steve's List" autoComplete="on" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} defaultValue={(Object.entries(list).length) ? this.state.list.list_name : ''} required />
              </div>
            </form> 
            <div>
              <form className="form" onSubmit={this.handleSubmitItem}>
                <label htmlFor="list_item">List Item</label>
                <input type="text" name="list_item" id="list_item" placeholder="Buy tape" autoComplete="on" />
                <button type="submit">Add Item</button>
              </form>
            </div>
          </div>
          <button type="submit" form="list_form">Save</button>
          <h2>List Items</h2>
          {items ? <ul>{items}</ul> : <p>None</p>}
          <button type="button" onClick={this.props.history.goBack}>Go Back</button>
        </section>
      </>
    );
  }
}

export default ListForm;