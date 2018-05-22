/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/* -----------------------------------------------------------------------------
    !-- Imports
    Imports can't use ES6 code
  --------------------------------------------------------------------------- */
const path = require(`path`)
const prismicType = require('./lib/prismicType')
const getUri = require('./lib/getUri')

/* -----------------------------------------------------------------------------
    !-- Variables
  --------------------------------------------------------------------------- */

const templatePath = {
  AUTHORS: './src/templates/postAuthor.js',
  CATS: './src/templates/postCategory.js',
  POSTS: './src/templates/post.js',
}

/* -----------------------------------------------------------------------------
    !-- Add slugs to Nodes
  --------------------------------------------------------------------------- */
// exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
//   const { createNodeField } = boundActionCreators
//
//   if(node.internal.type === 'PrismicDocument') {
//     let slug = getUri(node)
//
//     if(slug) {
//       createNodeField({
//         node,
//         name: 'slug',
//         value: slug
//       })
//     }
//   }
// }

/* -----------------------------------------------------------------------------
    !-- Dynamically Create Pages
  --------------------------------------------------------------------------- */

// exports.createPages = ({ graphql, boundActionCreators }) => {
//   const { createPage } = boundActionCreators
//
//   return new Promise((resolve, reject) => {
//     graphql(`
//       {
//         allPrismicDocument {
//           edges {
//             node {
//               type
//               uid
//               fields {
//                 slug
//               }
//             }
//           }
//         }
//       }
//     `).then(result => {
//       result.data.allPrismicDocument.edges.forEach(({ node }) => {
//         let componentPath
//
//         switch (node.type) {
//            case prismicType.POSTS:
//              componentPath = templatePath.POSTS
//              break
//            case prismicType.CATS:
//              componentPath = templatePath.CATS
//              break
//            case prismicType.AUTHORS:
//              componentPath = templatePath.AUTHORS
//              break
//            default:
//              componentPath = false
//         }
//
//         if (componentPath) {
//           createPage({
//             path: node.fields.slug,
//             component: path.resolve(componentPath),
//             context: {
//               // Data passed to context is available in page queries as GraphQL variables.
//               uid: node.uid,
//             },
//           })
//         }
//
//       })
//       resolve()
//     }).catch(error => {
//       reject()
//     })
//   })
// }
