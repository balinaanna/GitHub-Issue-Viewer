import { combineReducers } from 'redux';
import repositoryReducer from './repositoryReducer';
import issueReducer from './issueReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
  repositories: repositoryReducer,
  issues: issueReducer,
  session: sessionReducer
});
