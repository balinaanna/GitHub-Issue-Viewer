import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div className="ui breadcrumb">
        <Link to='/' className='section'>Home</Link>
        <div className="divider">/</div>
        <Link to={ `/${repoID(repoOwner, repoName)}` } className='section'>{repoName}</Link>
        <div className="divider">/</div>
        <div className="active section">#{ number }</div>
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

        <ReactMarkdown source={ issue.body } />
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
