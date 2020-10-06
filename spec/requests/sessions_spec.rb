require 'swagger_helper'

describe 'Sessions API' do
  before { stub_github_api }

  path '/sessions' do
    post 'Creates new Session' do
      tags 'Session'
      produces 'application/json'
      consumes 'application/json'
      parameter name: :session, in: :body, schema: {
        type: :object,
        properties: {
          code: { type: :string },
        }, required: [:code]
      }

      let(:code) { nil }
      let(:session) do
        code.present? ? { code: code } : {}
      end

      let(:data) do
        JSON.parse(response.body)["data"].symbolize_keys
     end

      response '200', 'Creates Session' do
        schema type: :object, properties: {
          data: { type: :object, properties: {
              token: { type: :string }
            }, required: [:token]
          }, required: [:data]
        }

        let(:code) { 'valid_github_auth_code' }

        run_test! do
          expect(data[:token]).to be_present

          token = Knock::AuthToken.new token: data[:token]
          expect(token.payload['github_token']).to eq 'valid_github_token'
        end
      end

      response '422', 'Invalid request' do
        schema type: :object, properties: {
          error: { '$ref' => '#/components/schemas/error' }
        }, required: [:error]

        run_test!
      end

      response '401', 'Invalid credentials' do
        schema type: :object, properties: {
          error: { '$ref' => '#/components/schemas/error' }
        }, required: [:error]

        let(:code) { 'invalid_github_auth_code' }

        run_test!
      end
    end
  end
end
