require 'knock/auth_token'

module AuthHelper
  def jwt_token_for(user)
    token = Knock::AuthToken.new(payload: { github_token: user.github_token }).token
  end

  def authorization_header_for(user)
    'Bearer ' + jwt_token_for(user)
  end
end

RSpec.configure do |c|
  c.include AuthHelper, type: :request
end