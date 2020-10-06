require 'sinatra/base'

module GithubApiHelper
  def stub_github_api
    stub_request(:any, /api.github.com/).to_rack(MockApi) 
    stub_request(:any, /github.com\/login\/oauth/).to_rack(MockOauth)
  end 

  class MockApi < Sinatra::Base
    before do
      pass unless params[:access_token] == 'invalid_github_token'

      redirect '/github_unauthorized'
    end

    get '/github_unauthorized' do
      respond_with_json 401, 'github_401.json'
    end

    get '/user/repos' do
        respond_with_json 200, 'repos.json'
    end
  
    get '/repos/:owner/:repo' do
      if params[:repo] == 'private'
        respond_with_json 404, 'repo_404.json'
      else
        respond_with_json 200, 'repo.json'
      end
    end
  
    get '/repos/:owner/:repo/issues' do
      if params[:repo] == 'private'
        respond_with_json 404, 'repo_404.json'
      else
        respond_with_json 200, 'issues.json'
      end
    end
  
    get '/repos/:owner/:repo/issues/:number' do
      if params[:number] == '404'
        respond_with_json 404, 'issue_404.json'
      else
        respond_with_json 200, 'issue.json'
      end
    end
  
    get '/*' do
      path = params[:splat].first
  
      status 404
      "Github API Stub for #{path} is not implemented"
    end
  
    private
    def respond_with_json(status_code, fixture_name)
      content_type :json
      status status_code
  
      File.open(File.dirname(__FILE__) + '/../fixtures/' + fixture_name, 'rb').read
    end  
  end

  class MockOauth < Sinatra::Base
    post '/login/oauth/access_token' do
      status 200
      content_type 'application/x-www-form-urlencoded'

      if params[:code] == 'valid_github_auth_code'
        'access_token=valid_github_token&scope=repo&token_type=bearer'
      else
        'error=bad_verification_code&error_description=The+code+passed+is+incorrect+or+expired.&error_uri=https%3A%2F%2Fdocs.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-oauth-app-access-token-request-errors%2F%23bad-verification-code'
      end
    end
  end
end

RSpec.configure do |c|
  c.include GithubApiHelper, type: :request
end
