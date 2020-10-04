import {
  FETCH_REPOSITORIES
} from '../actions/types';
import { repoID } from '../utils/constants';

export default (state = {}, action) => {
  let repoId;

  switch (action.type) {
    case FETCH_REPOSITORIES:
      return Object.assign(
        {},
        state,
        ...action.payload.map(repo => {
          let mappedRepo = mapRepo(repo);
          repoId = repoID(repo.owner, repo.name);
          mappedRepo.isListable = true;
          return { [repoId]: mappedRepo }
        })
      );
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
    createdAt: new Date(repo.created_at),
    hasIssues: repo.has_issues
  };
}