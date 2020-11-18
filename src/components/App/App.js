import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PrivateRoute from '../Utils/PrivateRoute';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import SignupFormPage from '../SignupFormPage/SignupFormPage';
import UserHomepage from '../UserHomepage/UserHomepage';
import BoxesPage from '../BoxesPage/BoxesPage';
import ExpandedBox from '../ExpandedBox/ExpandedBox';
import ListsPage from '../ListsPage/ListsPage';
import ExpandedList from '../ExpandedList/ExpandedList';
import STORE from '../../STORE';
import BoxForm from '../BoxForm/BoxForm';
import ListForm from '../ListForm/ListForm';
import ContactForm from '../ContactForm/ContactForm';
import ContactsPage from '../ContactsPage/ContactsPage';
import ExpandedContact from '../ExpandedContact/ExpandedContact';
import NotesPage from '../NotesPage/NotesPage';
import UsersApiService from '../../services/users-api-service';
import TokenService from '../../services/token-service';

class App extends React.Component {
  state = {
    hasError: false,
    user: {}
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  updateUser = (updatedFields) => {
    const updatedUser = {
      ...this.state.user,
      ...updatedFields
    }
    this.setState({ user: updatedUser })
  }

  render() {
    return (
      <>
        <Switch>
          <Route path='/homepage' />
          <Route path='/' component={Nav} />
        </Switch>
        <main className='App'>
          <Switch>
            <PublicOnlyRoute exact path='/' component={LandingPage} />
            <PublicOnlyRoute path='/signup' component={SignupFormPage} />
            <PrivateRoute path='/homepage' component={UserHomepage} />
            <PrivateRoute path='/boxes/:box_id' component={ExpandedBox} />
            <PrivateRoute path='/boxes' component={BoxesPage} />
            <PrivateRoute path='/boxform/:box_id' component={BoxForm} />
            <PrivateRoute path='/boxform' component={BoxForm} />
            <PrivateRoute path='/lists/:list_id' component={ExpandedList} />
            <PrivateRoute path='/lists' component={ListsPage} />
            <PrivateRoute path='/listform/:list_id' component={ListForm} />
            <PrivateRoute path='/listform' component={ListForm} />
            <PrivateRoute path='/contacts/:contact_id' component={ExpandedContact} />
            <PrivateRoute path='/contacts' component={ContactsPage} />
            <PrivateRoute path='/contactform/:contact_id' component={ContactForm} />
            <PrivateRoute path='/contactform' component={ContactForm} />
            <PrivateRoute path='/notes' component={NotesPage} />
          </Switch>
        </main>
      </>
    )
  }
}

export default App;