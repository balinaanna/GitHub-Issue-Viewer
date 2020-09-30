import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepository, fetchRepositoryIssues } from '../actions';
import IssueAuthor from './IssueAuthor';

class Repository extends React.Component {
  componentDidMount() {
    const { repo_owner, repo_name } = this.props.match.params;

    this.props.fetchRepository(repo_owner, repo_name);
    this.props.fetchRepositoryIssues(repo_owner, repo_name);
  }

  renderNavigation() {
    return (
      <div className="ui breadcrumb">
        <Link to='/' className='section'>Home</Link>
        <div className="divider">/</div>
        <div className="active section" className='active section'>{ this.props.repo.name }</div>
      </div>
    );
  }

  renderIssues(repo, issues) {
    return issues.map(issue => {
      return (
        <div role="listitem" className="item" key={issue.id}>
          <i aria-hidden="true" className="warning circle large icon middle aligned"></i>
          <Link to={ `/${repo.owner}/${repo.name}/issues/${issue.number}` } className='content'>
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
    const { repo, issues } = this.props;
    if (!repo || !issues) { return null; }

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation() }

        <div role="list" className="ui divided relaxed list">
          { this.renderIssues(repo, issues) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { repo_owner, repo_name } = ownProps.match.params;
  const repo = state.repositories[`${repo_owner}/${repo_name}`];
  const issues = state.issues[`${repo_owner}/${repo_name}`];

  return {
    repo,
    issues: issues ? Object.values(issues) : undefined
  }
}

export default connect(
  mapStateToProps,
  { fetchRepository, fetchRepositoryIssues }
)(Repository);
