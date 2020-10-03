import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchIssue, fetchRepository } from '../actions';
import { repoID } from '../utils/constants';
import IssueAuthor from './IssueAuthor';

class Issue extends React.Component {
  componentDidMount() {
    if (!this.props.repo) {
      const { repoOwner, repoName, number } = this.props.match.params;
      this.props.fetchRepository(repoOwner, repoName);

      if (!this.props.issue) {
        this.props.fetchIssue(repoOwner, repoName, number);
      }
    }
  }

  renderNavigation() {
    const { repoOwner, repoName, number } = this.props.match.params;

    return (
      <div className="ui breadcrumb fixed secondary menu">
        <div className='ui container'>
          <NavLink to='/' exact className='section'>Home</NavLink>
          <div className="divider">/</div>
          <NavLink to={`/${repoID(repoOwner, repoName)}`} exact className='section truncate'>{ repoName }</NavLink>
          <div className="divider">/</div>
          <NavLink to={`/${repoID(repoOwner, repoName)}/issues/${number}`} exact className='section'>#{ number }</NavLink>
        </div>
      </div>
    );
  }

  renderIssue(repo, issue) {
    return (
      <>
        <h1 className='ui header'>
          { issue.title }
          <div className='ui sub header'>
            #{ issue.number }
          </div>
        </h1>
        <IssueAuthor issue={ issue } />
        <div className='ui divider'></div>
        <ReactMarkdown source={ issue.body } />
      </>
    );
  }

  render() {
    const { repo, issue } = this.props;

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation() }
        { (!repo || !issue) ? null : this.renderIssue(repo, issue) }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { repoOwner, repoName, number } = ownProps.match.params;
  const repoId = repoID(repoOwner, repoName);

  const repo = state.repositories[repoId];
  const issues = state.issues[repoId];
  const issue = issues ? issues[number] : undefined;

  return { repo, issue }
}

export default connect(
  mapStateToProps,
  { fetchIssue, fetchRepository }
)(Issue);
