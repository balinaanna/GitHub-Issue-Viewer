require 'swagger_helper'

describe 'Issues API' do
  before { stub_github_api }

  let(:owner) { 'rspec' }
  let(:repo)  { 'rspec' }

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

      response '200', 'List of Issues' do
        schema type: :array, items: { '$ref' => '#/components/schemas/issue' }

        run_test!
      end
    end
  end

  path '/repos/{owner}/{repo}/issues/{number}' do
    get 'Retrieves a repo by Owner' do
      tags 'Issues'
      produces 'application/json'

      parameter name: :owner, in: :path,
        type: :string, 
        description: "Repo owner's GitHub username"
      parameter name: :repo, in: :path,
        type: :string,
        description: 'Repo name on GitHub'
      parameter name: :number, in: :path,
        type: :string,
        description: 'Issue Number within Repo'

      response '200', 'Sinngle Issue' do
        schema '$ref' => '#/components/schemas/issue'
        let(:number) { 50 }

        run_test!
      end
    end
  end
end
