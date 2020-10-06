require 'swagger_helper'

describe 'Issues API' do
  before { stub_github_api }

  let(:owner) { 'rspec' }
  let(:repo)  { 'rspec' }
  let(:Authorization) { '' }

  path '/repos/{owner}/{repo}/issues' do
    parameter name: :owner, in: :path,
      type: :string, 
      description: "Repo owner's GitHub username"
    parameter name: :repo, in: :path,
      type: :string,
      description: 'Repo name on GitHub'

    get 'Retrieves a list of GitHub repo issues' do
      tags 'Issues'
      produces 'application/json'
      security [ jwt: [] ]

      response '200', 'List of Issues' do
        schema type: :object, properties: {
          data: { type: :array, items: { '$ref' => '#/components/schemas/issue' } }
        }

        let(:user) { User.new 'valid_github_token' }
        let(:Authorization) { authorization_header_for user }

        run_test!
      end

      response '401', 'User is unauthorized' do
        schema type: :object, properties: {
          error: { '$ref' => '#/components/schemas/error' }
        }, required: [:error]

        run_test!
      end

      response '403', 'User is authorized but Github token is invalid' do
        schema type: :object, properties: {
          error: { '$ref' => '#/components/schemas/error' }
        }, required: [:error]

        let(:user) { User.new 'invalid_github_token' }
        let(:Authorization) { authorization_header_for user }

        run_test!
      end

      response '404', 'User is requested issues of non-exisitng or private repo' do
        schema type: :object, properties: {
          error: { '$ref' => '#/components/schemas/error' }
        }

        let(:repo)  { 'private' }
        let(:user) { User.new 'valid_github_token' }
        let(:Authorization) { authorization_header_for user }

        run_test!
      end
    end
  end

  path '/repos/{owner}/{repo}/issues/{number}' do
    get 'Retrieves a repo by Owner' do
      tags 'Issues'
      produces 'application/json'
      security [ jwt: [] ]

      parameter name: :owner, in: :path,
        type: :string, 
        description: "Repo owner's GitHub username"
      parameter name: :repo, in: :path,
        type: :string,
        description: 'Repo name on GitHub'
      parameter name: :number, in: :path,
        type: :string,
        description: 'Issue Number within Repo'

      let(:number) { 50 }

      response '200', 'Sinngle Issue' do
        schema type: :object, properties: {
          data: { '$ref' => '#/components/schemas/issue' }
        }

        let(:user) { User.new 'valid_github_token' }
        let(:Authorization) { authorization_header_for user }

        run_test!
      end

      response '401', 'User is unauthorized' do
        schema type: :object, properties: {
            error: { '$ref' => '#/components/schemas/error' }
          }, required: [:error]

        run_test!
      end

      response '403', 'User is authorized but Github token is invalid' do
        schema type: :object, properties: {
          error: { '$ref' => '#/components/schemas/error' }
        }, required: [:error]

        let(:user) { User.new 'invalid_github_token' }
        let(:Authorization) { authorization_header_for user }

        run_test!
      end

      response '404', 'User is requested non-exisitng or private issue' do
        schema type: :object, properties: {
            error: { '$ref' => '#/components/schemas/error' }
          }, required: [:error]

        let(:number)  { 404 }
        let(:user) { User.new 'valid_github_token' }
        let(:Authorization) { authorization_header_for user }

        run_test!
      end
    end
  end
end
