import React from 'react';
import { Link } from 'react-router-dom';
import MovingdayContext from '../../context/MovingdayContext';
import Countdown from '../Countdown/Countdown';

class UserHomepage extends React.Component {
  static contextType = MovingdayContext
  render() {
    return (
      <>
        <Countdown updateUser={this.context.updateUser} moving_date={this.context.user.moving_date} />

        <div className='links'>
          <Link to={'/lists'}>
            <section>
              <h3>
                Lists
              </h3>
            </section>
          </Link>
          
          <Link to={'/boxes'}>
            <section>
              <h3>
                Boxes
              </h3>
            </section>
          </Link>

          <Link to={'/contacts'}>
            <section>
              <h3>
                  Contacts
              </h3>
            </section>
          </Link>
          
          <Link to={'/notes'}>
            <section>
              <h3>
                  Notes
              </h3>
            </section>
          </Link>
        </div>
      </>
    )
  }
}

export default UserHomepage;