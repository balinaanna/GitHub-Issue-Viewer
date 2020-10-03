import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import RepositoriesList from './RepositoriesList';
import Repository from './Repository';
import Issue from './Issue';
import Header from './Header';
import '../App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={RepositoriesList} />
        <Route exact path='/:repoOwner/:repoName' component={Repository} />
        <Route path='/:repoOwner/:repoName/issues/:number' component={Issue} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
