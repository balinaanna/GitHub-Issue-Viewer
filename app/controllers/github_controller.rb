class GithubController < ApplicationController

  def authorize
    github = Github.new client_id: ENV['GITHUB_CLIENT_ID'], client_secret: ENV['GITHUB_CLIENT_SECRET']
    address = github.authorize_url scope: 'repo'

    redirect_to address
  end
end
