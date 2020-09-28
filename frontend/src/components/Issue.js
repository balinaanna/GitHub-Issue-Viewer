import React from 'react';
import { connect } from 'react-redux';
import { fetchIssue } from '../actions';

class Issue extends React.Component {
  componentDidMount() {
    this.props.fetchIssue(this.props.match.params.id);
  }

  render() {
    if (!this.props.issue) {
      return null;
    }

    return (
      <div>
        { `Issue id: ${this.props.issue.id}, name: ${this.props.issue.name}`}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    issue: state.issues[ownProps.match.params.id]
  }
}

export default connect(
  mapStateToProps,
  { fetchIssue }
)(Issue);
