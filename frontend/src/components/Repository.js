import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepository, fetchRepositoryIssues } from '../actions';
import IssueAuthor from './IssueAuthor';

class Repository extends React.Component {
  componentDidMount() {
    this.props.fetchRepository(this.props.match.params.id);
    this.props.fetchRepositoryIssues(this.props.match.params.id);
  }

  renderNavigation() {
    return (
      <div className="ui breadcrumb">
        <Link to='/' className='section'>Home</Link>
        <div className="divider">/</div>
        <div className="active section" className='active section'>{ this.props.repository.name }</div>
      </div>
    );
  }

  renderIssues() {
    if (!this.props.issues) {
      return null;
    }

    return this.props.issues.map(issue => {
      return (

        <div role="listitem" className="item" key={issue.id}>
          <i aria-hidden="true" className="warning circle large icon middle aligned"></i>
          <Link to={ `/issues/${issue.id}` } className='content'>
            <div className='header'>{ issue.title }</div>
            <div className='description'>
              #{ issue.number } <IssueAuthor issue={ issue } />
            </div>
          </Link>
        </div>
      );
    });
  }

  render() {
    if (!this.props.repository) {
      return null;
    }

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation() }

        <div role="list" className="ui divided relaxed list">
          { this.renderIssues() }
        </div>
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
