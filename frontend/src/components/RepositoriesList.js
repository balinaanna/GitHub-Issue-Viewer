import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepositories } from '../actions';
import { PER_PAGE } from '../utils/constants';
import LoadMoreButton from './LoadMoreButton';
import LoadingIndicator from './LoadingIndicator';
import { withListableData } from './withListableData';

class RepositoriesList extends React.Component {
  renderNavigation() {
    return (
      <div className='ui breadcrumb fixed secondary menu'>
        <div className='ui container'>
          <NavLink to='/' exact className='section'>Home</NavLink>
        </div>
      </div>
    );
  }

  renderRepositories(items, canLoadMore) {
    const repos = Object.values(items);

    if (repos.length === 0 && !canLoadMore) {
      return (
        <div className='ui very padded segment'>
          There aren't any repositories.
        </div>
      );
    }

    return this.props.listableItems(repos).map(repo => {
      return (
        <div role='listitem' className='item' key={repo.id}>
          <i className='folder outline large icon'></i>
          <Link to={ `/${repo.owner}/${repo.name}` } className='content'>
            <div className='header'>
              <span style={{marginRight: '1em'}}>
                { repo.fullName }
              </span>
              {
                repo.isPrivate ?
                  <span className='ui horizontal label'>
                    Private
                  </span>
                : null
              }
            </div>
            <div className='description'>{ repo.description }</div>
          </Link>
        </div>
      );
    });
  }

  render() {
    const {
      data: { items, canLoadMore }, pagination: { pagesCount }, fetchData, isLoading, renderError
    } = this.props;

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation() }

        <div role='list' className='ui divided relaxed list'>
          { this.renderRepositories(items, canLoadMore) }
        </div>

        <LoadMoreButton
          onClick={ () => { fetchData({ page: pagesCount + 1 }) } }
          canLoadMore={ canLoadMore }
          isLoading={ isLoading }
        />
        { isLoading ? <LoadingIndicator /> : null }

        { renderError() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.repositories
  }
}

export default connect(
  mapStateToProps,
  { fetchData: fetchRepositories }
)(
  withListableData(RepositoriesList)
);
