class RepositoriesController < ApplicationController
  before_action :authenticate_user

  def index
    response = current_user.github.repos.list per_page: params[:per_page] || 10, page: params[:page] || 1, sort: :created
    repos = response.body.map { |repo| mapRepoFromResponse(repo) }

    render json: { data: repos }

  rescue Github::Error::ServiceError => e
    message = "You are not authorized to list the repos. Please sign in with Github."
    show_github_service_error(e, message)
  rescue Github::Error::ClientError => e
    Rails.logger.info "Github request errror: #{e.message}"
    raise StandardError < ::StandardError.new
  end

  def show
    response = current_user.github.repos.get user: params[:owner], repo: params[:repo]
    repo = response.body

    render json: { data: mapRepoFromResponse(repo) }

  rescue Github::Error::GithubError => e
    message = "Repo '#{params[:owner]}/#{params[:repo]}' can not be displayed. It might be no longer available or private"
    show_github_service_error(e, message)
  end

  private

  def mapRepoFromResponse(repo)
    return {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      has_issues: repo.has_issues,
      private: repo.private,
      url: repo.html_url,
      description: repo.description,
      owner: repo.owner.login,
      created_at: repo.created_at
    }
  end
end
