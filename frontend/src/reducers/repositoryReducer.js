import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY
} from '../actions/types';
import { repoID } from '../utils/constants';

export default (state = {}, action) => {
  let repoId;

  switch (action.type) {
    case FETCH_REPOSITORIES:
      return Object.assign(
        {},
        state,
        ...action.payload.repos.map(repo => {
          let mappedRepo = mapRepo(repo);
          repoId = repoID(repo.owner, repo.name);
          mappedRepo.isListable = true;
          return { [repoId]: mappedRepo }
        })
      );
    case FETCH_REPOSITORY:
      const repo = action.payload;
      repoId = repoID(repo.owner, repo.name);
      let mappedRepo = mapRepo(repo);
      mappedRepo.isListable = false;
      return { ...state, [repoId]: mappedRepo };
    default:
      return state;
  }
}

function mapRepo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    isPrivate: repo.private,
    url: repo.url,
    description: repo.description,
    owner: repo.owner,
    createdAt: new Date(repo.created_at)
  };
}