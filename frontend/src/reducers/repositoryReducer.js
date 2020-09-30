import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES:
      return Object.assign({}, ...action.payload.map(repo => {
        return { [`${repo.owner}/${repo.name}`]: mapRepo(repo) }
      }));
    case FETCH_REPOSITORY:
    const repo = action.payload;
      return { ...state, [`${repo.owner}/${repo.name}`]: mapRepo(repo) };
    default:
      return state;
  }
}

function mapRepo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    private: repo.private,
    url: repo.url,
    description: repo.description,
    owner: repo.owner,
    has_issues: repo.has_issues
  };
}