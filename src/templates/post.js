import React from "react"

const Post = ({data}) => {
  const article = data.allPrismicDocument.edges[0].node

  return (
    <div className="l--constrain">
      <article className="article">
        <header className="article__header u--text-center">
          <h1>{article.data.title[0].text}</h1>
          <hr />
          <h2 className="h3">{article.data.summary[0].text}</h2>
        </header>
      </article>
      <div className="article__content">

      </div>
    </div>
  )
}

export default Post

export const query = graphql`
  query PostQuery($uid: String!) {
    allPrismicDocument(filter: {uid: {eq: $uid} }) {
      edges {
        node {
          uid
          fields {
            slug
          }
          type
          data {
            meta_title {
              type
              text
            }
            meta_description {
              type
              text
            }
            title {
              type
              text
            }
            summary {
              type
              text
            }
            publish_date
            author {
              id
            }
            teaser_image {
              url
              dimensions {
                width
                height
              }
            }
            body {
              text
              oembed {
                height
                width
                embed_url
                type
                version
                title
                author_name
                author_url
                provider_name
                provider_url
                thumbnail_url
                thumbnail_width
                thumbnail_height
                html
                url
              }
              spans {
                start
                end
                type
                data {
                  link_type
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`
