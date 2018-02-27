# Code for Designers - Public Website

This repo contains the code used to display the public-facing website for Code for Designers.

## About the code

Currently, the website is in "stealth mode." Meaning it's the first iteration of the website designed to capture leads until the website is published.

Due to the simplicity of the current needs for the website, I've opted to avoid using a static site generator or CMS for the site.

## Development

If you need to run a development environment install Browsersync globally by running the following command in your terminal

```
npm install -g browser-sync
```

Then start up the server using

```
browser-sync start --server --files "**/*.html, **/*.css, **/*.js"
```
