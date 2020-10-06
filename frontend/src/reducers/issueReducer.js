import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE,
  DELETE_SESSION
} from '../actions/types';
import { repoID, PER_PAGE } from '../utils/constants';
import mapIssue from '../mappings/mapIssueFromResponse';

const defaultState = {};

export default (state = defaultState, action) => {
  let repoId, updatedRepoIssues, canLoadMore;

  switch (action.type) {
    case FETCH_REPOSITORIES: {
      const { data } = action.payload;

      return Object.assign(
        {},
        state,
        ...data.map(repo => {
          repoId = repoID(repo.owner, repo.name);
          return (!repo.has_issues)
            ? { [repoId]: { canLoadMore: false, items: {} } }
            : state;
        })
      );
    }
    case FETCH_REPOSITORY_ISSUES: {
      const { issues: { data }, repoOwner, repoName } = action.payload;

      repoId = repoID(repoOwner, repoName);
      canLoadMore = data.length === PER_PAGE;

      updatedRepoIssues = Object.assign(
        {},
        state[repoId] ? state[repoId].items : {},
        ...data.map(issue => {
          let mappedIssue = mapIssue(issue);
          mappedIssue.isListable = true;
          return { [issue.number]: mappedIssue }
        })
      );

      return Object.assign(
        {},
        state,
        { [repoId]: { canLoadMore, items: updatedRepoIssues } }
      );
    }
    case FETCH_ISSUE: {
      const { issue: { data }, repoOwner, repoName, number } = action.payload;
      repoId = repoID(repoOwner, repoName);

      let mappedIssue = mapIssue(data);
      mappedIssue.isListable = false;

      updatedRepoIssues = Object.assign(
        {},
        state[repoId],
        { [number]: mappedIssue }
      );

      return Object.assign(
        {},
        state,
        { [repoId]: { canLoadMore: true, items: updatedRepoIssues } }
      );
    }
    case DELETE_SESSION:
      return defaultState;
    default:
      return state;
  }
}
