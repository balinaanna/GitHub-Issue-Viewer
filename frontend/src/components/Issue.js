import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchIssue } from '../actions';
import { repoID } from '../utils/constants';
import IssueAuthor from './IssueAuthor';
import LoadingIndicator from './LoadingIndicator';
import { withData } from './withData';

class Issue extends React.PureComponent {

  renderNavigation() {
    const { repoOwner, repoName, number } = this.props.match.params;

    return (
      <div className='ui breadcrumb fixed secondary menu'>
        <div className='ui container'>
          <NavLink to='/' exact className='section'>Home</NavLink>
          <div className='divider'>/</div>
          <NavLink to={`/${repoID(repoOwner, repoName)}`} exact className='section truncate'>{ repoName }</NavLink>
          <div className='divider'>/</div>
          <NavLink to={`/${repoID(repoOwner, repoName)}/issues/${number}`} exact className='section'>#{ number }</NavLink>
        </div>
      </div>
    );
  }

  renderIssue(data, number) {
    if (!data || !data.items || !data.items[number]) { return null };
    const issue = data.items[number];

    return (
      <>
        <h1 className='ui header'>
          { issue.title }
          <div className='ui sub header'>
            #{ issue.number }
            {
              issue.state === 'open' ?
                <span className='ui horizontal label'>
                  open
                </span>
              : null
            }
          </div>
        </h1>
        <IssueAuthor issue={ issue } />
        <div className='ui divider'></div>
        <ReactMarkdown source={ issue.body } />
      </>
    );
  }

  render() {
    const { data, isLoading } = this.props;
    const { repoOwner, repoName, number } = this.props.match.params;

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation(repoOwner, repoName) }
        { this.renderIssue(data, number) }
        { isLoading ? <LoadingIndicator /> : null }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { repoOwner, repoName, number } = ownProps.match.params;
  const repoId = repoID(repoOwner, repoName);

  return {
    data: state.issues[repoId],
    fetchParams: { repoOwner, repoName, number },
    appState: state.appState,
  };
}

export default connect(
  mapStateToProps,
  { fetchData: fetchIssue }
)(withData()(Issue));
