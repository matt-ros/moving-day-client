import React from 'react';

class ListForm extends React.Component {
  handleSubmitList = e => {
    e.preventDefault();
    console.log('submit list');
    const { list_name } = e.target;
    list_name.value = '';
  }

  handleSubmitItem = e => {
    e.preventDefault();
    console.log('submit item');
    const { list_item } = e.target;
    list_item.value = '';
  }
  render() {
    return (
      <>
        <header role="banner">
          <h1>Create To-Do List</h1>
        </header>
        <section>
          <form id='list_form' onSubmit={this.handleSubmitList}>
            <div>
              <label htmlFor="list_name">List Name</label>
              <input type="text" name="list_name" id="list_name" placeholder="Steve's List" />
            </div>
          </form> 
          <div>
            <form onSubmit={this.handleSubmitItem}>
              <label htmlFor="list_item">List Item</label>
              <input type="text" name="list_item" id="list_item" placeholder="Buy tape" />
              <button type="submit">Add Item</button>
            </form>
          </div>
          <button type="submit" form='list_form'>Save</button>
          <h2>List Items</h2>
          <ul>
            <li>Items displayed here</li>
            <li>as they are added</li>
            <li>with Add Item button</li>
          </ul>
        </section>
      </>
    )
  }
}

export default ListForm;