import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE,
  SET_ACCESS_TOKEN
} from './types';
import { api } from '../utils/api';
import { PER_PAGE } from '../utils/constants';

export const createSession = ({ code }, successCallback, errorCallback) => async dispatch => {
  try {
    const response = await api.post('/sessions', { code });
    const token = response.data.data.token;

    successCallback({ token });

    dispatch({ type: SET_ACCESS_TOKEN, payload: { token } });
    window.localStorage.setItem('token', token);
  } catch(error) {
    errorCallback(error);
  }
}

export const fetchRepositories = ({ page = 1 }, successCallback, errorCallback) => async (dispatch, getState) => {
  try {
    const token = getState().session.token;

    const response = await api.get('/repos', {
      params: { token, page, per_page: PER_PAGE }
    });
    dispatch({ type: FETCH_REPOSITORIES, payload: response.data });

    successCallback({ itemsCount: response.data.length, page });
  } catch(error) {
    errorCallback(error);
  }
}

export const fetchRepositoryIssues = ({ repoOwner, repoName, page = 1 }, successCallback, errorCallback) => async (dispatch, getState) => {
  try {
    const token = getState().session.token;

    const response = await api.get(`/repos/${repoOwner}/${repoName}/issues`, {
      params: { token, page, per_page: PER_PAGE }
    });
    dispatch({
      type: FETCH_REPOSITORY_ISSUES,
      payload: {
        issues: response.data,
        repoOwner,
        repoName
      }
    });

    successCallback({ itemsCount: response.data.length, page });
  } catch(error) {
    errorCallback(error);
  }
}

export const fetchIssue = ({ repoOwner, repoName, number }, successCallback, errorCallback) => async (dispatch, getState) => {
  try {
    const token = getState().session.token;

    const response = await api.get(`/repos/${repoOwner}/${repoName}/issues/${number}`, { params: { token } });
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
