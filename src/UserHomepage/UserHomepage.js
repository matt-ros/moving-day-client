import React from 'react';
import BoxesPage from '../BoxesPage/BoxesPage';
import ListsPage from '../ListsPage/ListsPage';
import Countdown from '../Countdown/Countdown';

class UserHomepage extends React.Component {
  render() {
    return (
      <>
        <Countdown moving_date={this.props.STORE.moving_date} />

        <ListsPage lists={this.props.STORE.lists} />
        
        <BoxesPage boxes={this.props.STORE.boxes} />
      </>
    )
  }
}

export default UserHomepage;