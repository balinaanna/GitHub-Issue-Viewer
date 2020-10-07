class User
  def initialize(github_token)
    @github_token = github_token
    @github = nil
  end

  def github
    @github ||= Github.new oauth_token: @github_token
  end

  def authenticate(code)
    @github ||= Github.new(
      client_id:     Rails.application.credentials.github[:client_id],
      client_secret: Rails.application.credentials.github[:client_secret])

    authorization_code = code
    @github_token = github.get_token(authorization_code).token

    @github_token.present?
  end

  def self.from_token_request(request)
    User.new nil
  end

  def self.from_token_payload(payload)
    User.new(payload['github_token'])
  end

  def github_token
    @github_token
  end

  def to_token_payload
    { github_token: @github_token }
  end
end