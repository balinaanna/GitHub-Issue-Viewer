import React from 'react';
import ReactLoading from 'react-loading';

export default function LoadMoreButton(props) {
  if (!props.canLoadMore) { return null };

  if (props.isLoading) {
     return (
       <div className='loading-indicator'>
         <ReactLoading type='bars' color='#ccc' className='loading' />
       </div>
     );
  }

  return (
    <div className='load-more'>
      <button className='ui basic fluid button' onClick={ props.onClick }>
        Load More
      </button>
    </div>
  );
}
