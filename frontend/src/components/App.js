import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import RepositoriesList from './RepositoriesList';
import Repository from './Repository';
import Issue from './Issue';
import Session from './Session';
import Root from './Root';
import PrivateRoute from './PrivateRoute';
import '../App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path='/' component={RepositoriesList} />
        <PrivateRoute exact path='/:repoOwner/:repoName' component={Repository} />
        <PrivateRoute exact path='/:repoOwner/:repoName/issues/:number' component={Issue} />

        <Route exact path='/' component={Root} />
        <Route exact path='/auth' component={Session} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
