import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepositories } from '../actions';

class RepositoriesList extends React.Component {
  componentDidMount() {
    this.props.fetchRepositories();
  }

  renderNavigation() {
    return (
      <div className="ui breadcrumb">
        <div className='section active'>Home</div>
      </div>
    );
  }

  renderRepositories() {
    return this.props.repos.map(repo => {
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
        { this.renderNavigation() }
        <div role="list" className="ui divided relaxed list">
          { this.renderRepositories() }
        </div>
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
