# GitHub Issue Viewer

This app allows a user to login using their GitHub account, select a repository, see and paginate through its issues, and click to dive into an issue’s details. Issues won't be fetched if they are disabled for selected repository.

*Rails api, React JS*
## Start the app

#### Install dependencies

```sh
bundle install
cd frontend && npm install
```

#### Register a [GitHub OAuth app](https://docs.github.com/en/free-pro-team@latest/rest/guides/basics-of-authentication#registering-your-app).

Set the following values:

> **Homepage URL** = `http://localhost:3001/`
> 
> **Authorization callback URL** = `http://localhost:3001/auth`

Get your **Client ID** and **Client Secret**. You'll need them at the next step.

#### Setup GitHub cedentials.
Run the following to configure credentials:

```sh
EDITOR=vim rails credentials:edit
```
Your decrypted `/config/credentials.yml.enc` must contain:
```sh
github:
  client_id: ‘your_github_client_id’
  client_secret: ‘your_github_client_secret’
```

If you get any errors remove existing config file before generating the new one:
```sh
rm config/credentials.yml.enc
```

#### Start the app

```sh
gem install foreman
rake start
```
or start processes separately:

```sh
rails s -p 3000
cd frontend && npm start
```

Server app will run on [`http://localhost:3000/`](http://localhost:3000/)
Client app will run on [`http://localhost:3001/`](http://localhost:3001/)

## Tests

Run test suit with:

```sh
rake spec
```

## API doc

Generate Swagger JSON files from integration specs:

```sh
rake rswag:specs:swaggerize
```

Check [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs) for generated Swagger api documentation.
