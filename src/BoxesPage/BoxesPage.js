import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Box from '../Box/Box';

class BoxesPage extends React.Component {
  render() {
    return (
      <section className='boxes page'>
        <header>
          <h2>
            <Link to={'/boxes'}>
              Boxes
            </Link>
          </h2>
        </header>
        <ul>
          {this.props.boxes.map(box =>
            <Box key={box.id} box={box} />
          )}
        </ul>
        <button type='button' onClick={e => this.props.history.push('/boxform')}>New Box</button>
      </section>
    )
  }
}

export default withRouter(BoxesPage);