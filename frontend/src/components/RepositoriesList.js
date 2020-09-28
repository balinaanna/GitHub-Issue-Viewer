import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRepositories } from '../actions';

class RepositoriesList extends React.Component {
  componentDidMount() {
    this.props.fetchRepositories();
  }

  render() {
    return this.props.repositories.map(repo => {
      return (
        <Link to={`/repository/${repo.id}`} key={repo.id}>
          {repo.name}
        </Link>
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    repositories: Object.values(state.repositories)
  }
}

export default connect(
  mapStateToProps,
  { fetchRepositories }
)(RepositoriesList);
