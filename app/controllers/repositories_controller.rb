class RepositoriesController < ApplicationController
  def index
    begin
      response = github.repos.list per_page: params[:per_page] || 10, page: params[:page] || 1, sort: :created
      repos = response.body.map { |repo| mapRepoFromResponse(repo) }

      render json: { data: repos }
    rescue Github::Error::GithubError => e
      puts e.message
      if e.is_a? Github::Error::ServiceError
        # handle GitHub service errors such as 404
      elsif e.is_a? Github::Error::ClientError
        # handle client errors e.i. missing required parameter in request
      end
    end
  end

  def show
    response = github.repos.get user: params[:owner], repo: params[:repo]
    repo = response.body

    render json: { data: mapRepoFromResponse(repo) }
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
