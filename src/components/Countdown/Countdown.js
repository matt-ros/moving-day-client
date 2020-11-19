import React from 'react';
import UsersApiService from '../../services/users-api-service';

class Countdown extends React.Component {
  handleUpdateNotes = (e) => {
    e.preventDefault();
    UsersApiService.patchUser({ moving_date: new Date(e.target.moving_date.value).toISOString() })
      .then(this.props.updateUser({ moving_date: new Date(e.target.moving_date.value).toISOString() }))
  }

  render() {
    const today = new Date(new Date().toDateString());
    const movingDate = new Date(this.props.moving_date)
    const year = movingDate.getUTCFullYear()
    const month = movingDate.getUTCMonth()
    const day = movingDate.getUTCDate()
    const formattedDate = `${year}-${month + 1}-${day}`
    const movingDay = new Date(year, month, day);
    const diffInMilliseconds = movingDay.getTime() - today.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return (
      <header className='countdown'>
        <h3>Today is {today.toDateString()}</h3>
        {diffInDays < 0
          ? <h3>Your Moving Date Has Passed!</h3>
          : <>
              <h3>Moving Day is {movingDay.toDateString()}</h3>
              <h3>Moving in {diffInDays} days!</h3>
            </>}
        <form onSubmit={this.handleUpdateNotes}>
          <label htmlFor='moving_date'>Change Moving Day</label>
          {this.props.moving_date && <input type='date' name='moving_date' id='moving_date' defaultValue={formattedDate} />}
          <button type='submit'>Update</button>
        </form>
      </header>
    )
  }
}

export default Countdown;