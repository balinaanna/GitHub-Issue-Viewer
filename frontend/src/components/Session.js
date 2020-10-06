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
      queryParams: {}
    }
  }
  componentDidMount() {
    const { location: { search}, fetchData } = this.props;
    const queryParams = queryString.parse(search);
    const { code } = queryParams;

    if (code) {
      this.props.fetchData({ code });
    } else {
      this.setState({ queryParams });
    }
  }

  render() {
    if (this.props.session.token) {
      return <Redirect to='/' />
    }

    if (this.state.queryParams.error) {
      return <Redirect to='/' />;
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
        { this.props.renderError() }
      </>
    );
  }
}

export default connect(
  (state, ownProps) => {
    return {session: state.session };
  },
  { fetchData: createSession }
)(withData({ shouldFetchOnMount: false })(Session));
