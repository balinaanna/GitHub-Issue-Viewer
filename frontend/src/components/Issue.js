import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchIssue, fetchRepository } from '../actions';
import IssueAuthor from './IssueAuthor';

class Issue extends React.Component {
  componentDidMount() {
    const { repo_owner, repo_name, number } = this.props.match.params;

    this.props.fetchRepository(repo_owner, repo_name);
    this.props.fetchIssue(repo_owner, repo_name, number);
  }

  renderNavigation() {
    const { repo, issue } = this.props;

    return (
      <div className="ui breadcrumb">
        <Link to='/' className='section'>Home</Link>
        <div className="divider">/</div>
        <Link to={ `/${repo.owner}/${repo.name}` } className='section'>Repo name</Link>
        <div className="divider">/</div>
        <div className="active section">#{ this.props.issue.number }</div>
      </div>
    );
  }

  render() {
    const { repo, issue } = this.props;

    if (!repo || !issue) { return null; }

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation() }

        <h1 className='ui header'>
          { issue.title }
          <div className='ui sub header'>
            #{ issue.number }
          </div>
        </h1>

        <IssueAuthor issue={ issue } />

        <div className='ui divider'></div>

        <div>{ issue.body }</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { repo_owner, repo_name, number } = ownProps.match.params;
  const repo = state.repositories[`${repo_owner}/${repo_name}`];
  const issues = state.issues[`${repo_owner}/${repo_name}`];
  const issue = issues ? issues[number] : undefined;

  return { repo, issue }
}

export default connect(
  mapStateToProps,
  { fetchIssue, fetchRepository }
)(Issue);
