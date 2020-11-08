import React from 'react';

class BoxForm extends React.Component {
  handleSubmitBox = e => {
    e.preventDefault();
    console.log('submit box')
    const { box_name, box_dest, box_trans_loc, box_notes } = e.target;
    box_name.value = '';
    box_dest.value = '';
    box_trans_loc.value = '';
    box_notes.value = '';
  }

  handleSubmitItem = e => {
    e.preventDefault();
    console.log('submit item')
    const { box_item } = e.target;
    box_item.value = '';
  }
  
  render() {
    return (
      <>
        <header role="banner">
          <h1>Create/Edit Box</h1>
        </header>
        <section>
          <form id='box_form' onSubmit={this.handleSubmitBox}>
            <div>
              <label htmlFor="box_name">Box Name</label>
              <input type="text" name="box_name" id="box_name" placeholder="Kitchen Box 1" />
            </div>
            <div>
              <label htmlFor="box_dest">Destination</label>
              <input type="text" name="box_dest" id="box_dest" placeholder="Shed" />
            </div>
            <div>
              <label htmlFor="box_trans_loc">Transport Location</label>
              <input type="text" name="box_trans_loc" id="box_trans_loc" placeholder="Steve's Car" />
            </div>
            <div>
              <label htmlFor="box_notes">Notes</label>
              <input type="text" name="box_notes" id="box_notes" placeholder="Fragile" />
            </div>
          </form>
          <div>
            <form onSubmit={this.handleSubmitItem}>
              <label htmlFor="box_item">Inventory Item</label>
              <input type="text" name="box_item" id="box_item" placeholder="Plates" />
              <button type="submit">Add Item</button>
            </form>
          </div>
          <button type="submit" form='box_form'>Save</button>
          <h2>Inventory</h2>
          <ul>
            <li>Items displayed here</li>
            <li>as they are added</li>
            <li>with Add Item button</li>
          </ul>
          <button type='button' onClick={this.props.history.goBack}>Go Back</button>
        </section>
      </>
    )
  }
}

export default BoxForm;