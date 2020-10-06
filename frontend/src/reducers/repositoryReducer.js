import {
  FETCH_REPOSITORIES,
  DELETE_SESSION
} from '../actions/types';
import { repoID, PER_PAGE } from '../utils/constants';
import mapRepo from '../mappings/mapRepositoryFromResponse';

const defaultState = {
  canLoadMore: true,
  items: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES:
      const { data } = action.payload;
      const canLoadMore = data.length === PER_PAGE;

      const updatedRepos = Object.assign(
        {},
        state.items,
         ...data.map(repo => {
          let mappedRepo = mapRepo(repo);
          const repoId = repoID(repo.owner, repo.name);
          mappedRepo.isListable = true;

          return { [repoId]: mappedRepo };
        })
      );

      return Object.assign(
        {},
        state,
        { canLoadMore },
        { items: updatedRepos }
      );
    case DELETE_SESSION:
      return defaultState;
    default:
      return state;
  }
}
