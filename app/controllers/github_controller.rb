class GithubController < ApplicationController

  def authorize
    address = github.authorize_url scope: 'repo'
    redirect_to address
  end

  def callback
    authorization_code = params[:code]
    access_token = github.get_token authorization_code
    access_token.token   # => returns token value

    Rails.logger.info access_token.token
    redirect_to 'http://localhost:3001/'
  end
end
