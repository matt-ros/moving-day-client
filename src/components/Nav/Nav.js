import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'

class Nav extends React.Component {
  state = {
    error: null
  }

  handleClickLogin = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;
    
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.props.onLogin();
        this.props.history.push('/homepage');
      })
      .catch(res => {
        this.setState({ error: res.error });
      })
  }

  handleClickLogout = e => {
    e.preventDefault();
    TokenService.clearAuthToken();
    this.props.history.push('/');
  }

  renderLoginForm() {
    const { error } = this.state
    return (
      <form className="login-form" onSubmit={this.handleClickLogin}>
        {(error)
          ? <div className='error'>{error}</div>
          : null }
        <label htmlFor="user_name">Username</label>{' '}
        <input type="text" name="user_name" id="user_name" /><br />
        <label htmlFor="password">Password</label>{' '}
        <input type="password" name="password" id="password" />{' '}
        <button type="submit">Login</button>
      </form>
    )
  }

  renderLogoutButton() {
    return (
      <button type='button' onClick={this.handleClickLogout}>Logout</button>
    )
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
        {TokenService.hasAuthToken()
          ? this.renderLogoutButton()
          : this.renderLoginForm()}
      </nav>
    )
  }
}

export default Nav;