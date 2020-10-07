class GithubController < ApplicationController

  def authorize
    github = Github.new(
      client_id:     Rails.application.credentials.github[:client_id],
      client_secret: Rails.application.credentials.github[:client_secret])

    address = github.authorize_url scope: 'repo'

    redirect_to address
  end
end
