class RepositoriesController < ApplicationController
  before_action :authenticate_user

  def index
    response = current_user.github.repos.list per_page: params[:per_page] || 10, page: params[:page] || 1, sort: :created
    repos = response.body.map { |repo| mapRepoFromResponse(repo) }

    render json: { data: repos }

  rescue Github::Error::ServiceError => e
    github_error = JSON.parse e.response_message

    status = e.http_status_code == 401 ? 403 : e.http_status_code
    detail = "You are not authorized to list the repos. Please sign in with Github."
    error  = { title: github_error['message'], detail: detail }

    render status: status, json: { error: error }
  rescue Github::Error::ClientError => e
    # handle client errors e.i. missing required parameter in request
  end

  def show
    response = current_user.github.repos.get user: params[:owner], repo: params[:repo]
    repo = response.body

    render json: { data: mapRepoFromResponse(repo) }

  rescue Github::Error::GithubError => e
    github_error = JSON.parse e.response_message

    status = e.http_status_code == 401 ? 403 : e.http_status_code
    detail = "Repo '#{params[:owner]}/#{params[:repo]}' can not be displyed. It might be no longer available or private"
    error  = { title: github_error['message'], detail: detail }

    render status: status, json: { error: error }
  end

  private

  def mapRepoFromResponse(repo)
    return {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      url: repo.html_url,
      description: repo.description,
      owner: repo.owner.login,
      created_at: repo.created_at
    }
  end
end
