import React from 'react';

class SignupFormPage extends React.Component {
  handleSignup = (e) => {
    e.preventDefault();
    const { full_name, user_name, password, moving_date } = e.target;
    full_name.value = '';
    user_name.value = '';
    password.value = '';
    moving_date.value = '';
    this.props.history.push('/homepage');
  }

  render() {
    return (
      <>
      <header role="banner">
        <h1>Sign Up!</h1>
      </header>
      <section>
        <form onSubmit={this.handleSignup}>
          <div>
            <label htmlFor="full_name">Full Name</label>
            <input type="text" name="full_name" id="full_name" />
          </div>
          <div>
            <label htmlFor="user_name">Username</label>
            <input type="text" name="user_name" id="user_name" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
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