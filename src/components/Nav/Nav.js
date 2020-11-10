import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  handleClickLogin = e => {
    e.preventDefault();
    const { username, password } = e.target;
    username.value = '';
    password.value = '';
    this.props.history.push('/homepage');
  }

  handleClickLogout = e => {
    e.preventDefault();
    this.props.history.push('/');
  }
  render() {
    return (
      <nav>
        <p className='unit'>
          <Link to='/homepage'>Home</Link> |
          {' '}
          <Link to='/lists'>To-Do Lists</Link> |
          {' '}
          <Link to='/boxes'>Boxes</Link> |
          {' '}
          <Link to='/contacts'>Contacts</Link> |
          {' '}
          <Link to='/notes'>Notes</Link>
        </p>
        <form className="login-form" onSubmit={this.handleClickLogin}>
          <label htmlFor="username">Username</label>{' '}
          <input type="text" name="username" id="username" /><br />
          <label htmlFor="password">Password</label>{' '}
          <input type="password" name="password" id="password" />{' '}
          <button type="submit">Login</button>
          <button type='button' onClick={this.handleClickLogout}>Logout</button>
        </form>
      </nav>
    )
  }
}

export default Nav;