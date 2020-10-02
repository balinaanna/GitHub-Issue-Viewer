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
        state[repo_id],
        ...action.payload.issues.map(issue => {
          let mappedIssue = mapIssue(issue);
          mappedIssue.is_listable = true;
          return { [issue.number]: mappedIssue }
        })
      );

      return Object.assign(
        {},
        state,
        { [repo_id]: updatedRepoIssues}
      );
    case FETCH_ISSUE:
      repo_owner = action.payload.repo_owner;
      repo_name = action.payload.repo_name;
      number = action.payload.number;
      repo_id = `${repo_owner}/${repo_name}`;

      let mappedIssue = mapIssue(action.payload.issue);
      mappedIssue.is_listable = false;

      updatedRepoIssues = Object.assign(
        {},
        state[repo_id],
        { [number]: mappedIssue }
      );

      return Object.assign(
        {},
        state,
        { [repo_id]: updatedRepoIssues }
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
    created_at: new Date(issue.created_at),
    body: issue.body,
    state: issue.state
  };
}