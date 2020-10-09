require 'swagger_helper'

describe 'Repos API' do
  before { stub_github_api }

  let(:Authorization) { '' }

  path '/repos' do
    get 'Retrieves a list of available GitHub repos' do
      tags 'Repos'
      produces 'application/json'
      security [ jwt: [] ]

      response '200', 'List of repos' do
        schema type: :object, properties: {
          data: { type: :array, items: { '$ref' => '#/components/schemas/repo' } }
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
    end
  end

  path '/repos/{owner}/{repo}' do
    get 'Retrieves a GitHub repo by Owner' do
      tags 'Repos'
      produces 'application/json'
      security [ jwt: [] ]

      parameter name: :owner, in: :path,
        type: :string,
        description: "Repo owner's GitHub username"
      parameter name: :repo, in: :path,
        type: :string,
        description: 'Repo name on GitHub'

      let(:owner) { 'rspec' }
      let(:repo)  { 'rspec' }

      response '200', 'Single Repo' do
        schema type: :object, properties: {
          data: { '$ref' => '#/components/schemas/repo' }
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

      response '404', 'User requested non-existing or private repo' do
        schema type: :object, properties: {
            error: { '$ref' => '#/components/schemas/error' }
          }, required: [:error]

        let(:user) { User.new 'valid_github_token' }
        let(:Authorization) { authorization_header_for user }
        let(:repo)  { 'private' }

        run_test!
      end
    end
  end
end
