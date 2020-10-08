class GithubApi

  def initialize(oauth_token = nil)
    unless oauth_token
      @github ||= Github.new self.class.api_credentials
    else
      @github ||= Github.new oauth_token: oauth_token
    end
  end

  def method_missing(method, *args)
    github.send(method, *args) if github.respond_to?(method)
  end

  private
  attr_reader :github

  def self.api_credentials(oauth_token = nil)
    {
      client_id:     Rails.application.credentials.github[:client_id],
      client_secret: Rails.application.credentials.github[:client_secret]
    }
  end
end