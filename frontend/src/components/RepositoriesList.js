import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepositories } from '../actions';
import LoadMoreButton from './LoadMoreButton';
import LoadingIndicator from './LoadingIndicator';
import { withListableData } from './withListableData';

const Repo = React.memo((props) => {
  const { repo } = props;
  return (
    <div role='listitem' className='item'>
      <i className='folder outline large icon'></i>
      <Link to={ `/${repo.owner}/${repo.name}` } className='content'>
        <div className='header'>
          <span style={{ marginRight: '1em' }}>
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
      </Link>
    </div>
  );
});

class RepositoriesList extends React.PureComponent {
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
      return <Repo repo={ repo } key={ repo.id } />;
    });
  }

  render() {
    const {
      data: { items, canLoadMore }, pagesCount, fetchData, isLoading, renderError
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
  return { data: state.repositories };
}

export default connect(
  mapStateToProps,
  { fetchData: fetchRepositories }
)(
  withListableData(RepositoriesList)
);
