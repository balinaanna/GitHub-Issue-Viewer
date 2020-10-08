class GithubController < ApplicationController

  def authorize
    github = GithubApi.new

    address = github.authorize_url scope: 'repo'

    redirect_to address
  end
end
