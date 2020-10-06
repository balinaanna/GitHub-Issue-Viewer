import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_ACCESS_TOKEN } from '../actions/types';
import Header from './Header';
import Root from './Root';

function PrivateRoute({ component: Component, ...rest }) {
  let { session: { token }, dispatch } = rest;
  let persistedToken;

  if (!token) {
    persistedToken = window.localStorage.getItem('token');

    if (persistedToken) {
      dispatch({
        type: SET_ACCESS_TOKEN,
        payload: { token: persistedToken }
      });
    }
  }

  return (
    <Route { ...rest } render={ props => {
      if (!!token || !!persistedToken) {
        return <>
          <Header { ...props } />
          <Component { ...props } />
        </>;
      }

      if (rest.location.pathname === '/') {
        return <Root />;
      } else {
        return <Redirect to='/' />;
      }
    }} />
  );
}

export default connect(
  (state) => {
    return { session: state.session };
  }
)(PrivateRoute);
