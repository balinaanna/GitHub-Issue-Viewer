import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY,
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE
} from './types';
import { api } from '../utils/api';
import { PER_PAGE } from '../utils/constants';

export const fetchRepositories = (page = 1, successCallback, errorCallback) => async dispatch => {
  try {
    const response = await api.get('/repos', {
      params: { page, per_page: PER_PAGE }
    });
    dispatch({ type: FETCH_REPOSITORIES, payload: response.data });

    const canLoadMore = response.data.length >= PER_PAGE;
    successCallback(canLoadMore);
  } catch(error) {
    errorCallback(error);
  }
}

export const fetchRepository = (owner, name, successCallback, errorCallback) => async dispatch => {
  try {
    const response = await api.get(`/repos/${owner}/${name}`);
    dispatch({ type: FETCH_REPOSITORY, payload: response.data });

    successCallback();
  } catch(error) {
    errorCallback(error);
  }
}

export const fetchRepositoryIssues = (repoOwner, repoName, page = 1, successCallback, errorCallback) => async dispatch => {
  try {
    const response = await api.get(`/repos/${repoOwner}/${repoName}/issues`, {
      params: { page, per_page: PER_PAGE }
    });
    dispatch({
      type: FETCH_REPOSITORY_ISSUES,
      payload: {
        issues: response.data,
        repoOwner,
        repoName
      }
    });

    const canLoadMore = response.data.length >= PER_PAGE;
    successCallback(canLoadMore);
  } catch(error) {
    errorCallback(error);
  }
}

export const fetchIssue = (repoOwner, repoName, number, successCallback, errorCallback) => async dispatch => {
  try {
    const response = await api.get(`/repos/${repoOwner}/${repoName}/issues/${number}`);
    dispatch({
      type: FETCH_ISSUE,
      payload: {
        issue: response.data,
        repoOwner,
        repoName,
        number
      }
    });

    successCallback();
  } catch(error) {
    errorCallback(error);
  }
}
