import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route path='/homepage' />
          <Route path='/' component={Nav} />
        </Switch>
        <main className='App'>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/signup' component={SignupFormPage} />
            <Route path='/homepage'>
              <UserHomepage moving_date={STORE.moving_date} />
            </Route>
            <Route exact path='/boxes'>
              <BoxesPage boxes={STORE.boxes} />
            </Route>
            <Route path='/boxform' component={BoxForm} />
            <Route
              path='/boxes/:box_id'
              render={routeProps => (
                // eslint-disable-next-line
                <ExpandedBox history={routeProps.history} box={STORE.boxes.find(box => box.id == routeProps.match.params.box_id)} />
              )}
            />
            <Route exact path='/lists'>
              <ListsPage lists={STORE.lists} />
            </Route>
            <Route path='/listform' component={ListForm} />
            <Route
              path='/lists/:list_id'
              render={routeProps => (
                // eslint-disable-next-line
                <ExpandedList history={routeProps.history} list={STORE.lists.find(list => list.id == routeProps.match.params.list_id)} />
              )}
            />
            <Route exact path='/contacts'>
              <ContactsPage contacts={STORE.contacts} />
            </Route>
            <Route path='/contactform' component={ContactForm} />
            <Route
              path='/contacts/:contact_id'
              render={routeProps => (
                // eslint-disable-next-line
                <ExpandedContact history={routeProps.history} contact={STORE.contacts.find(contact => contact.id == routeProps.match.params.contact_id)} />
              )}
            />
            <Route path='/notes'>
              <NotesPage notes={STORE.notes} />
            </Route>
          </Switch>
        </main>
      </>
    )
  }
}

export default App;