const getUri = require('./lib/getUri')

module.exports = {
  siteMetadata: {
    title: 'Code for Designers',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `cfdwebsite`,
        accessToken: `MC5XdHFTdmlzQUFDc0EwMDhs.77-9CO-_vVV777-977-977-9VDQiKnAgfwXvv73vv73vv71-Cmnvv73vv73vv70r77-977-9OTdD77-9`,
        linkResolver: ({ node, key, value }) => doc => {
          // TODO: Implement link resolver
          // Check documentation: https://prismic.io/docs/javascript/beyond-the-api/link-resolving
          return getUri(doc)
        },
        htmlSerializer: ({ node, key, value }) => (element, content) => {
          // TODO: Consider implementing an HTML serializer
          // Check the documentation: https://prismic.io/docs/javascript/beyond-the-api/html-serializer
        }
      },
    },
  ],
}
