import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import MovingdayContext from '../../context/MovingdayContext';

class Nav extends React.Component {
  static contextType = MovingdayContext

  handleClickLogin = ev => {
    ev.preventDefault();
    this.context.clearError()
    const { user_name, password } = ev.target;
    
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.context.onLogin();
        this.props.history.push('/homepage');
      })
      .catch(res => {
        this.context.setError(res)
      })
  }

  handleClickLogout = e => {
    e.preventDefault();
    TokenService.clearAuthToken();
    this.props.history.push('/');
  }

  renderLoginForm() {
    const { error } = this.context
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

  renderLinks() {
    return (
      <>
        <Link to='/homepage'>Home</Link> |
        {' '}
        <Link to='/lists'>To-Do Lists</Link> |
        {' '}
        <Link to='/boxes'>Boxes</Link> |
        {' '}
        <Link to='/contacts'>Contacts</Link> |
        {' '}
        <Link to='/notes'>Notes</Link>
      </>
    )
  }

  renderEmpty() {
    return (
      <>
      </>
    )
  }

  render() {
    return (
      <nav>
        <p className='unit'>
          {TokenService.hasAuthToken()
            ? this.renderLinks()
            : this.renderEmpty()}
        </p>
        {TokenService.hasAuthToken()
          ? this.renderLogoutButton()
          : this.renderLoginForm()}
      </nav>
    )
  }
}

export default Nav;