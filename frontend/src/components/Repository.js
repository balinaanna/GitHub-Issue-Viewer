import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepositoryIssues } from '../actions';
import { PER_PAGE, repoID } from '../utils/constants';
import LoadMoreButton from './LoadMoreButton';
import LoadingIndicator from './LoadingIndicator';
import Modal from './Modal';
import Message from './Message';
import IssueAuthor from './IssueAuthor';

class Repository extends React.Component {
  state = {
    page: 0,
    isLoading: false,
    canLoadMore: true,
    error: undefined
  };

  componentDidMount() {
    const { repoOwner, repoName } = this.props.match.params;
    const { repo, issues } = this.props;
    const listableIssues = this.listableIssues(issues);

    this.setState({ repoOwner, repoName });

    if (listableIssues.length > 0) {
      const issues_count = listableIssues.length;
      const page = parseInt(issues_count / PER_PAGE);
      const canLoadMore = issues_count % PER_PAGE === 0;
      this.setState({ page, canLoadMore });
    } else {
      this.fetchIssues(repoOwner, repoName);
    }
  }

  fetchIssues = (repoOwner, repoName) => {
    this.setState({ isLoading: true });

    this.props.fetchRepositoryIssues(
      repoOwner,
      repoName,
      this.state.page + 1,

      (canLoadMore) => { this.setState(state => {
        const page = state.page + 1;
        return { isLoading: false, canLoadMore, page };
      })},

      (error) => { this.setState({isLoading: false, error}); }
    );
  }

  listableIssues(issues = []) {
    return issues
      .filter(issue => { return issue.isListable; })
      .sort((i1, i2) => i2.createdAt - i1.createdAt);
  }

  hideError = () => { this.setState({ error: undefined }) }

  renderNavigation() {
    const { repoOwner, repoName } = this.props.match.params;

    return (
      <div className="ui breadcrumb fixed secondary menu">
        <div className='ui container'>
          <NavLink to='/' exact className='section'>Home</NavLink>
          <div className="divider">/</div>
          <NavLink to={`/${repoID(repoOwner, repoName)}`} exact className='section truncate'>{ repoName }</NavLink>
        </div>
      </div>
    );
  }

  renderIssues(repoOwner, repoName, issues) {
    if (issues.length === 0 && !this.state.canLoadMore) {
      return <div className='ui very padded segment'>There aren't any issues.</div>;
    }

    return this.listableIssues(issues).map(issue => {
      return (
        <div role="listitem" className="item" key={issue.id}>
          <i aria-hidden="true" className="warning circle large icon middle aligned"></i>
          <NavLink to={ `/${repoOwner}/${repoName}/issues/${issue.number}` } className='content'>
            <div className='header'>{ issue.title }</div>
            <div className='description'>
              #{ issue.number } <IssueAuthor issue={ issue } />
            </div>
          </NavLink>
        </div>
      );
    });
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
    const { issues } = this.props;
    const { repoOwner, repoName } = this.props.match.params;

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation() }

        <div role="list" className="ui divided relaxed list">
          { !!issues ? this.renderIssues(repoOwner, repoName, issues) : null }
        </div>

        <LoadMoreButton
          onClick={ () => this.fetchIssues(repoOwner, repoName) }
          canLoadMore={ this.state.canLoadMore }
          isLoading={ this.state.isLoading } />
        { this.state.isLoading ? <LoadingIndicator /> : null }
        { this.renderError() }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { repoOwner, repoName } = ownProps.match.params;
  const repoId = repoID(repoOwner, repoName);
  const repo = state.repositories[repoId];
  const issues = state.issues[repoId];

  return {
    repo,
    issues: issues ? Object.values(issues) : undefined
  }
}

export default connect(
  mapStateToProps,
  { fetchRepositoryIssues }
)(Repository);
