import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { createSession } from '../actions';
import { withData } from './withData';
import LoadingIndicator from './LoadingIndicator';

class Session extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    }
  }

  componentDidMount() {
    const { location: { search}, fetchData } = this.props;
    const queryParams = queryString.parse(search);
    const { code, error } = queryParams;

    if (error) { this.setState({ error }) }
    if (code) { this.props.fetchData({ code }) }
  }

  render() {
    if (this.props.session.token || this.state.error) {
      return <Redirect to='/' />
    }

    return (
      <>
        { this.props ?
          <div className='fullscreen'>
            <div className='page-wrapper ui container'>
              <LoadingIndicator className='' content='Logging you in...' />
            </div>
          </div>
        : null }
      </>
    );
  }
}

export default connect(
  (state) => {
    return {
      session: state.session,
      appState: state.appState
    };
  },
  { fetchData: createSession }
)(withData({ shouldFetchOnMount: false })(Session));
