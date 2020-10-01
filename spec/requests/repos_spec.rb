require 'swagger_helper'

describe 'Repos API' do
  path '/repos' do
    get 'Retrieves a list of available GitHub repos' do
      tags 'Repos'
      produces 'application/json'

      response '200', 'List of repos' do
        schema type: :array, items: { '$ref' => '#/components/schemas/repo' }

        run_test!
      end
    end
  end

  path '/repos/{owner}/{repo}' do
    get 'Retrieves a repo by Owner' do
      tags 'Repos'
      produces 'application/json'

      parameter name: :owner, in: :path,
        type: :string,
        description: "Repo owner's GitHub username"
      parameter name: :repo, in: :path,
        type: :string,
        description: 'Repo name on GitHub'

      response '200', 'Single Repo' do
        schema '$ref' => '#/components/schemas/repo'
        let(:owner) { 'rspec' }
        let(:repo)  { 'rspec' }

        run_test!
      end
    end
  end
end
