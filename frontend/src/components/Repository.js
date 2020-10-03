import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepository, fetchRepositoryIssues } from '../actions';
import IssueAuthor from './IssueAuthor';
import LoadMoreButton from './LoadMoreButton';
import { PER_PAGE, repoID } from '../utils/constants';

class Repository extends React.Component {
  state = {
    page: 0,
    isLoading: false,
    canLoadMore: true
  };

  componentDidMount() {
    const { repoOwner, repoName } = this.props.match.params;

    if (!this.props.repo) {
      this.props.fetchRepository(repoOwner, repoName);
    }

    if (this.props.issues && this.props.issues.length >= PER_PAGE) {
      const issues_count = this.userIssues(this.props.issues).length;
      const page = parseInt(issues_count / PER_PAGE);
      this.setState({ page });
    } else {
      this.loadMore(repoOwner, repoName);
    }
  }

  loadMore = (repoOwner, repoName) => {
    this.setState({ isLoading: true });

    this.props.fetchRepositoryIssues(
      repoOwner,
      repoName,
      this.state.page + 1,

      (canLoadMore) => { this.setState(state => {
        const page = state.page + 1;
        return { isLoading: false, canLoadMore, page };
      })},

      () => { this.setState({isLoading: false}); }
    );
  }

  userIssues(issues) {
    return issues
      .filter(issue => { return issue.isListable; })
      .sort((i1, i2) => i2.createdAt - i1.createdAt);
  }

  renderNavigation() {
    return (
      <div className="ui breadcrumb">
        <Link to='/' className='section'>Home</Link>
        <div className="divider">/</div>
        <div className='active section'>{ this.props.repo.name }</div>
      </div>
    );
  }

  renderIssues(repo, issues) {
    if (issues.length === 0 && !this.state.canLoadMore) {
      return <div className='ui very padded segment'>There aren't any issues.</div>;
    }

    return this.userIssues(issues).map(issue => {
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

        <LoadMoreButton
          onClick={ () => this.loadMore(repo.owner, repo.name) }
          isLoading={ this.state.isLoading }
          canLoadMore={ this.state.canLoadMore }
        />
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
  { fetchRepository, fetchRepositoryIssues }
)(Repository);
