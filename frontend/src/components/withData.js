import React from 'react';
import { getHocDisplayName } from '../utils/constants';
import { SET_ERROR, UNSET_ERROR, DELETE_SESSION } from '../actions/types';
import { withError } from './withError';

export const withData = ({ shouldFetchOnMount = true } = {}) => (WrappedComponent) => {
  class WithData extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: false,
        errorTimeout: undefined
      };

      this.wrappedRef = React.createRef();
    }

    componentDidMount() {
      if (!shouldFetchOnMount) { return };

      if (!this.props.data) {
        this.fetchData(this.props.fetchParams);
      }
    }

    componentWillUnmount = () => {
      if (this.state.errorTimeout) {
        clearTimeout(this.state.errorTimeout)
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
          const errorTimeout = setTimeout(() => {
            this.setState({ errorTimeout: undefined });
            this.props.dispatch({ type: UNSET_ERROR });
          }, 3000);

          this.setState({ isLoading: false, errorTimeout });

          const { response } = error;
          let header, text, status;

          if (response) {
            header = response.data.error.title;
            text = response.data.error.detail;
            status = response.status;
          } else {
            header = error.message;
            text = 'Try again later.';
          }

          const errorContent = { header, text };

          if ([401, 403].includes(status)) {
            window.localStorage.removeItem('token');
            this.props.dispatch({ type: DELETE_SESSION });
          }

          this.props.dispatch({ type: SET_ERROR, payload: errorContent });
        }
       );
    }

    render() {
      return <WrappedComponent
        { ...this.props }
        ref={ this.wrappedRef }
        isLoading={ this.state.isLoading }
        fetchData={ this.fetchData } />;
    }
  }

  WithData.displayName = `WithData(${getHocDisplayName(WrappedComponent)})`;

  return withError(WithData);
}
