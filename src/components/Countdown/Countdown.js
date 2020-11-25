import React from 'react';
import MovingdayContext from '../../context/MovingdayContext';
import UsersApiService from '../../services/users-api-service';

class Countdown extends React.Component {
  static contextType = MovingdayContext

  handleUpdateMovingDate = ev => {
    ev.preventDefault();
    UsersApiService.patchUser({ moving_date: new Date(ev.target.moving_date.value).toISOString() })
      .then(this.context.updateUser({ moving_date: new Date(ev.target.moving_date.value).toISOString() }))
      .catch(res => this.context.setError(res.error))
  }

  renderNoMovingDate() {
    return <h3>Please Enter Your Moving Date</h3>
  }

  renderMovingDatePassed() {
    return <h3>Your Moving Date Has Passed!</h3>
  }

  render() {
    const today = new Date(new Date().toDateString());
    const movingDate = (this.context.user.moving_date === undefined) ? new Date(null) : new Date(this.context.user.moving_date)
    const year = movingDate.getUTCFullYear()
    const month = movingDate.getUTCMonth()
    const day = movingDate.getUTCDate()
    const formattedDate = `${year}-${month + 1}-${day}`
    const movingDay = new Date(year, month, day);
    const diffInMilliseconds = movingDay.getTime() - today.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return (
      <section>
        <header className='countdown'>
          <h3>Today is {today.toDateString()}</h3>
          {(movingDate.toISOString() === new Date(null).toISOString())
              ? this.renderNoMovingDate()
              : (diffInDays < 0)
                  ? this.renderMovingDatePassed()
                  : <>
                      <h3>Moving Day is {movingDay.toDateString()}</h3>
                      <h3>Moving in {diffInDays} days!</h3>
                    </>
          }
          <form onSubmit={this.handleUpdateMovingDate}>
            <label htmlFor='moving_date'>Change Moving Day</label>
            {this.context.user.moving_date && <input type='date' name='moving_date' id='moving_date' defaultValue={(movingDate.toISOString() === new Date(null).toISOString()) ? null : formattedDate} />}
            <button type='submit'>Update</button>
          </form>
        </header>
      </section>
    )
  }
}

export default Countdown;