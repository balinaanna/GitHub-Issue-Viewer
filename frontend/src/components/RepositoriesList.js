import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Dispatch from 'redux';
import { fetchRepositories } from '../actions';
import LoadMoreButton from './LoadMoreButton';
import { PER_PAGE } from '../utils/constants';

class RepositoriesList extends React.Component {
  state = {
    page: 0,
    isLoading: false,
    canLoadMore: true
  };

  componentDidMount() {
    const repos_count = this.userRepos().length;
    if (repos_count < PER_PAGE) {
      this.loadMore();
    } else {
      const page = parseInt(repos_count / PER_PAGE);
      this.setState({ page });
    }
  }

  loadMore = () => {
    this.setState({ isLoading: true });

    this.props.fetchRepositories(
      this.state.page + 1,

      (canLoadMore) => { this.setState(state => {
        const page = state.page + 1;
        return { isLoading: false, canLoadMore, page };
      })},

      () => { this.setState({isLoading: false}); }
    );
  }

  userRepos() {
    return this.props.repos
      .filter(issue => { return issue.isListable; })
      .sort((i1, i2) => i2.createdAt - i1.createdAt);
  }

  renderNavigation() {
    return (
      <div className="ui breadcrumb">
        <div className='section active'>Home</div>
      </div>
    );
  }

  renderRepositories() {
    const repos = this.userRepos();

    if (repos.length == 0 && !this.state.canLoadMore) {
      return <div class='ui very padded segment'>There aren't any repositories.</div>;
    }

    return repos.map(repo => {
      return (
        <div role="listitem" className="item" key={repo.id}>
          <i aria-hidden="true" className="github large icon"></i>
          <Link to={ `/${repo.owner}/${repo.name}` } className='content'>
            <div className='header'>
              <span style={{marginRight: '1em', wordBreak: 'break-all'}}>
                { repo.fullName }
              </span>

              { repo.isPrivate ?
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
    return (
      <div className='ui container page-wrapper'>
        <div role="list" className='ui divided relaxed list'>
          { this.renderNavigation() }
          { this.renderRepositories() }
        </div>
        <LoadMoreButton
          onClick={this.loadMore}
          isLoading={this.state.isLoading}
          canLoadMore={ this.state.canLoadMore }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    repos: Object.values(state.repositories)
  }
}

export default connect(
  mapStateToProps,
  { fetchRepositories }
)(RepositoriesList);
