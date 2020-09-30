import {
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE
} from '../actions/types';

export default (state = {}, action) => {
  let repo_owner, repo_name, number, repo_id, updatedRepoIssues;

  switch (action.type) {
    case FETCH_REPOSITORY_ISSUES:
      repo_owner = action.payload.repo_owner;
      repo_name = action.payload.repo_name;
      repo_id = `${repo_owner}/${repo_name}`;

      updatedRepoIssues = Object.assign(
        {},
        ...action.payload.issues.map(issue => { return { [issue.number]: issue } })
      );

      return Object.assign(
        {},
        state[repo_id],
        { [repo_id]: updatedRepoIssues}
      );
    case FETCH_ISSUE:
      repo_owner = action.payload.repo_owner;
      repo_name = action.payload.repo_name;
      number = action.payload.number;
      repo_id = `${repo_owner}/${repo_name}`;

      updatedRepoIssues = Object.assign(
        {},
        state[repo_id],
        { [number]: action.payload.issue}
      );

      return Object.assign(
        {},
        state[repo_id],
        { [repo_id]: updatedRepoIssues }
      );
    default:
      return state;
  }
}
