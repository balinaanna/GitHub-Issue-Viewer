Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/auth/github', to: 'github#authorize'
  get '/auth/github/callback', to: 'github#callback'

  get '/repos', to: 'repositories#index'
  get '/repos/:owner/:repo', to: 'repositories#show'
  get '/repos/:owner/:repo/issues', to: 'issues#index'
  get '/repos/:owner/:repo/issues/:number', to: 'issues#show'
end
