import {
  FETCH_REPOSITORIES
} from '../actions/types';
import { repoID, PER_PAGE } from '../utils/constants';
import mapRepo from '../mappings/mapRepositoryFromResponse';

const defaultState = {
  canLoadMore: true,
  items: {}
};

export default (state = defaultState, action) => {
  let repoId;

  switch (action.type) {
    case FETCH_REPOSITORIES:
      const canLoadMore = action.payload.length == PER_PAGE;

      const updatedRepos = Object.assign(
        {},
        state.items,
        ...action.payload.map(repo => {
          let mappedRepo = mapRepo(repo);
          repoId = repoID(repo.owner, repo.name);
          mappedRepo.isListable = true;
          return { [repoId]: mappedRepo }
        })
      );

      return Object.assign(
        {},
        state,
        { canLoadMore },
        { items: updatedRepos }
      );
    default:
      return state;
  }
}
