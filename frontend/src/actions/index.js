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
    full_name: "annabalina/Repo 1",
    description: "Your awesome repository",
    private: false,
    url: "http://github.com/"
  },
  2: {
    id: 2,
    name: "Repo 2",
    full_name: "annabalina/Repo 2",
    description: "Your awesome repository",
    private: false,
    url: "http://github.com/"
  },
  3: {
    id: 3,
    name: "Repo 3",
    full_name: "annabalina/Repo 3",
    description: "Your awesome repository",
    private: false,
    url: "http://github.com/"
  }
};

const issues = {
  1: {
    id: 1,
    title: "Issue 1",
    number: 2208,
    author: "octocat",
    created_at: new Date("2020-09-29T13:33:48Z"),
    body: "I'm having a problem with this."
  },
  2: {
    id: 2,
    title: "Issue 2",
    number: 2208,
    author: "octocat",
    created_at: new Date("2020-08-22T13:33:48Z"),
    body: "I'm having a problem with this."
  },
  3: {
    id: 3,
    title: "Issue 3",
    number: 2208,
    author: "octocat",
    created_at: new Date("2011-04-22T13:33:48Z"),
    body: "I'm having a problem with this."
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
