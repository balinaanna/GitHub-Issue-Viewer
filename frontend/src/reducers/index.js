import { combineReducers } from 'redux';
import repositoryReducer from './repositoryReducer';
import issueReducer from './issueReducer';

export default combineReducers({
  repositories: repositoryReducer,
  issues: issueReducer
});
