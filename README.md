# gatsby-starter-default
The default Gatsby starter.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

## Install

Make sure that you have the Gatsby CLI program installed:
```sh
npm install --global gatsby-cli
```

And run from your CLI:
```sh
gatsby new gatsby-example-site
```

Then you can run it by:
```sh
cd gatsby-example-site
npm run develop
```

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)


***

Old README below

# Code for Designers - Public Website

This repo contains the code used to display the public-facing website for Code for Designers.

## Development

This site uses a combination of Ruby Gems, NPM Modules, and Yarn.

### Setting the Ruby stack up

#### Step 1: Install the correct Ruby version

This site's version of Ruby is located in the `.ruby-version` file. Install the version specified there using Ruby Version Manager (RVM), or your favorite Ruby version management tool.

#### Step 2: Install Bundler

If you're using RVM, a Gemset has been specified in the `.ruby-gemset` file. You'll need to install Bundler for this new Gemset.

```
$ gem install bundler
```

#### Step 3: Install the Gems

With Bundler up and running, you can now install the required Gems.

```
$ bundle install
```



### Setting the Node stack up

#### Step 1: Install the correct Node version

This site's Node version is located in the `.nvmrc` file. Install the version specified there using Node Version Manager (NVM), or your favorite Node version management tool.

#### Step 2: Install Yarn

Instead of using NPM to install Node modules, this site uses Yarn. The best way to install Yarn is via Homebrew.

```
$ brew install yarn
```

If you don't have Homebrew, Yarn provides [many alternative options for installation.](https://yarnpkg.com/en/docs/install)

##### Step 3: Install Node Modules using Yarn

To install the Node modules, run

```
$ yarn install
```



### Running your environment

#### Running a server

To get a development environment up and running, run the following from the command line:

```
$ yarn run start
```

#### Do a production build

To do production build, run the following from the command line:

```
$ yarn run build
```



## Deployment

To deploy the site, run the following Rake task from the command line

```
$ yarn run deploy
```



## Front-end Standards

A **leading underscore** in a variable name represents a variable that is local to the file that it is in.

```
$_variableName // <-- local variable
```
