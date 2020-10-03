import React from 'react';

export default function LoadingIndicator(props) {
  return (
    <div className='load-more'>
      <div className='ui icon message'>
        <i className='circle notched loading icon'></i>
        <div className='content'>
          <div className='header'>Just one second</div>
          We are fetching that content for you.
        </div>
      </div>
   </div>
  );
}
