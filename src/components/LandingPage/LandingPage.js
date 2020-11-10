import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <header role="banner">
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

        <Link to={'/signup'}><h4>Sign Up Now!</h4></Link>
      </>
    )
  }
}

export default LandingPage;