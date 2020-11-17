import React from 'react';

class Countdown extends React.Component {
  render() {
    const today = new Date(new Date().toDateString());
    const movingDate = new Date(this.props.moving_date)
    const movingDay = new Date(movingDate.getUTCFullYear(), movingDate.getUTCMonth(), movingDate.getUTCDate());
    const diffInMilliseconds = movingDay.getTime() - today.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return (
      <header className='countdown'>
        <h3>Today is {today.toDateString()}</h3>
        <h3>Moving Day is {movingDay.toDateString()}</h3>
        <h3>Moving in {diffInDays} days!</h3>
      </header>
    )
  }
}

export default Countdown;