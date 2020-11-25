import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <header className='title' role="banner">
          <h1>Moving Day</h1>
          <h2>Move Better</h2>
        </header>

        <section>
          <h3>Keep track of your stuff</h3>
          <p>[<em>Screenshot of Boxes section</em>]</p>
          <p>Stay organized during your move with inventories for each box you pack, as well as additional notes like transport location and destination</p>
        </section>

        <section>
          <h3>Remember what you need to do</h3>
          <p>[<em>Screenshot of Lists section</em>]</p>
          <p>Never forget what you were supposed to be doing with to-do lists for the whole family</p>
        </section>

        <section>
          <h3>Organize your contacts</h3>
          <p>[<em>Screenshot of Contacts section</em>]</p>
          <p>Record all your move-related contacts so everything is in one place</p>
        </section>

        <section>
          <h3><Link to={'/signup'}>Sign Up Now!</Link></h3>
          <p>Or log in to demo account:</p>
          <p>Username: demo</p>
          <p>Password: Password1!</p>
        </section>
      </>
    )
  }
}

export default LandingPage;