import React from 'react';

export default function Message(props) {
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
}
