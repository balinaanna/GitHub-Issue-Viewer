import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY,
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE
} from './types';
import { api } from '../utils/api';
import { PER_PAGE } from '../utils/constants';

export const fetchRepositories = (page = 1, successCallback, errorCallback) => async dispatch => {
  const response = await api.get('/repos', {
    params: {
      page,
      per_page: PER_PAGE
    }
  });

  dispatch({
    type: FETCH_REPOSITORIES, payload: {
      repos: response.data
    }
  });

  const canLoadMore = response.data.length >= PER_PAGE;
  successCallback(canLoadMore);
  // errorCallback();
}

export const fetchRepository = (owner, name) => async dispatch => {
  const response = await api.get(`/repos/${owner}/${name}`);

  dispatch({
    type: FETCH_REPOSITORY, payload: response.data
  });
}

export const fetchRepositoryIssues = (repo_owner, repo_name, page = 1, successCallback, errorCallback) => async dispatch => {
  const response = await api.get(`/repos/${repo_owner}/${repo_name}/issues`, {
    params: {
      page,
      per_page: PER_PAGE
    }
  });

  dispatch({
    type: FETCH_REPOSITORY_ISSUES,
    payload: {
      issues: response.data,
      repo_owner,
      repo_name
    }
  });

  const canLoadMore = response.data.length >= PER_PAGE;
  successCallback(canLoadMore);
  // errorCallback();
}

export const fetchIssue = (repo_owner, repo_name, number) => async dispatch => {
  const response = await api.get(`/repos/${repo_owner}/${repo_name}/issues/${number}`);

  dispatch({
    type: FETCH_ISSUE,
    payload: {
      issue: response.data,
      repo_owner,
      repo_name,
      number
    }
  });
}
