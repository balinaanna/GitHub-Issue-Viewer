import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RepositoriesList from './RepositoriesList';
import Repository from './Repository';
import Issue from './Issue';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={RepositoriesList} />
      <Route path="/repository/:id" component={Repository} />
      <Route path="/issue/:id" component={Issue} />
    </BrowserRouter>
  );
}

export default App;
