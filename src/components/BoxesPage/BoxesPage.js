import React from 'react';
import { withRouter } from 'react-router-dom';
import Box from '../Box/Box';

class BoxesPage extends React.Component {
  render() {
    return (
      <section className='boxes page'>
        <header>
          <h2>
            Boxes
          </h2>
        </header>
        <label htmlFor='filter'>Filter</label>{' '}
        <input type='text' name='filter' id='filter' onChange={this.handleChangeFilter} />
        <br />
        <div className='unit'>
          <input type='radio' name='filter_type' id='box_name' value='name' />
          <label htmlFor='box_name'>Name</label>
        </div>
        <div className='unit'>
          <input type='radio' name='filter_type' id='box_dest' value='destination' />
          <label htmlFor='box_dest'>Destination</label>
        </div>
        <div className='unit'>
          <input type='radio' name='filter_type' id='box_trans_loc' value='transport' />
          <label htmlFor='box_trans_loc'>Transport Location</label>
        </div>
        <div className='unit'>
          <input type='radio' name='filter_type' id='box_notes' value='notes' />
          <label htmlFor='box_notes'>Notes</label>
        </div>
        <ul>
          {this.props.boxes.map(box =>
            <Box key={box.id} box={box} history={this.props.history} />
          )}
        </ul>
        <button type='button' onClick={e => this.props.history.push('/boxform')}>New Box</button>
      </section>
    )
  }
}

export default withRouter(BoxesPage);