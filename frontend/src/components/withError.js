import React from 'react';
import Modal from './Modal';
import Message from './Message';
import { getHocDisplayName } from '../utils/constants';

export const withError = (WrappedComponent) => {
  class WithError extends React.PureComponent {
    renderError() {
      const { error } = this.props.appState;

      if (!error) { return null };

      return (
        <Modal>
          <div className='page-wrapper'>
            <Message className='negative' content={ error } />
          </div>
        </Modal>
      );
    }

    render() {
      return (
        <>
          <WrappedComponent
            { ...this.props } />
          { this.renderError() }
        </>
      );
    }
  }

  WithError.displayName = `WithError(${getHocDisplayName(WrappedComponent)})`;

  return WithError;
}
