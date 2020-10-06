import React from 'react';

const LoadingIndicator = React.memo((props) => {
  const defaultContent = 'Loading...';

  const { content = defaultContent, ...otherProps } = props;

  let { className } = props;
  const classNames = ['ui icon message', className].join(' ');

  return (
    <div { ...otherProps } className='loading-indicator'>
      <div className={ classNames }>
        <i className='circle notched loading icon'></i>
        <div className='content'>
          <div className='header'>{ content }</div>
        </div>
      </div>
   </div>
  );
});

export default LoadingIndicator;
