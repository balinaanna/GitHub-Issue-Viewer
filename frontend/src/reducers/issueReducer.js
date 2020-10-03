import {
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE
} from '../actions/types';
import { repoID } from '../utils/constants';

export default (state = {}, action) => {
  let repoOwner, repoName, number, repoId, updatedRepoIssues;

  switch (action.type) {
    case FETCH_REPOSITORY_ISSUES:
      repoOwner = action.payload.repoOwner;
      repoName = action.payload.repoName;
      repoId = repoID(repoOwner, repoName);

      updatedRepoIssues = Object.assign(
        {},
        state[repoId],
        ...action.payload.issues.map(issue => {
          let mappedIssue = mapIssue(issue);
          mappedIssue.isListable = true;
          return { [issue.number]: mappedIssue }
        })
      );

      return Object.assign(
        {},
        state,
        { [repoId]: updatedRepoIssues}
      );
    case FETCH_ISSUE:
      repoOwner = action.payload.repoOwner;
      repoName = action.payload.repoName;
      number = action.payload.number;
      repoId = repoID(repoOwner, repoName);

      let mappedIssue = mapIssue(action.payload.issue);
      mappedIssue.isListable = false;

      updatedRepoIssues = Object.assign(
        {},
        state[repoId],
        { [number]: mappedIssue }
      );

      return Object.assign(
        {},
        state,
        { [repoId]: updatedRepoIssues }
      );
    default:
      return state;
  }
}

function mapIssue(issue) {
  return {
    id: issue.id,
    title: issue.title,
    number: issue.number,
    author: issue.author,
    createdAt: new Date(issue.created_at),
    body: issue.body,
    state: issue.state
  };
}