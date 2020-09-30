import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Header from './Header';
import RepositoriesList from './RepositoriesList';
import Repository from './Repository';
import Issue from './Issue';
import '../App.css';

function App() {
  return (
    <div className='ui container'>
      <BrowserRouter>
        <Header />

        <Switch>
          <Route exact path='/' component={RepositoriesList} />
          <Route exact path='/:repo_owner/:repo_name' component={Repository} />
          <Route path='/:repo_owner/:repo_name/issues/:number' component={Issue} />

          <Route path='*' render={() => <Redirect to='/' />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
