import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY,
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE
} from './types';
import api from '../utils/api';

const list = {
  1: {
    id: 1,
    name: "Repo 1",
    private: false,
    url: "http://github.com/"
  },
  2: {
    id: 2,
    name: "Repo 2",
    private: false,
    url: "http://github.com/"
  },
  3: {
    id: 3,
    name: "Repo 3",
    private: false,
    url: "http://github.com/"
  }
};

const issues = {
  1: {
    id: 1,
    name: "Issue 1"
  },
  2: {
    id: 2,
    name: "Issue 2"
  },
  3: {
    id: 3,
    name: "Issue 3"
  }
};

export const fetchRepositories = () => async dispatch => {
  const response = {data: list}; // await api.get('/repositories');

  dispatch({
    type: FETCH_REPOSITORIES, payload: response.data
  });
}

export const fetchRepository = (id) => async dispatch => {
  const response = {data: list[id]}; //await api.get(`/repositories/${id}`);

  dispatch({
    type: FETCH_REPOSITORY, payload: response.data
  });
}

export const fetchRepositoryIssues = (id) => async dispatch => {
  const response = {data: issues}; // await api.get('/repositories/${id}/issues');

  dispatch({
    type: FETCH_REPOSITORY_ISSUES, payload: response.data
  });
}

export const fetchIssue = (id) => async dispatch => {
  const response = {data: issues[id]}; // await api.get('/issues/${id}');

  dispatch({
    type: FETCH_ISSUE, payload: response.data
  });
}
