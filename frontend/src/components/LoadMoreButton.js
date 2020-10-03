import React from 'react';
import LoadingIndicator from './LoadingIndicator';

export default function LoadMoreButton(props) {
  if (props.canLoadMore === false || !!props.isLoading) { return null };

  return (
    <div className='load-more'>
      <button className='ui basic grey fluid button' onClick={ props.onClick }>
        <i className='ui arrow down big icon'></i>
      </button>
    </div>
  );
}
