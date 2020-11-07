import React from 'react';

class Countdown extends React.Component {
  render() {
    const today = new Date(new Date().toDateString());
    const movingDay = this.props.moving_date;
    const diffInMilliseconds = movingDay.getTime() - today.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return (
      <header>
        <h2>Moving in {diffInDays} days!</h2>
      </header>
    )
  }
}

export default Countdown;