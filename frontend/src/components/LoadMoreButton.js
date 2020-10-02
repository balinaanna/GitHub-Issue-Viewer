import React from 'react';

export default function LoadMoreButton(props) {
  if (!props.canLoadMore) { return null };

  if (props.isLoading) {
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

  return (
    <div className='load-more'>
      <button className='ui basic grey fluid button' onClick={ props.onClick }>
        Load More
      </button>
    </div>
  );
}
