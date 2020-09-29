import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
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
        <Route exact path='/' component={RepositoriesList} />
        <Route path='/repositories/:id' component={Repository} />
        <Route path='/issues/:id' component={Issue} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
