import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepositories } from '../actions';
import { PER_PAGE } from '../utils/constants';
import LoadMoreButton from './LoadMoreButton';
import LoadingIndicator from './LoadingIndicator';
import Modal from './Modal';
import Message from './Message';

class RepositoriesList extends React.Component {
  state = {
    page: 0,
    isLoading: false,
    canLoadMore: true,
    error: undefined
  };

  componentDidMount() {
    const repos_count = this.listableRepos().length;

    if (repos_count > 0) {
      const page = parseInt(repos_count / PER_PAGE);
      const canLoadMore = repos_count % PER_PAGE === 0;
      this.setState({ page, canLoadMore });
    } else {
      this.fetchRepos();
    }
  }

  fetchRepos = () => {
    this.setState({ isLoading: true });

    this.props.fetchRepositories(
      this.state.page + 1,

      (canLoadMore) => { this.setState(state => {
        const page = state.page + 1;
        return { isLoading: false, canLoadMore, page };
      })},

      (error) => { this.setState({isLoading: false, error}); }
    );
  }

  listableRepos() {
    return this.props.repos
      .filter(issue => { return issue.isListable; })
      .sort((i1, i2) => i2.createdAt - i1.createdAt);
  }

  hideError = () => { this.setState({ error: undefined }) }

  renderNavigation() {
    return (
      <div className="ui breadcrumb fixed secondary menu">
        <div className='ui container'>
          <NavLink to='/' exact className='section'>Home</NavLink>
        </div>
      </div>
    );
  }

  renderRepositories() {
    const repos = this.listableRepos();

    if (repos.length === 0 && !this.state.canLoadMore) {
      return <div className='ui very padded segment'>There aren't any repositories.</div>;
    }

    return repos.map(repo => {
      return (
        <div role="listitem" className="item" key={repo.id}>
          <i className="folder outline large icon"></i>
          <Link to={ `/${repo.owner}/${repo.name}` } className='content'>
            <div className='header'>
              <span style={{marginRight: '1em'}}>
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
    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation() }
        <div role="list" className='ui divided relaxed list'>
          { this.renderRepositories() }
        </div>
        <LoadMoreButton
          onClick={this.fetchRepos}
          canLoadMore={ this.state.canLoadMore }
          isLoading={ this.state.isLoading }
        />
        { this.state.isLoading ? <LoadingIndicator /> : null }
        { this.renderError() }
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
