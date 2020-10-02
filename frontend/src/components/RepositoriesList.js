import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepositories } from '../actions';
import LoadMoreButton from './LoadMoreButton';
import { PER_PAGE } from '../utils/constants';

class RepositoriesList extends React.Component {
  state = { page: 1 };

  componentDidMount() {
    const repos_count = this.props.repos.length;
    if (repos_count < PER_PAGE) {
      this.props.fetchRepositories(this.state.page);
    } else {
      const page = parseInt(repos_count / PER_PAGE);
      this.setState({ page });
    }
  }

  renderNavigation() {
    return (
      <div className="ui breadcrumb">
        <div className='section active'>Home</div>
      </div>
    );
  }

  loadMore = () => {
    const page = this.state.page + 1;
    this.setState( { page });
    this.props.fetchRepositories(page);
  }

  renderRepositories() {
    return this.props.repos
      .filter(issue => { return issue.is_listable; })
      .map(repo => {
        return (
          <div role="listitem" className="item" key={repo.id}>
            <i aria-hidden="true" className="github large icon"></i>
            <Link to={ `/${repo.owner}/${repo.name}` } className='content'>
              <div className='header'>
                <span style={{marginRight: '1em', wordBreak: 'break-all'}}>
                  { repo.full_name }
                </span>

                { repo.private ?
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
        <LoadMoreButton onClick={this.loadMore} />
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
