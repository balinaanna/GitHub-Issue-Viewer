import React from 'react';

export default function LoadMoreButton(props) {
  return (
    <div className='load-more'>
      <button className='ui basic fluid button' onClick={props.onClick}>
        Load More
      </button>
    </div>
  );
}
