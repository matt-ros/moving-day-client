import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = e.target;
    username.value = '';
    password.value = '';
    this.props.history.push('/homepage');
  }
  render() {
    return (
      <nav>
        <p>
          <Link to='/boxes'>Boxes</Link> |
          {' '}
          <Link to='/lists'>To-Do Lists</Link> |
          {' '}
          <Link to='/homepage'>Home</Link>
        </p>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <button type="submit">Login</button>
        </form>
        <button type='button' onClick={e => this.props.history.push('/')}>Logout</button>
      </nav>
    )
  }
}

export default Nav;