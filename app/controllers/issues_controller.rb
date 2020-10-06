class IssuesController < ApplicationController
  def index
      response = github.issues.list({
        user: params[:owner],
        repo: params[:repo],
        per_page: params[:per_page] || 10,
        page: params[:page] || 1
      })

      issues = response.body
        # .select { |issue| !issue.key? :pull_request }
        .map { |issue| mapIssueFromResponse(issue) }

      render json: { data: issues }
  end

  def show
      response = github.issues.get user: params[:owner], repo: params[:repo], number: params[:number]
      issue = response.body

      render json: { data: mapIssueFromResponse(issue) }
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
