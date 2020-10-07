import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_ACCESS_TOKEN } from '../actions/types';
import Header from './Header';
import UnauthorizedRoot from './UnauthorizedRoot';

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

  return <Route render={ (props) => {
    return ((!!token || !!persistedToken)
        ? <>
            <Header { ...rest } { ...props } />
            <Component { ...rest } { ...props } />
          </>
        : (rest.location.pathname === '/')
          ? <UnauthorizedRoot { ...rest } />
          : <Redirect to='/' />
      )} }
    { ...rest } />;
}

export default connect(
  (state) => {
    return { session: state.session };
  }
)(PrivateRoute);
