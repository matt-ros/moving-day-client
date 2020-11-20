import React from 'react';
import MovingdayContext from '../../context/MovingdayContext';
import UsersApiService from '../../services/users-api-service';

class SignupFormPage extends React.Component {
  static contextType = MovingdayContext

  handleSignup = (e) => {
    e.preventDefault();
    const { full_name, user_name, password, moving_date } = e.target;
    const user = {
      full_name: full_name.value,
      user_name: user_name.value,
      password: password.value,
      moving_date: (moving_date.value) ? moving_date.value : null
    }
    UsersApiService.postUser(user)
      .then(this.context.setUser)
      .then(() => {
        full_name.value = '';
        user_name.value = '';
        password.value = '';
        moving_date.value = '';
        this.props.history.push('/homepage');
      })
      .catch(res => this.context.setError(res.error))
  }

  render() {
    const { error } = this.context
    return (
      <>
      <header role="banner">
        <h1>Sign Up!</h1>
      </header>
      <section>
        {error && <p>{error}</p>}
        <form onSubmit={this.handleSignup}>
          <div>
            <label htmlFor="full_name">Full Name</label>
            <input type="text" name="full_name" id="full_name" required />
          </div>
          <div>
            <label htmlFor="user_name">Username</label>
            <input type="text" name="user_name" id="user_name" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <div>
            <label htmlFor="moving_date">Moving Date</label>
            <input type="date" name="moving_date" id="moving_date" />
          </div>
          <button type="submit">Sign Up!</button>
        </form> 
      </section>
      </>
    )
  }
}

export default SignupFormPage;