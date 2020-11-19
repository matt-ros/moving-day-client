import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';

class ExpandedBox extends React.Component {
  static contextType = MovingdayContext

  render() {
    // eslint-disable-next-line
    const box = this.context.boxes.find(box => box.id == this.props.match.params.box_id)
    const inventory = (box.inventory.length > 0)
      ? box.inventory.map((item, index) => <li key={index}>{item}</li>)
      : null
    return (
      <section>
        <header>
          <h2>{box.box_name}</h2>
        </header>
        <p>Name: {box.box_name}</p>
        {box.coming_from && <p>Where's It Coming From? {box.coming_from}</p>}
        {box.going_to && <p>Where's It Going To? {box.going_to}</p>}
        {box.getting_there && <p>How's It Getting There? {box.getting_there}</p>}
        {box.box_notes && <p>Notes: {box.box_notes}</p>}
        <h3>Inventory</h3>
        {(inventory) ? <ul>{inventory}</ul> : <p>Empty</p>}
        <button type='button' onClick={e => this.props.history.push(`/boxform/${box.id}`)}>Edit</button>
        <button type='button'>Delete</button>
        <button type='button' onClick={this.props.history.goBack}>Go Back</button>
      </section>
    )
  }
}

export default withRouter(ExpandedBox);