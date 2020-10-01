require 'sinatra/base'

module GithubApiHelper
  def stub_github_api
    stub_request(:any, /api.github.com/).to_rack(MockApi) 
  end 

  class MockApi < Sinatra::Base
    get '/user/repos' do
      respond_with_json 200, 'repos.json'
    end
  
    get '/repos/:owner/:repo' do
      respond_with_json 200, 'repo.json'
    end
  
    get '/repos/:owner/:repo/issues' do
      respond_with_json 200, 'issues.json'
    end
  
    get '/repos/:owner/:repo/issues/:number' do
      respond_with_json 200, 'issue.json'
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
  
      File.open(File.dirname(__FILE__) + '/fixtures/' + fixture_name, 'rb').read
    end  
  end
end