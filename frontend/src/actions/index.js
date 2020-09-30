import {
  FETCH_REPOSITORIES,
  FETCH_REPOSITORY,
  FETCH_REPOSITORY_ISSUES,
  FETCH_ISSUE
} from './types';
import api from '../utils/api';

const list = [
  {
    id: 1,
    owner: "owner",
    name: "Repo1",
    full_name: "annabalina/Repo1",
    description: "Your awesome repository",
    private: false,
    url: "http://github.com/"
  },
  {
    id: 2,
    owner: "owner",
    name: "Repo2",
    full_name: "annabalina/Repo2",
    description: "Your awesome repository",
    private: false,
    url: "http://github.com/"
  },
  {
    id: 3,
    owner: "owner",
    name: "Repo3",
    full_name: "annabalina/Repo3",
    description: "Your awesome repository",
    private: false,
    url: "http://github.com/"
  }
];

const issues = [
  {
    id: 1,
    title: "Issue 1",
    number: 111,
    author: "octocat",
    created_at: new Date("2020-09-29T13:33:48Z"),
    body: "I'm having a problem with this."
  },
  {
    id: 2,
    title: "Issue 2",
    number: 222,
    author: "octocat",
    created_at: new Date("2020-08-22T13:33:48Z"),
    body: "I'm having a problem with this."
  },
  {
    id: 3,
    title: "Issue 3",
    number: 333,
    author: "octocat",
    created_at: new Date("2011-04-22T13:33:48Z"),
    body: "I'm having a problem with this."
  }
];

export const fetchRepositories = () => async dispatch => {
  const response = {data: list}; // await api.get('/repositories');

  dispatch({
    type: FETCH_REPOSITORIES, payload: response.data
  });
}

export const fetchRepository = (owner, name) => async dispatch => {
  const response = {data: list[0]}; //await api.get(`/repositories/${id}`);

  dispatch({
    type: FETCH_REPOSITORY, payload: response.data
  });
}

export const fetchRepositoryIssues = (repo_owner, repo_name) => async dispatch => {
  const response = {data: issues}; // await api.get('/repositories/${id}/issues');

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
  const response = {data: issues[0]}; // await api.get('/issues/${id}');

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
