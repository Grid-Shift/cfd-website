const getUri = require('./lib/getUri')
const secrets = require('./.secrets.json')

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
        repositoryName: secrets.prismic.repositoryName,
        accessToken: secrets.prismic.accessToken,
        // linkResolver: ({ node, key, value }) => doc => {
        //   // TODO: Implement link resolver
        //   // Check documentation: https://prismic.io/docs/javascript/beyond-the-api/link-resolving
        //   return getUri(doc)
        // },
        // htmlSerializer: ({ node, key, value }) => (element, content) => {
        //   // TODO: Consider implementing an HTML serializer
        //   // Check the documentation: https://prismic.io/docs/javascript/beyond-the-api/html-serializer
        // }
      },
    },
  ],
}
