import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES:
      return Object.assign(
        {},
        state,
        ...action.payload.repos.map(repo => {
          let mappedRepo = mapRepo(repo);
          mappedRepo.is_listable = true;
          return { [`${repo.owner}/${repo.name}`]: mappedRepo }
        })
      );
    case FETCH_REPOSITORY:
    const repo = action.payload;
      let mappedRepo = mapRepo(repo);
      mappedRepo.is_listable = false;
      return { ...state, [`${repo.owner}/${repo.name}`]: mappedRepo };
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
    has_issues: repo.has_issues,
    created_at: repo.created_at
  };
}