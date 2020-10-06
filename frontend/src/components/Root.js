import React from 'react';
import { baseURL } from '../utils/api';

export default function Root() {
  return (
    <div className='fullscreen'>
        <div className='page-wrapper ui container' style={{ textAlign: 'center' }}>
        <a className='ui github huge black button' href={ `${baseURL}/auth/github` }>
          <i className='github icon'></i> Sign in with GitHub
        </a>
      </div>
    </div>
  );
}
