class ApplicationController < ActionController::API
  protected

  def github
    authenticated = true

    connection_params = authenticated ?
      { oauth_token: '' } :
      { client_id: ENV['GITHUB_CLIENT_ID'], client_secret: ENV['GITHUB_CLIENT_SECRET'] }

    @github ||= Github.new connection_params
  end
end
