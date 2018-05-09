import React from 'react'
import Link from 'gatsby-link'

export default ({data}) => (
  <div>
    <h1>Blog</h1>
    <p>Something good will be here momentarily.</p>
    <div>
      {data.allPrismicDocument.edges.map(({node}, index) =>
        <h2 key={index}>{node.data.title[0].text}</h2>
      )}
    </div>
  </div>
)

export const query = graphql`
  query PostsQuery {
    allPrismicDocument(filter: {
      type: {
        eq: "posts"
      }
    },
    sort: {
      fields: [data___publish_date],
      order: DESC
    }) {
      edges {
        node {
          uid
          data {
            title {
              type
              text
            }
            category {
              uid
            }
          }
        }
      }
    }
  }
`
