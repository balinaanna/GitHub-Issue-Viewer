import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES:
      return Object.assign({}, ...action.payload.map(repo => {
        return { [`${repo.owner}/${repo.name}`]: repo }
      }));
    case FETCH_REPOSITORY:
    const repo = action.payload;
      return { ...state, [`${repo.owner}/${repo.name}`]: repo };
    default:
      return state;
  }
}
