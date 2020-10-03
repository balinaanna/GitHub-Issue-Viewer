import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchIssue } from '../actions';
import { repoID } from '../utils/constants';
import Modal from './Modal';
import Message from './Message';
import IssueAuthor from './IssueAuthor';
import LoadingIndicator from './LoadingIndicator';

class Issue extends React.Component {
  state = {
    isLoading: false,
    error: undefined
  };

  componentDidMount() {
    const { repoOwner, repoName, number } = this.props.match.params;

    if (!this.props.issue) {
      this.fetchIssue(repoOwner, repoName, number);
    }
  }

  fetchIssue = (repoOwner, repoName, number) => {
    this.setState({ isLoading: true });

    this.props.fetchIssue(
      repoOwner,
      repoName,
      number,
      () => { this.setState({ isLoading: false }) },
      (error) => { this.setState({ isLoading: false, error }); }
    );
  }

  hideError = () => { this.setState({ error: undefined }) }

  renderNavigation() {
    const { repoOwner, repoName, number } = this.props.match.params;

    return (
      <div className="ui breadcrumb fixed secondary menu">
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

  renderIssue(issue) {
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

  renderError() {
    const { error } = this.state;
    if (!error) { return null };
    const errorContent = { header: error.message, text: 'Try again later.' }

    return (
      <Modal>
        <div className='page-wrapper' onClick={ this.hideError } >
          <Message className='negative' content={ errorContent } />
        </div>
      </Modal>
    );
  }

  render() {
    const { issue } = this.props;
    const { repoOwner, repoName } = this.props.match.params;

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation(repoOwner, repoName) }
        { !!issue ? this.renderIssue(issue) : null }
        { this.state.isLoading ? <LoadingIndicator /> : null }
        { this.renderError() }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { repoOwner, repoName, number } = ownProps.match.params;
  const repoId = repoID(repoOwner, repoName);
  const issues = state.issues[repoId];
  const issue = issues ? issues[number] : undefined;

  return { issue }
}

export default connect(
  mapStateToProps,
  { fetchIssue }
)(Issue);
