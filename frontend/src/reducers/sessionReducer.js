import {
  SET_ACCESS_TOKEN,
  DELETE_SESSION
} from '../actions/types';

const defaultState = {
  token: undefined
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:

      return Object.assign(
        {},
        state,
        { token: action.payload.token }
      );
    case DELETE_SESSION:
      return defaultState;
    default:
      return state;
  }
}
