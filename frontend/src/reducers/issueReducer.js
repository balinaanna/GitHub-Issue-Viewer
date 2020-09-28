import {
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORY_ISSUES:
      return { ...state, ...action.payload };
    case FETCH_ISSUE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
