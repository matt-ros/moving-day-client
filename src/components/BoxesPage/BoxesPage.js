import React from 'react';
import { withRouter } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import Box from '../Box/Box';

class BoxesPage extends React.Component {
  state = {
    filter: '',
    filter_type: 'box_name'
  };

  static contextType = MovingdayContext;

  componentDidMount() {
    this.context.clearError();
  }

  handleChangeType = event => {
    this.setState({ filter_type: event.target.value });
  }

  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  }

  render() {
    let boxes = []
    if (this.state.filter && this.state.filter_type !== 'inventory') {
      boxes = this.context.boxes.filter(box => (
        box[this.state.filter_type] && box[this.state.filter_type].toLowerCase().includes(this.state.filter.toLowerCase())
        ));
    } else if (this.state.filter && this.state.filter_type === 'inventory') {
      this.context.boxes.forEach(box => {
        if (box.inventory.join(';').toLowerCase().includes(this.state.filter.toLowerCase())) {
          boxes.push(box);
        }
      });
    } else {
      boxes = this.context.boxes;
    }

    const { error } = this.context;
    
    return (
      <section className="boxes page">
        <header>
          <h2>
            Boxes
          </h2>
        </header>
        {error && <p className="error">{error}</p>}
        <label htmlFor="filter">Filter</label>{" "}
        <input type="text" name="filter" id="filter" onChange={this.handleChangeFilter} />
        <br />
        <div className="unit">
          <input type="radio" name="filter_type" id="box_name" value="box_name" checked={this.state.filter_type === 'box_name'} onChange={this.handleChangeType} />
          <label htmlFor="box_name">Name</label>
        </div>
        {' '}
        <div className="unit">
          <input type="radio" name="filter_type" id="coming_from" value="coming_from" checked={this.state.filter_type === 'coming_from'} onChange={this.handleChangeType} />
          <label htmlFor="coming_from">Coming From</label>
        </div>
        {' '}
        <div className="unit">
          <input type="radio" name="filter_type" id="going_to" value="going_to" checked={this.state.filter_type === 'going_to'} onChange={this.handleChangeType} />
          <label htmlFor="going_to">Going To</label>
        </div>
        {' '}
        <div className="unit">
          <input type="radio" name="filter_type" id="getting_there" value="getting_there" checked={this.state.filter_type === 'getting_there'} onChange={this.handleChangeType} />
          <label htmlFor="getting_there">Getting There</label>
        </div>
        {' '}
        <div className="unit">
          <input type="radio" name="filter_type" id="color_code" value="color_code" checked={this.state.filter_type === 'color_code'} onChange={this.handleChangeType} />
          <label htmlFor="color_code">Color Code</label>
        </div>
        {' '}
        <div className="unit">
          <input type="radio" name="filter_type" id="box_notes" value="box_notes" checked={this.state.filter_type === 'box_notes'} onChange={this.handleChangeType} />
          <label htmlFor="box_notes">Notes</label>
        </div>
        {' '}
        <div className="unit">
          <input type="radio" name="filter_type" id="inventory" value="inventory" checked={this.state.filter_type === 'inventory'} onChange={this.handleChangeType} />
          <label htmlFor="inventory">Inventory</label>
        </div>
        <div>
          <br />
          <button type="button" onClick={e => this.props.history.push('/boxform')}>New Box</button>
        </div>
        <ul className="boxes-list">
          {boxes.map(box =>
            <Box key={box.id} box={box} history={this.props.history} />
          )}
        </ul>
      </section>
    );
  }
}

export default withRouter(BoxesPage);
