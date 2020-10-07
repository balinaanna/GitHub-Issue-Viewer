import {
  SET_ERROR,
  UNSET_ERROR,
  DELETE_SESSION
} from '../actions/types';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return Object.assign({}, state, { error: action.payload });
    case UNSET_ERROR:
    case DELETE_SESSION:
      return defaultState;
    default:
      return state;
  }
}
