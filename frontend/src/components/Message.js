import React from 'react';

const Message = React.memo((props) => {
  let { className, content, ...otherProps } = props;
  const classNames = ['ui message container', className].join(' ');

  return (
    <div className={ classNames } { ...otherProps } >
      <div className='header'>
        { content.header }
      </div>
      <p>{ content.text }</p>
    </div>
  );
});

export default Message;
