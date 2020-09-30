import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY,
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE
} from './types';
import { api } from '../utils/api';

export const fetchRepositories = () => async dispatch => {
  const response = await api.get('/repos');

  dispatch({
    type: FETCH_REPOSITORIES, payload: response.data
  });
}

export const fetchRepository = (owner, name) => async dispatch => {
  const response = await api.get(`/repos/${owner}/${name}`);

  dispatch({
    type: FETCH_REPOSITORY, payload: response.data
  });
}

export const fetchRepositoryIssues = (repo_owner, repo_name) => async dispatch => {
  const response = await api.get(`/repos/${repo_owner}/${repo_name}/issues`);

  dispatch({
    type: FETCH_REPOSITORY_ISSUES,
    payload: {
      issues: response.data,
      repo_owner,
      repo_name
    }
  });
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
