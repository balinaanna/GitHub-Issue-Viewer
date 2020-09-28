import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES:
      return { ...state, ...action.payload };
    case FETCH_REPOSITORY:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
