import React from 'react';
import Modal from './Modal';
import Message from './Message';
import { getHocDisplayName } from '../utils/constants';

export const withData = ({ shouldFetchOnMount = true } = {}) => (WrappedComponent) => {
  class WithData extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: false,
        error: undefined
      };
      this.wrappedRef = React.createRef();
    }

    componentDidMount() {
      console.log('withData mount', this.props);
      if (!shouldFetchOnMount) { return };

      const { data } = this.props;

      if (!(this.props.data)) {
        this.fetchData(this.props.fetchParams);
      }
    }

    fetchData = (params = {}) => {
      this.setState({ isLoading: true });

      this.props.fetchData(
        params,

        (result) => {
          this.setState({ isLoading: false });

          this.wrappedRef.current &&
            this.wrappedRef.current.onFetchSuccess &&
            this.wrappedRef.current.onFetchSuccess(result);
        },
        (error) => {
          this.setState({ isLoading: false });
          this.showError(error);
        }
       );
    }

    showError = (error) => { this.setState({ error }) }
    hideError = () => { this.setState({ error: undefined }) }

    renderError = () => {
      const { error } = this.state;
      if (!error) { return null };

      const errorContent = { header: error.message, text: 'Try again later.' }

      return (
        <Modal>
          <div className='page-wrapper' onClick={ this.hideError } >
            <Message className='negative' content={ errorContent } />
          </div>
        </Modal>
      );
    }

    render() {
      return <WrappedComponent
        { ...this.props }
        ref={ this.wrappedRef }
        error={ this.state.error }
        isLoading={ this.state.isLoading }
        renderError={ this.renderError }
        fetchData={ this.fetchData } />;
    }
  }

  WithData.displayName = `WithData(${getHocDisplayName(WrappedComponent)})`;

  return WithData;
}
