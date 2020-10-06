class IssuesController < ApplicationController
  before_action :authenticate_user

  def index
      response = current_user.github.issues.list({
        user: params[:owner],
        repo: params[:repo],
        per_page: params[:per_page] || 10,
        page: params[:page] || 1
      })

      issues = response.body
        # .select { |issue| !issue.key? :pull_request }
        .map { |issue| mapIssueFromResponse(issue) }

      render json: { data: issues }
    rescue Github::Error::GithubError => e
      github_error = JSON.parse e.response_message

      status = e.http_status_code == 401 ? 403 : e.http_status_code
      detail = "Repo '#{params[:owner]}/#{params[:repo]}' can not be displyed. It might be no longer available or private"
      error  = { title: github_error['message'], detail: detail }

      render status: status, json: { error: error }
  end

  def show
      response = current_user.github.issues.get user: params[:owner], repo: params[:repo], number: params[:number]
      issue = response.body

      render json: { data: mapIssueFromResponse(issue) }
    rescue Github::Error::GithubError => e
      github_error = JSON.parse e.response_message

      status = e.http_status_code == 401 ? 403 : e.http_status_code
      detail = "Issue #{params[:number]} in '#{params[:owner]}/#{params[:repo]}' can not be displyed. It might be no longer available or private"
      error  = { title: github_error['message'], detail: detail }

      render status: status, json: { error: error }
  end

  private

  def mapIssueFromResponse(issue)
    return {
      id: issue.id,
      title: issue.title,
      number: issue.number,
      author: issue.user.login,
      created_at: issue.created_at,
      body: issue.body,
      state: issue.state
    }
  end
end
