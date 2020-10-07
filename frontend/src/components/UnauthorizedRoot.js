import React from 'react';
import { connect } from 'react-redux';
import { baseURL } from '../utils/api';
import { withError } from './withError';

const UnauthorizedRoot = React.memo(() => {
  return (
    <div className='page-wrapper ui container' style={{ textAlign: 'center' }}>
      <a className='ui github huge black button authorize' href={ `${baseURL}/auth/github` }>
        <i className='github icon'></i> Sign in with GitHub
      </a>
    </div>
  );
})

export default connect(
  (state) => {
    return {
      appState: state.appState
    };
  }
)(withError(UnauthorizedRoot));
