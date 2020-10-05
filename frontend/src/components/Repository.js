import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepositoryIssues } from '../actions';
import { PER_PAGE, repoID } from '../utils/constants';
import LoadMoreButton from './LoadMoreButton';
import LoadingIndicator from './LoadingIndicator';
import IssueAuthor from './IssueAuthor';
import { withListableData } from './withListableData';

class Repository extends React.Component {

  renderNavigation() {
    const { repoOwner, repoName } = this.props.match.params;

    return (
      <div className='ui breadcrumb fixed secondary menu'>
        <div className='ui container'>
          <NavLink to='/' exact className='section'>Home</NavLink>
          <div className='divider'>/</div>
          <NavLink to={`/${repoID(repoOwner, repoName)}`} exact className='section truncate'>{ repoName }</NavLink>
        </div>
      </div>
    );
  }

  renderIssues(repoOwner, repoName, items, canLoadMore) {
    const issues = Object.values(items);

    if (issues.length === 0 && !canLoadMore) {
      return <div className='ui very padded segment'>There aren't any issues.</div>;
    }

    return this.props.listableItems(issues).map(issue => {
      return (
        <div role='listitem' className='item' key={issue.id}>
          <i aria-hidden='true' className='warning circle large icon middle aligned'></i>
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

  render() {
    const {
      data: { items, canLoadMore } = {items: {}, canLoadMore: true},
      pagination: { pagesCount },
      fetchData,
      isLoading,
      renderError,
    } = this.props;
    const { repoOwner, repoName } = this.props.match.params;

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation() }

        <div role='list' className='ui divided relaxed list'>
          { this.renderIssues(repoOwner, repoName, items, canLoadMore) }
        </div>

        <LoadMoreButton
          onClick={ () => { fetchData({ repoOwner, repoName, page: pagesCount + 1 }) } }
          canLoadMore={ canLoadMore }
          isLoading={ isLoading }
        />
        { isLoading ? <LoadingIndicator /> : null }

        { renderError() }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { repoOwner, repoName } = ownProps.match.params;
  const repoId = repoID(repoOwner, repoName);
  const repo = state.repositories.items[repoId];

  return {
    data: state.issues[repoId],
    fetchParams: { repoOwner, repoName },
    shouldFetchOnMount: (repo && repo.hasIssues)
  }
}

export default connect(
  mapStateToProps,
  { fetchData: fetchRepositoryIssues }
)(withListableData(Repository));
