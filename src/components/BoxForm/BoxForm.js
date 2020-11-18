import React from 'react';
import MovingdayContext from '../../context/MovingdayContext';

class BoxForm extends React.Component {
  state = {
    box: {},
    changedFields: new Set()
  }

  static contextType = MovingdayContext

  componentDidMount() {
    if (this.props.match.params.box_id) {
      // eslint-disable-next-line
      const box = this.context.boxes.find(box => box.id == this.props.match.params.box_id)
      this.setState({ box })
    }
  }

  handleSubmitBox = e => {
    e.preventDefault();
    console.log('submit box')
    const { box_name, coming_from, going_to, getting_there, box_notes } = e.target;
    
    box_name.value = '';
    coming_from.value = '';
    going_to.value = '';
    getting_there.value = '';
    box_notes.value = '';
  }

  handleSubmitItem = ev => {
    ev.preventDefault();
    console.log('submit item')
    const { box_item } = ev.target;
    const newInventory = (this.state.box.inventory) ? this.state.box.inventory : []
    newInventory.push(box_item.value)
    const changedFields = this.state.changedFields.add('inventory')
    const newBox = {
      ...this.state.box,
      inventory: newInventory
    }
    this.setState({ box: newBox, changedFields })
    box_item.value = '';
  }

  handleChange = ev => {
    const changedFields = this.state.changedFields.add(ev.target.name)
    const newInfo = {}
    newInfo[ev.target.name] = ev.target.value
    const newBox = {
      ...this.state.box,
      ...newInfo
    }
    this.setState({ box: newBox, changedFields })
  }
  
  render() {
    const { box } = this.state
    const inventory = (box.inventory)
      ? this.state.box.inventory.map((item, index) => <li key={index}>{item}</li>)
      : null
    return (
      <li>
        <header role="banner">
          <h1>{(this.props.match.params.box_id) ? 'Edit Box' : 'Create Box'}</h1>
        </header>
        <section>
          <form id='box_form' onSubmit={this.handleSubmitBox}>
            <div>
              <label htmlFor="box_name">Box Name</label>
              <input type="text" name="box_name" id="box_name" placeholder="Kitchen Box 1" onChange={this.handleChange} defaultValue={(Object.entries(box).length) ? this.state.box.box_name : ''} />
            </div>
            <div>
              <label htmlFor="coming_from">Where's It Coming From?</label>
              <input type="text" name="coming_from" id="coming_from" placeholder="Kitchen" onChange={this.handleChange} defaultValue={(Object.entries(box).length) ? this.state.box.coming_from : ''} />
            </div>
            <div>
              <label htmlFor="going_to">Where's It Going To?</label>
              <input type="text" name="going_to" id="going_to" placeholder="Storage Unit" onChange={this.handleChange} defaultValue={(Object.entries(box).length) ? this.state.box.going_to : ''} />
            </div>
            <div>
              <label htmlFor="getting_there">How's It Getting There?</label>
              <input type="text" name="getting_there" id="getting_there" placeholder="Steve's Car" onChange={this.handleChange} defaultValue={(Object.entries(box).length) ? this.state.box.getting_there : ''} />
            </div>
            <div>
              <label htmlFor="box_notes">Notes</label>
              <input type="text" name="box_notes" id="box_notes" placeholder="Fragile" onChange={this.handleChange} defaultValue={(Object.entries(box).length) ? this.state.box.box_notes : ''} />
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
          {(inventory) ? <ul>{inventory}</ul> : <p>Empty</p>}
          <button type='button' onClick={this.props.history.goBack}>Go Back</button>
        </section>
      </li>
    )
  }
}

export default BoxForm;