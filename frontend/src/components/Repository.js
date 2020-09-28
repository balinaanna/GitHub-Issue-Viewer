import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepository, fetchRepositoryIssues } from '../actions';

class Repository extends React.Component {
  componentDidMount() {
    this.props.fetchRepository(this.props.match.params.id);
    this.props.fetchRepositoryIssues(this.props.match.params.id);
  }

  renderIssues() {
    if (!this.props.issues) {
      return null;
    }

    return this.props.issues.map(issue => {
      return (
         <Link to={`/issue/${issue.id}`} key={issue.id}>
          {issue.name}
        </Link>
      );
    });
  }

  render() {
    if (!this.props.repository) {
      return null;
    }

    return (
      <div>
        <div>{ `Repo id: ${this.props.repository.id}`}</div>

        { this.renderIssues() }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    repository: state.repositories[ownProps.match.params.id],
    issues: Object.values(state.issues)
  }
}

export default connect(
  mapStateToProps,
  { fetchRepository, fetchRepositoryIssues }
)(Repository);
