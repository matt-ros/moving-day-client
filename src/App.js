import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav/Nav';
import LandingPage from './LandingPage/LandingPage';
import SignupFormPage from './SignupFormPage/SignupFormPage';
import UserHomepage from './UserHomepage/UserHomepage';
import BoxesPage from './BoxesPage/BoxesPage';
import ExpandedBox from './ExpandedBox/ExpandedBox';
import ListsPage from './ListsPage/ListsPage';
import ExpandedList from './ExpandedList/ExpandedList';
import STORE from './STORE';

class App extends React.Component {
  render() {
    return (
      <>
        <Route path='/' component={Nav} />
        <main className='App'>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/signup' component={SignupFormPage} />
            <Route
              path='/homepage'
              render={routeProps => (
                <UserHomepage history={routeProps.history} STORE={STORE} />
              )}
            />
            <Route exact path='/boxes'>
              <BoxesPage boxes={STORE.boxes} />
            </Route>
            <Route
              path='/boxes/:box_id'
              render={routeProps => (
              <ExpandedBox history={routeProps.history} box={STORE.boxes.find(box => box.id == routeProps.match.params.box_id)} />
              )}
            />
            <Route exact path='/lists'>
              <ListsPage lists={STORE.lists} />
            </Route>
            <Route
              path='/lists/:list_id'
              render={routeProps => (
              <ExpandedList history={routeProps.history} list={STORE.lists.find(list => list.id == routeProps.match.params.list_id)} />
              )}
            />
          </Switch>
        </main>
      </>
    )
  }
}

export default App;