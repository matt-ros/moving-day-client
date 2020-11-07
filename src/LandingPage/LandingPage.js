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
          <p>Stay organized during your move with inventories for each box you pack, as well as transport location(?) and destination(?)</p>
        </section>

        <section>
          <h3>Remember what you need to do</h3>
          <p>Never forget what you were supposed to be doing with to-do lists</p>
        </section>

        <Link to={'/signup'}><h4>Sign Up Now!</h4></Link>
      </>
    )
  }
}

export default LandingPage;