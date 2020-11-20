import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import BoxesApiService from '../../services/boxes-api-service';

class ExpandedBox extends React.Component {
  static contextType = MovingdayContext

  componentDidMount() {
    this.context.clearError()
  }

  handleDeleteBox = () => {
    const boxId = this.props.match.params.box_id
    BoxesApiService.deleteBox(boxId)
      .then(this.context.deleteBox(this.props.match.params.box_id))
      .then(this.props.history.push('/boxes'))
      .catch(res => this.context.setError(res.error))
  }

  handleDeleteItem = index => {
    // eslint-disable-next-line
    const box = this.context.boxes.find(box => box.id == this.props.match.params.box_id)
    box.inventory.splice(index, 1)
    BoxesApiService.patchBox(box.id, { inventory: box.inventory })
      .then(this.context.updateBox(box.id, { inventory: box.inventory }))
      .catch(res => this.context.setError(res.error))
  }

  render() {
    // eslint-disable-next-line
    const box = this.context.boxes.find(box => box.id == this.props.match.params.box_id)
    if (!box) {
      return <Redirect to='/boxes' />
    }

    const inventory = (box.inventory.length > 0)
      ? box.inventory.map((item, index) => <li key={index}>{item}<button type='button' onClick={e => this.handleDeleteItem(index)}>Delete Item</button></li>)
      : null

    const { error } = this.context

    return (
      <section>
        <header>
          <h2>{box.box_name}</h2>
        </header>
        {error && <p>{error}</p>}
        <p>Name: {box.box_name}</p>
        {box.coming_from && <p>Where's It Coming From? {box.coming_from}</p>}
        {box.going_to && <p>Where's It Going To? {box.going_to}</p>}
        {box.getting_there && <p>How's It Getting There? {box.getting_there}</p>}
        {box.box_notes && <p>Notes: {box.box_notes}</p>}
        <h3>Inventory</h3>
        {(inventory) ? <ul>{inventory}</ul> : <p>Empty</p>}
        <button type='button' onClick={e => this.props.history.push(`/boxform/${box.id}`)}>Edit</button>
        <button type='button' onClick={this.handleDeleteBox}>Delete</button>
        <button type='button' onClick={this.props.history.goBack}>Go Back</button>
      </section>
    )
  }
}

export default withRouter(ExpandedBox);