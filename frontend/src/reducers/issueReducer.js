import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE
} from '../actions/types';
import { repoID, PER_PAGE } from '../utils/constants';
import mapRepo from '../mappings/mapRepositoryFromResponse';
import mapIssue from '../mappings/mapIssueFromResponse';

export default (state = {}, action) => {
  let repoOwner, repoName, number, repoId, updatedRepoIssues, canLoadMore;

  switch (action.type) {
    case FETCH_REPOSITORIES:
      return Object.assign(
        {},
        state,
        ...action.payload.map(repo => {
          const mappedRepo = mapRepo(repo);
          repoId = repoID(repo.owner, repo.name);
          if (!repo.has_issues) {
            return { [repoId]: { canLoadMore: false, items: {} } };
          }
        })
      );

    case FETCH_REPOSITORY_ISSUES:
      repoOwner = action.payload.repoOwner;
      repoName = action.payload.repoName;
      repoId = repoID(repoOwner, repoName);
      canLoadMore = action.payload.issues.length === PER_PAGE;

      updatedRepoIssues = Object.assign(
        {},
        state[repoId] ? state[repoId].items : {},
        ...action.payload.issues.map(issue => {
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
        { [repoId]: { canLoadMore: true, items: updatedRepoIssues } }
      );
    default:
      return state;
  }
}
